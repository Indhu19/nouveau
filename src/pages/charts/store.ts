import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface LineChartDataPoint {
  month: string;
  revenue: number;
  profit: number;
}

export interface BarChartDataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
}

interface ChartsState {
  pieActiveIndex: number;
  setPieActiveIndex: (index: number) => void;

  lineHoveredPoint: LineChartDataPoint | null;
  setLineHoveredPoint: (point: LineChartDataPoint | null) => void;

  barHoveredPoint: BarChartDataPoint | null;
  setBarHoveredPoint: (point: BarChartDataPoint | null) => void;

  chartColors: string[];
  updateChartColors: (colors: string[]) => void;

  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useChartsStore = create<ChartsState>()(
  devtools(
    (set) => ({
      pieActiveIndex: 0,
      setPieActiveIndex: (index) => { set({ pieActiveIndex: index }); },

      lineHoveredPoint: null,
      setLineHoveredPoint: (point) => { set({ lineHoveredPoint: point }); },

      barHoveredPoint: null,
      setBarHoveredPoint: (point) => { set({ barHoveredPoint: point }); },

      chartColors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
      updateChartColors: (colors) => { set({ chartColors: colors }); },

      darkMode: false,
      toggleDarkMode: () => { set((state) => ({ darkMode: !state.darkMode })); },
    }),
    { name: 'charts-store' }
  )
);