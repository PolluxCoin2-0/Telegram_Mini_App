import React, { useState, useEffect } from "react";

const CountdownTimerWithSlots = ({setCurrentSlotNumber}) => {
  const slotDuration = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const baseTime = new Date();
  baseTime.setHours(20, 0, 0, 0); // Base start time: 8:00 PM

  const getCurrentSlotData = () => {
    const now = new Date();

    // If the current time is before 8:00 PM today, subtract one day from the base time
    if (now < baseTime) {
      baseTime.setDate(baseTime.getDate() - 1);
    }

    const timeSinceBase = now - baseTime;
    const timeSinceMidnight = (now - new Date().setHours(0, 0, 0, 0)) % (24 * 60 * 60 * 1000);

    // Calculate the current slot number based on time since base time
    const slotNumber = Math.floor((timeSinceBase % (24 * 60 * 60 * 1000)) / slotDuration);
    const currentSlotStart = new Date(baseTime.getTime() + slotNumber * slotDuration);
    const nextSlotStart = new Date(currentSlotStart.getTime() + slotDuration);

    // Calculate time left in the current slot
    const timeLeft = nextSlotStart - now;

    return { slotNumber: slotNumber + 1, timeLeft }; // Add 1 to make the slot number start from 1
  };

  const [slotData, setSlotData] = useState(getCurrentSlotData());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newSlotData = getCurrentSlotData();
      setSlotData(newSlotData);

      // Call setCurrentSlotNumber when the slot changes
      setCurrentSlotNumber(newSlotData.slotNumber);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setCurrentSlotNumber]); // Add setCurrentSlotNumber as a dependency

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(slotData.timeLeft);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center gap-4">
        <TimerBox value={hours} label="Hours" />
        <Separator />
        <TimerBox value={minutes} label="Minutes" />
        <Separator />
        <TimerBox value={seconds} label="Seconds" />
      </div>
      <p className="text-lg font-semibold text-gray-900 mt-4">
        Current Slot: {slotData.slotNumber}
      </p>
    </div>
  );
};

const TimerBox = ({ value, label }) => (
    <div className="timer w-16">
      <div
        className="py-4 px-2 rounded-lg backdrop-blur-md bg-white/10 bg-opacity-20 shadow-lg border border-white/20"
        style={{
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="countdown-element font-Cormorant font-semibold text-2xl text-black text-center">
          {String(value).padStart(2, "0")}
        </h3>
      </div>
      <p className="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">{label}</p>
    </div>
  );
  

const Separator = () => (
  <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
);

export default CountdownTimerWithSlots;
