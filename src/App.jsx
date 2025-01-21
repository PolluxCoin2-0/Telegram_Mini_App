import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Navbar from "./pages/Navbar";
import ConnectWallet from "./pages/ConnectWallet/ConnectWallet";
import PinLock from "./pages/PinLock"; // Adjust the import path as necessary
import GeneratePin from "./pages/GeneratePin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [pinEntered, setPinEntered] = useState(false);
  const [userAddressPresent, setUserAddressPresent] = useState(false);
  const [userAddressFromState, setUserAddressFromState] = useState([]);
  const [activeWalletAddressPresent, setActiveWalletAddressPresent] =
    useState("");

  // Check sessionStorage to persist the state on page refresh
  useEffect(() => {
    const storedPinEntered = sessionStorage.getItem("pinEntered");
    if (storedPinEntered === "true") {
      setPinEntered(true);
    }
  }, [userAddressPresent]);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop={true}
        pauseOnFocusLoss
        toastClassName="custom-toast"
      />
      {pinEntered ? (
        <>
          <Navbar
            userAddressPresent={userAddressPresent}
            userAddressFromState={userAddressFromState}
            setUserAddressFromState={setUserAddressFromState}
            setActiveWalletAddressPresent={setActiveWalletAddressPresent}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Home activeWalletAddressPresent={activeWalletAddressPresent} />
              }
            />
            <Route path="/buyCoin" element={<ComingSoon />} />
            <Route
              path="/wallet"
              element={
                <ConnectWallet
                  setUserAddressPresent={setUserAddressPresent}
                  setUserAddressFromState={setUserAddressFromState}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <PinLock
                setPinEntered={setPinEntered}
                setUserAddressPresent={setUserAddressPresent}
              />
            }
          />
          <Route path="/generatepin" element={<GeneratePin />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
