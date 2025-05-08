import { http, HttpResponse } from 'msw';
import { lineChartData, barChartData, pieChartData } from '../fixtures/charts.ts';

export const chartHandlers = [
  /**
   * GET /api/components/line
   * Returns line chart data
   */
  http.get('/api/charts/line', () => {
    return HttpResponse.json(lineChartData);
  }),

  /**
   * GET /api/components/bar
   * Returns bar chart data
   */
  http.get('/api/charts/bar', () => {
    return HttpResponse.json(barChartData);
  }),

  /**
   * GET /api/components/pie
   * Returns pie chart data
   */
  http.get('/api/charts/pie', () => {
    return HttpResponse.json(pieChartData);
  }),
];
