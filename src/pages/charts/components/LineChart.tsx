import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useChartsStore } from '@/pages/charts/store.ts';

// --- Axios API call ---
const fetchLineChartData = async () => {
  const response = await axios.get('/api/charts/line');
  return response.data;
};

// --- Query Hook ---
export const useLineChartData = () => {
  return useSuspenseQuery({
    queryKey: ['line-chart-data'],
    queryFn: fetchLineChartData,
  });
};

// --- Chart Component ---
export const LineChartComponent = () => {
  const { data } = useLineChartData();
  const { lineHoveredPoint, setLineHoveredPoint, darkMode } = useChartsStore();

  return (
    <div className={`shadow-md rounded-lg p-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50'}`}>
      <h2 className="text-xl font-semibold mb-4">Revenue & Profit Trends</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            // onMouseMove={(e) => {
            //   if (e.activePayload) {
            //     setLineHoveredPoint(e.activePayload[0].payload);
            //   }
            // }}
            onMouseLeave={() => { setLineHoveredPoint(null); }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
            <XAxis dataKey="month" stroke={darkMode ? '#aaa' : '#666'} />
            <YAxis stroke={darkMode ? '#aaa' : '#666'} />
            <Tooltip contentStyle={darkMode ? {
              backgroundColor: '#333',
              borderColor: '#555',
              color: '#eee',
            } : {}} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#82ca9d"
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {lineHoveredPoint && (
        <div className={`mt-2 text-sm px-3 py-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p>Month: {lineHoveredPoint.month}</p>
          <p>Revenue: ${lineHoveredPoint.revenue.toLocaleString()}</p>
          <p>Profit: ${lineHoveredPoint.profit.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};
