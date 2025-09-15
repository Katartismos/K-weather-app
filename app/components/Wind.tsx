import { Wind } from 'lucide-react'

const WindChart = () => {
  return (
    <div className="bg-card pt-5 pl-8 rounded-2xl">
      <div className="flex">
        <Wind size={15} className="mr-4 mt-1"/>
        <div>Wind</div>
      </div>
    </div>
  )
}

export default WindChart