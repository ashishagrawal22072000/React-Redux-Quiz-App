import React, { useState, useEffect } from "react";

export default function Abc() {
  const [time, settime] = useState(10);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      settime(time - 1);
    }, 1000);
    return () => clearInterval(timer);
  });
  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
}
