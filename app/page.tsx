import Rain from './components/Rain';
import UV from './components/UV';
import Cloud from './components/Cloud';
import WindChart from './components/Wind';

export default function Home() {
  return (
    <main className="text-xl grid grid-cols-[6fr_5fr] gap-10 absolute bottom-15 left-75 top-35 right-10">
      <section className="grid grid-cols-[6fr_5fr] grid-rows-4 gap-8">
        <div className="bg-card col-span-2 row-span-2 rounded-2xl text-center">Main Forecast</div>
        <WindChart />
        <Rain />
        <UV />
        <Cloud />
      </section>
      
      <section className="rounded-2xl bg-card text-center">Left Section</section>
    </main>
  );
}
