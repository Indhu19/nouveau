import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useChartsStore } from '@/pages/charts/store.ts';

// --- Axios-based API call ---
const fetchBarChartData = async () => {
  const response = await axios.get('/api/charts/bar');
  return response.data;
};

// --- Query Hook ---
export const useBarChartData = () => {
  return useSuspenseQuery({
    queryKey: ['bar-chart-data'],
    queryFn: fetchBarChartData,
  });
};

// --- Chart Component ---
export const BarChartComponent = () => {
  const { data } = useBarChartData();
  const { chartColors, barHoveredPoint, setBarHoveredPoint, darkMode } = useChartsStore();

  return (
    <div
      className={`shadow-md rounded-lg p-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50'}`}
    >
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onMouseMove={e => {
              if (e.activePayload) {
                setBarHoveredPoint(e.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => { setBarHoveredPoint(null); }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
            <XAxis dataKey="name" stroke={darkMode ? '#aaa' : '#666'} />
            <YAxis stroke={darkMode ? '#aaa' : '#666'} />
            <Tooltip
              contentStyle={
                darkMode ? { backgroundColor: '#333', borderColor: '#555', color: '#eee' } : {}
              }
            />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" name="Page Views">
              {data?.map((_entry: never, index: number) => (
                <Cell key={`cell-${index.toString()}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Bar>
            <Bar dataKey="uv" fill="#82ca9d" name="Unique Visitors" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {barHoveredPoint && (
        <div
          className={`mt-2 text-sm px-3 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          <p>Page: {barHoveredPoint.name}</p>
          <p>Page Views: {barHoveredPoint.pv.toLocaleString()}</p>
          <p>Unique Visitors: {barHoveredPoint.uv.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};
