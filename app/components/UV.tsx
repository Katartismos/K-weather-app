import { Sun } from 'lucide-react'

const UV = () => {
  return (
    <div className="bg-card pt-5 pl-8 rounded-2xl">
      <div className="flex">
        <Sun size={15} className="mr-4 mt-1"/>
        <div>UV Index</div>
      </div>
    </div>
  )
}

export default UV