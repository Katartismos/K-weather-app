import { CloudSunRain } from 'lucide-react'

const Rain = () => {
  return (
    <div className="bg-card pt-5 pl-8 rounded-2xl">
      <div className="flex">
        <CloudSunRain size={15} className="mr-4 mt-1"/>
        <div>Rain chance</div>
      </div>
    </div>
  )
}

export default Rain