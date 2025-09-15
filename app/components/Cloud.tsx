import { Cloudy } from 'lucide-react'

const Cloud = () => {
  return (
    <div className="bg-card pt-5 pl-8 rounded-2xl">
      <div className="flex">
        <Cloudy size={15} className="mr-4 mt-1"/>
        <div>Cloud cover</div>
      </div>
    </div>
  )
}

export default Cloud