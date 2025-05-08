import { Moon, Sun } from 'lucide-react';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { BarChartComponent } from '@/pages/charts/components/BarChart.tsx';
import { LineChartComponent } from '@/pages/charts/components/LineChart.tsx';
import { PieChartComponent } from '@/pages/charts/components/PieChart.tsx';
import { useChartsStore } from '@/pages/charts/store.ts';

const ChartSkeleton = () => (
  <div className="shadow-md rounded-lg p-4 bg-gray-50">
    <Skeleton className="h-8 w-1/3 mb-4" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const ColorSelector = () => {
  const { updateChartColors } = useChartsStore();

  const colorSchemes = {
    default: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
    pastel: ['#FFB6C1', '#FFD700', '#98FB98', '#87CEFA', '#DDA0DD'],
    monochrome: ['#333333', '#555555', '#777777', '#999999', '#BBBBBB'],
    vibrant: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Chart Color Scheme</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(colorSchemes).map(([name, colors]) => (
          <Button
            key={name}
            size="sm"
            variant="outline"
            className="flex gap-1 items-center"
            onClick={() => { updateChartColors(colors); }}
          >
            {colors.map((color, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="ml-1">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

const ChartsDashboard = () => {
  const { darkMode, toggleDarkMode } = useChartsStore();

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <Card className={darkMode ? 'bg-gray-800 text-white border-gray-700' : ''}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription className={darkMode ? 'text-gray-300' : ''}>
              Visualizing key metrics and performance data
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className={darkMode ? 'border-gray-600 hover:bg-gray-700' : ''}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent>
          <ColorSelector />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<ChartSkeleton />}>
              <LineChartComponent />
            </Suspense>

            <Suspense fallback={<ChartSkeleton />}>
              <BarChartComponent />
            </Suspense>

            <div className="md:col-span-2">
              <Suspense fallback={<ChartSkeleton />}>
                <PieChartComponent />
              </Suspense>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsDashboard;