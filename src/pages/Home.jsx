   // const a = await PolluxWeb.transactionBuilder.sendTrx('PR4fchA4kPy2m7HWuSiEcFz714cAnQcME9',1000,"PR58ATVJNmiGkG9KKEiiUcKVrBga45jrjk")
    // console.log(a);
    // const b =await PolluxWeb.trx.sign(  a)
    // console.log(b);
    // const c = await PolluxWeb.trx.sendRawTransaction(b);
    // console.log(c);
    // const PolluxWeb = new polluxWeb({
    //     fullHost: 'https://exchangefullnode.poxscan.io/',
    //     privateKey:"",
    //   });

    
const Home = () => {
    // const handleTapMining = async () => {
    //     setIsAnimating(true);
    //     // Optionally, reset the animation after some time if needed
    //     setTimeout(() => setIsAnimating(false), 4000);
    //     const currentDate = new Date().toISOString().split("T")[0];
    //     if (!walletAddress) {
    //       toast.error("Connect your wallet.");
    //       return;
    //     }
    
    //     const votePower = await getVotePower(walletAddress);
    //     const totalAmount =
    //       votePower.data.frozenV2.reduce(
    //         (sum, item) => sum + (item.amount || 0),
    //         0
    //       ) /
    //       10 ** 6;
    //     if (totalAmount < 25) {
    //       toast.error("Insufficient stake amount !");
    //       return;
    //     }
    
    //     const userData = await getDataOfMiningFromDatabase(walletAddress);
    
    //     if (
    //       userData?.data?.userSlotNumber === slotsNumber?.currentSlotNumber &&
    //       userData?.data?.userSlotDate.split("T")[0] === currentDate &&
    //       walletAddress === userData?.data?.walletAddress
    //     ) {
    //       toast.error("You have already minted in this slot.");
    //       return;
    //     }
    
    //     if (isLoading) {
    //       return;
    //     }
    
    //     setIsLoading(true);
    //     try {
    //       const apiData = await postMintUser(walletAddress, token);
    //       console.log(apiData);
    
    //       const signedTransaction = await window.pox.signdata(
    //         apiData?.data?.transaction
    //       );
    
    //       console.log("signedTransaction: ", signedTransaction);
    
    //       const broadcast = JSON.stringify(
    //         await window.pox.broadcast(JSON.parse(signedTransaction[1]))
    //       );
    
    //       console.log("broadcast", broadcast);
    
    //       // check transaction result >> SUCCESS : REVERT
    //       const transactionResult = await getTransactionResult(
    //         apiData?.data?.transaction?.txID
    //       );
    //       console.log("result", transactionResult);
    //       // Call the api of update Token balance
    //       const savedData = await saveUserMinigData(
    //         token,
    //         apiData?.data?.transaction?.txID,
    //         walletAddress,
    //         transactionResult?.data?.receipt?.result
    //       );
    //       console.log("savedData", savedData);
    
    //       // Distribute referral rewards
    //       if (
    //         transactionResult?.data?.receipt?.result === "SUCCESS" &&
    //         referralAddress
    //       ) {
    //         const referralData = await postDistributeReferralRewards(walletAddress);
    //         console.log("referralData", referralData);
    
    //         const signedTransaction2 = await window.pox.signdata(
    //           referralData?.data?.transaction
    //         );
    
    //         console.log("signedTranaction2", signedTransaction2);
    //         const broadcast2 = JSON.stringify(
    //           await window.pox.broadcast(JSON.parse(signedTransaction2[1]))
    //         );
    
    //         console.log("boradcast2", broadcast2);
    //       }
    
    //       // update token balance
    //       const updateTokenBalance = await updateBalance(token);
    //       console.log("updateTokenBalance", updateTokenBalance);
    
    //       toast.success("Your mining has started.");
    
    //       // save the mining data in database
    //       const usersavedData = await saveDataOfMiningInDatabase(
    //         token,
    //         slotsNumber?.currentSlotNumber,
    //         walletAddress
    //       );
    
    //       console.log("saveDataOfMiningInDatabase", usersavedData);
    //     } catch (error) {
    //       toast.error("Mining was canceled or failed. Please try again.");
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100">
        <div className="space-y-6 w-full px-4 flex flex-col items-center">
          {/* Mint Button */}
          <a
            href="#_"
            className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
            <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
            <span className="relative text-black text-lg font-bold">Mint</span>
          </a>
  
          {/* Buy Uvi Button */}
          <a
            href="/buycoin"
            className="relative inline-flex items-center justify-center w-full max-w-xs p-4 px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-lg group hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 via-yellow-400 to-pink-400 rounded-full opacity-90 transition duration-300 ease-out group-hover:scale-110"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-20 group-hover:rotate-90 ease"></span>
            <span className="absolute inset-0 w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-25 transition duration-300 ease-in-out"></span>
            <span className="relative text-black text-lg font-bold">Buy Uvi</span>
          </a>
        </div>
      </div>
    );
  };
  
  export default Home;
  