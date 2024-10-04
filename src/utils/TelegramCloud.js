export const setCloudStorageData = async (key, data) => {
  try {
    if (window.Telegram?.WebApp) {
      await window.Telegram.WebApp.CloudStorage.setItem(
        key,
        JSON.stringify(data)
      );
    } else {
      throw new Error("Telegram WebApp API not available");
    }
  } catch (err) {
    console.error("Error setting data:", err);
  }
};

// Function to get data from Telegram WebApp Cloud Storage
export const getCloudStorageData = async (key) => {
    if (window.Telegram?.WebApp) {
      return new Promise((resolve, reject) => {
        window.Telegram.WebApp.CloudStorage.getItem(key, (value, value2) => {
          try {
            // Parse the returned value
            const parsedData = JSON.parse(value2);
            resolve(parsedData); // Resolve the promise with parsed data
          } catch (error) {
            console.error("Error parsing data:", error);
            reject(new Error("Failed to parse data from CloudStorage"));
          }
        });
      });
    } else {
      throw new Error("Telegram WebApp API not available");
    }
  };
