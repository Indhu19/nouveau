import { http, HttpResponse } from 'msw';
import { lineChartData, barChartData, pieChartData } from '../fixtures/charts';

export const chartHandlers = [
  /**
   * GET /api/charts/line
   * Returns line chart data
   */
  http.get('/api/charts/line', () => {
    return HttpResponse.json(lineChartData);
  }),

  /**
   * GET /api/charts/bar
   * Returns bar chart data
   */
  http.get('/api/charts/bar', () => {
    return HttpResponse.json(barChartData);
  }),

  /**
   * GET /api/charts/pie
   * Returns pie chart data
   */
  http.get('/api/charts/pie', () => {
    return HttpResponse.json(pieChartData);
  }),
];