import Image from 'next/image'
import { CalendarDays, Clock8 } from 'lucide-react'
import TemperatureChart from './TemperatureChart'
const Forecast = () => {
  return (
    <div className="bg-card col-span-2 row-span-2 rounded-2xl text-center grid grid-cols-[3fr_4fr] gap-10 py-8 px-12.5">
      <div className="flex flex-col items-start">
        <Image src="/assets/cloudy-day.svg" alt="Main Forecast" width={100} height={100} />
        <div className="text-6xl font-intertight-500 my-2">1° C</div>
        <div className="text-2xl">New York, US</div>

        <hr className="h-0.5 w-full border-t border-green-900 rounded-full opacity-80 my-4"></hr>

        <div className="flex items-center">
          <CalendarDays size={15} className="my-3 mr-2" />
          <div>24th September 2025</div>
        </div>
        <div className="flex items-center">
          <Clock8 size={15} className="mb-1 mr-2" />
          <div>20:00</div>
        </div>
      </div>

      <div className="">
        <p>Temperature</p>
        <div className="w-100 h-55">
          <TemperatureChart />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-7 gap-y-2 pt-10 font-intertight-600 justify-items-start pl-17">
          <div className="">Morning: 1°C</div>
          <div className="">Afternoon: 2°C</div>
          <div className="">Evening: 0°C</div>
          <div className="">Night: -1°C</div>
        </div>        
      </div>
    </div>
  )
}

export default Forecast