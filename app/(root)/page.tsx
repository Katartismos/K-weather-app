import Forecast from '../components/Forecast';
import Rain from '../components/Rain';
import UV from '../components/UV';
import Cloud from '../components/Cloud';
import WindChart from '../components/Wind';

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
      
      <section className="rounded-2xl bg-card text-center">Left Section</section>
    </main>
  );
}
