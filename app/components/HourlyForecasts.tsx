import Image from 'next/image';
import React from 'react'

const HourlyForecasts = () => {
  const hourly = [
    { time: "Now", icon: "sunny.svg", temp: "4° C" },
    { time: "12pm", icon: "cloudy-day.svg", temp: "2° C" },
    { time: "2pm", icon: "cloudy.svg", temp: "3° C" },
    { time: "4pm", icon: "downpour.svg", temp: "5° C" }
  ];

  return (
    <div>
      <p className="px-8">Today</p>
      <div className="px-8 py-4 grid grid-cols-4 gap-8 h-55">
        {
          hourly.map(hour => (
            <div key={hour.time} className="bg-green-900/75 rounded-3xl flex flex-col items-center justify-center gap-2.5">
              <p>{hour.time}</p>
              <Image src={`/assets/${hour.icon}`} alt="weather icon" width={50} height={50} />
              <p>{hour.temp}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HourlyForecasts