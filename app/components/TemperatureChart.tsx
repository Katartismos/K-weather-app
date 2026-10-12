'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TemperatureChartProps {
  data: { name: string; temp: number }[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/85 backdrop-blur-md border border-white/15 rounded-xl px-3 py-1.5 shadow-2xl text-xs flex items-center gap-2">
        <span className="text-white/75 font-medium">{label}</span>
        <span className="font-bold text-accent text-sm">{payload[0].value}°C</span>
      </div>
    );
  }
  return null;
};

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const temps = data.map((d) => d.temp);
  const minTemp = Math.min(...temps) - 2;
  const maxTemp = Math.max(...temps) + 2;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent, #34d399)" stopOpacity={0.4} />
            <stop offset="60%" stopColor="var(--color-accent, #10b981)" stopOpacity={0.08} />
            <stop offset="100%" stopColor="var(--color-accent, #059669)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle, rgba(255,255,255,0.05))" />
        <XAxis 
          dataKey="name" 
          padding={{ left: 10, right: 10 }} 
          dy={6} 
          tick={{
            fill: 'var(--color-text-muted, rgba(255,255,255,0.6))',
            fontSize: 11,
            fontWeight: 500,
          }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          domain={[minTemp, maxTemp]} 
          hide={true} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="var(--color-accent, #34d399)"
          strokeWidth={2.5}
          fill="url(#tempGradient)"
          fillOpacity={1}
          dot={{ fill: 'var(--color-accent, #34d399)', stroke: 'var(--color-card, #0f2419)', strokeWidth: 2, r: 3.5 }}
          activeDot={{ r: 5.5, stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;