import Image from 'next/image';

const Grouped = () => {
  const forecastGroup = [
    { day: "Tomorrow", date: "17 Jan", temp: "1° C", icon: "cloudy-day.svg" },
    { day: "Monday", date: "18 Jan", temp: "-1° C", icon: "cloudy.svg" },
    { day: "Tuesday", date: "19 Jan", temp: "0° C", icon: "downpour.svg" },
    { day: "Wednesday", date: "20 Jan", temp: "1° C", icon: "dark-lightning-storm.svg" },
    { day: "Thursday", date: "21 Jan", temp: "2° C", icon: "cloudy-day.svg" }
  ];

  return (
    <div className="pt-5 grid">
      {
        forecastGroup.map(forecast => (
          <div key={forecast.day} className="flex justify-between px-8">
            <div>
              <h3 className="text-2xl">{forecast.day}</h3>
              <h4 className="text-xl">{forecast.date}</h4>
            </div>

            <p className="text-2xl pt-3">{forecast.temp}</p>

            <Image src={`/assets/${forecast.icon}`} alt="weather icon" width={45} height={45} className="mb-10" />
          </div>
        ))
      }
    </div>
  )
}

export default Grouped