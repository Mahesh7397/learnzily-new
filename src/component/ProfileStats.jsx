import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts";
import { TrendingUp, Calendar, DollarSign, GraduationCap } from "lucide-react";
import TaskChart from "./TaskChart";
import MonthlyEarningsChart from "./ui/incident-bar-chart";
import { Chart, ChartTooltip, ChartTooltipContent } from "./ui/radar-chart";

const monthlyTasks = [
  { month: 'Jan', completed: 45 },
  { month: 'Feb', completed: 52 },
  { month: 'Mar', completed: 38 },
  { month: 'Apr', completed: 61 },
  { month: 'May', completed: 55 },
  { month: 'Jun', completed: 67 }
];

const gradeDistribution = [
  { grade: 'A+', count: 15, fill: 'hsl(210, 100%, 35%)' },
  { grade: 'A', count: 25, fill: 'hsl(210, 100%, 45%)' },
  { grade: 'A-', count: 18, fill: 'hsl(210, 100%, 55%)' },
  { grade: 'B+', count: 12, fill: 'hsl(210, 100%, 65%)' },
  { grade: 'B', count: 8, fill: 'hsl(210, 100%, 75%)' }
];

const appUsageData = [
  { feature: "Dashboard", usage: 85 },
  { feature: "Schedule", usage: 70 },
  { feature: "Forum", usage: 45 },
  { feature: "Smart Prep", usage: 60 },
  { feature: "Tools", usage: 30 }
];

const chartConfig = {
  usage: {
    label: "Usage %",
    color: "hsl(210, 100%, 50%)",
  },
};

const events = [
  { id: 1, name: "Math Quiz", completed: true, datetime: new Date().toISOString(), time: "10:00", type: 'assignment', repeat: 'once' },
  { id: 2, name: "Study Session", completed: true, datetime: new Date().toISOString(), time: "14:00", type: 'study', repeat: 'once' },
  { id: 3, name: "Assignment", completed: false, datetime: new Date().toISOString(), time: "16:00", type: 'assignment', repeat: 'once' }
];

export const ProfileStats = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Productivity Pie Chart */}
      <div className="w-fit">
        <TaskChart events={events} />
      </div>

      {/* Monthly Earnings */}
      <div className="w-fit">
        <MonthlyEarningsChart />
      </div>

      {/* Tasks Completed by Month - Line Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Tasks Completed by Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTasks}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 85%)" />
              <XAxis dataKey="month" stroke="hsl(210, 100%, 50%)" />
              <YAxis stroke="hsl(210, 100%, 50%)" />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="hsl(210, 100%, 50%)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(210, 100%, 50%)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Grade Distribution - Donut Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Grade Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                dataKey="count"
                nameKey="grade"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-blue-600">GPA: 3.8</div>
            <p className="text-xs text-muted-foreground">Overall Performance</p>
          </div>
        </CardContent>
      </Card>

      {/* App Feature Usage - Radar Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            App Feature Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Chart config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <RadarChart data={appUsageData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="feature" />
              <PolarGrid stroke="hsl(210, 30%, 85%)" />
              <Radar dataKey="usage" fill="hsl(210, 100%, 50%)" fillOpacity={0.3} stroke="hsl(210, 100%, 50%)" strokeWidth={2} />
            </RadarChart>
          </Chart>
        </CardContent>
      </Card>
    </div>
  );
};
