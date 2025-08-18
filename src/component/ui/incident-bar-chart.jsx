
import React from 'react';
import {
  BarChart,
  BarSeries,
  Bar,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  GridlineSeries,
  Gridline
} from 'reaviz';
import { motion } from 'framer-motion';

const mediumCategoryData = [
  { key: 'Jan', data: 45 },
  { key: 'Feb', data: 52 },
  { key: 'Mar', data: 38 },
  { key: 'Apr', data: 61 },
  { key: 'May', data: 55 },
  { key: 'Jun', data: 67 },
];

const MonthlyEarningsChart = () => {
  const chartAvailableWidth = 375;
  const headerHeightEstimate = 60;
  const infoSectionHeight = 100;
  const chartAvailableHeight = 300 - headerHeightEstimate - infoSectionHeight;

  return (
    <div className="flex flex-col p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg shadow-lg w-[375px] h-[400px] overflow-hidden">
      <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">
        Monthly Earnings
      </h3>
      <div style={{ flexGrow: 1 }}>
        <BarChart
          id="earnings"
          width={chartAvailableWidth}
          height={chartAvailableHeight}
          data={mediumCategoryData}
          yAxis={<LinearYAxis axisLine={null} tickSeries={<LinearYAxisTickSeries line={null} label={null} />} />}
          xAxis={<LinearXAxis type="category" tickSeries={<LinearXAxisTickSeries label={<LinearXAxisTickLabel padding={10} />} tickSize={30} />} />}
          series={<BarSeries bar={<Bar gradient={null} />} colorScheme={['hsl(210, 100%, 45%)', 'hsl(210, 100%, 55%)', 'hsl(210, 100%, 65%)', 'hsl(210, 100%, 75%)', 'hsl(210, 100%, 85%)', 'hsl(210, 100%, 95%)']} padding={0.2} />}
          gridlines={<GridlineSeries line={<Gridline strokeColor="hsl(210, 30%, 85%)" />} />}
        />
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">$1,247</div>
        <p className="text-sm text-blue-600 dark:text-blue-400">+12% from last month</p>
      </div>
    </div>
  );
};

export default MonthlyEarningsChart;
