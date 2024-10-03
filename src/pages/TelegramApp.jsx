import { useEffect, useState } from 'react';

const TelegramMiniApp = () => {
  const [storedData, setStoredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Async function to set dummy data in Telegram WebApp Cloud Storage
  const setDummyData = async () => {
    try {
      if (window.Telegram?.WebApp) {
        const dummyData = { theme: 'dark', notifications: true, username: 'john_doe' };
        await window.Telegram.WebApp.CloudStorage.setItem('userSettings', JSON.stringify(dummyData));
        console.log('Dummy data set:', dummyData);
      } else {
        throw new Error('Telegram WebApp API not available');
      }
    } catch (err) {
      console.error('Error setting data:', err);
      setError('Failed to set data.');
    }    
  };

  // Function to get data from Telegram WebApp Cloud Storage
  const getStoredData = async() => {
    if (window.Telegram?.WebApp) {
      await window.Telegram.WebApp.CloudStorage.getItem('userSettings',(value, value2)=>{
        const parsedData = JSON.parse(value2);
        setStoredData(parsedData);        
      console.log("callback function", value2)
      setLoading(false);
     });
    } else {
      setError('Telegram WebApp API not available');
      setLoading(false);
    }
  };

  console.log(storedData);

  // UseEffect to initialize Telegram WebApp and set/get data
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      // Notify Telegram that the web app is ready
      window.Telegram.WebApp.ready();

      // Set the dummy data into storage and retrieve it
      setDummyData().then(getStoredData);
    } else {
      console.error('Telegram WebApp API not available');
      setError('Telegram WebApp API not available');
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Telegram Mini App</h1>
      <p>This is a React app running in Telegram.</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : 
        <div>
          <h3>Retrieved Data from Cloud Storage:</h3>
          <p><strong>Theme:</strong>{storedData.theme}</p>
          <p><strong>Notifications:</strong> {storedData.notifications ? 'Enabled' : 'Disabled'}</p>
          <p><strong>Username:</strong> {storedData.username}</p>
        </div>
     }
    </div>
  );
};

export default TelegramMiniApp;
