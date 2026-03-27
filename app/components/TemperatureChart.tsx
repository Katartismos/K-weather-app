'use client'

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TemperatureChartProps {
  data: { name: string, temp: number }[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const minTemp = Math.min(...data.map(d => d.temp)) - 2;
  const maxTemp = Math.max(...data.map(d => d.temp)) + 2;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="name" 
          padding={{left: 10, right: 10}} 
          dy={10} 
          tick={{
            fill: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 'normal',
          }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          domain={[minTemp, maxTemp]} 
          hide={true} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
          itemStyle={{ color: '#4CAF50' }}
        />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#4CAF50"
          strokeWidth={3}
          fill="url(#colorTemp)"
          fillOpacity={1}
          dot={{ fill: '#4CAF50', stroke: '#fff', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;