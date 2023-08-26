import { useEffect, useState } from "react";

export default function Timer({ onFinish }) {
  const [timer, setTimer] = useState(420); // 420 seconds (7 minutes)

  useEffect(() => {
    if (timer === 0) onFinish();
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Timer updates every 1000ms (1 second)

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return (
    <div className="timer">
      {minutes < 10 ? "0" : ""}
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}
