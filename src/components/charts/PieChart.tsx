import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip,
} from 'recharts';
import { useChartsStore } from '@/pages/charts/store.ts';

interface PieDataItem {
  name: string;
  value: number;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: PieDataItem;
  percent: number;
  value: number;
}

// Axios fetcher
const fetchPieChartData = async (): Promise<PieDataItem[]> => {
  const { data } = await axios.get('/api/charts/pie');
  return data;
};

export const PieChartComponent = () => {
  const { pieActiveIndex, setPieActiveIndex, chartColors, darkMode } = useChartsStore();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['pieChartData'],
    queryFn: fetchPieChartData,
  });

  const onPieEnter = (_: unknown, index: number) => {
    setPieActiveIndex(index);
  };

  const renderActiveShape = ({
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  }: ActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    const textColor = darkMode ? '#eee' : '#333';
    const subtextColor = darkMode ? '#aaa' : '#999';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }} />
        <Sector {...{ cx, cy, startAngle, endAngle, innerRadius: outerRadius + 6, outerRadius: outerRadius + 10, fill }} />
        <path d={`M${sx.toString()},${sy.toString()}L${mx.toString()},${my.toString()}L${ex.toString()},${ey.toString()}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={textColor}>
          {`Value: ${value.toString()}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={subtextColor}>
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading chart...</div>;
  }

  if (isError) {
    return <div className="text-center p-4 text-red-500">Failed to fetch pie chart data</div>;
  }

  return (
    <div
      className={`shadow-md rounded-lg p-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50'}`}
    >
      <h2 className="text-xl font-semibold mb-4">Distribution Analysis</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={pieActiveIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index.toString()}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={
                darkMode ? { backgroundColor: '#333', borderColor: '#555', color: '#eee' } : {}
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-sm mt-2 text-gray-500 dark:text-gray-400">
        Hover over segments for details | Active segment: {data[pieActiveIndex]?.name || 'None'}
      </div>
    </div>
  );
};
