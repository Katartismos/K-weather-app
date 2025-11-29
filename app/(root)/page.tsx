import Forecast from '../components/Forecast';
import Rain from '../components/Rain';
import UV from '../components/UV';
import Cloud from '../components/Cloud';
import WindChart from '../components/Wind';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import HourlyForecasts from '../components/HourlyForecasts';
import Grouped from '../components/Grouped';

export default function Home() {
  return (
  <main className="text-xl grid grid-cols-[6fr_5fr] gap-10 pb-10 pl-75 pt-35 pr-10 min-h-screen">
      <section className="grid grid-cols-[6fr_5fr] grid-rows-4 gap-8">
        <Forecast />
        <WindChart />
        <Rain />
        <UV />
        <Cloud />
      </section>
      
      <section className="rounded-2xl bg-card grid grid-rows-[2fr_6fr_12fr] px-5">
        <div className="flex justify-between items-center px-10">
          <ChevronLeft size={25} className="cursor-pointer" />
          <h2 className="text-2xl">This Week</h2>
          <ChevronRight size={25} className="cursor-pointer" />
        </div>

        <HourlyForecasts />
        <Grouped />
      </section>
    </main>
  );
}
