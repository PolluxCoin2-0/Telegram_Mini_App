import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Navbar from "./pages/Navbar";
import ConnectWallet from "./pages/ConnectWallet";
import PinLock from "./pages/PinLock"; // Adjust the import path as necessary
import GeneratePin from "./pages/GeneratePin";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  const [pinEntered, setPinEntered] = useState(false);

  // const getStoredData = async() => {
  //   if (window.Telegram?.WebApp) {
  //     await window.Telegram.WebApp.CloudStorage.getItem('userSettings',(value, value2)=>{
  //       const parsedData = JSON.parse(value2);
  //     console.log("parseddata", parsedData)
  //    });
  //   }
  // };

  // useEffect(()=>{
  //   getStoredData();
  // },[])

    // Check sessionStorage to persist the state on page refresh
    useEffect(() => {
      const storedPinEntered = sessionStorage.getItem("pinEntered");
      if (storedPinEntered === "true") {
        setPinEntered(true);
      }
    }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {pinEntered ? (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buyCoin" element={<ComingSoon />} />
                <Route path="/wallet" element={<ConnectWallet />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<PinLock setPinEntered={setPinEntered} />}
              />
              <Route path="/generatepin" element={<GeneratePin />} />
            </Routes>
          )}
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
