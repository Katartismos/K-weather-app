'use client'

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Morning', temp: 1 },
  { name: 'Afternoon', temp: 2 },
  { name: 'Evening', temp: 0 },
  { name: 'Night', temp: -1 },
];

const TemperatureChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="0.2 10" />
        <XAxis 
          dataKey="name" 
          padding={{left: 10, right: 10}} 
          dy={10} 
          tick={{
            fill: 'var(--color-text-main)',
            fontSize: 12,
            fontFamily: 'Arhivonarrow, sans-serif',
            fontWeight: 'semibold',
            stroke: 'none',
          }}
        />
        <YAxis domain={[-2, 2]} interval="preserveStartEnd" tickCount={9} hide={false} />
        <Tooltip />
        <Area
          type="natural"
          dataKey="temp"
          stroke="#4CAF50"
          fill="hsla(150, 80%, 40%, 0.3)"
          fillOpacity={1}
          baseValue={-2}
          dot={{ fill: '#4CAF50', stroke: '#4CAF50', r: 2.5 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;