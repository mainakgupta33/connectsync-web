import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityChartProps {
  data: Array<{
    name: string;
    onboarded: number;
    failed: number;
  }>;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Onboarding Activity</h3>
        <p className="text-sm text-gray-500">Daily onboarding statistics for the past week</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="onboarded" fill="#3b82f6" name="Successfully Onboarded" radius={[4, 4, 0, 0]} />
          <Bar dataKey="failed" fill="#ef4444" name="Failed" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;