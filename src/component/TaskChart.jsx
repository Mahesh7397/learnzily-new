import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Chart, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./ui/pie-chart";


const TaskChart = ({
  events
}) => {
  const now = new Date();

  // Calculate task statistics
  const completed = events.filter(event => event.completed).length;
  const pending = events.filter(event => {
    const eventDate = new Date(event.datetime);
    return !event.completed && eventDate > now;
  }).length;
  const overdue = events.filter(event => {
    const eventDate = new Date(event.datetime);
    return !event.completed && eventDate <= now;
  }).length;
  const chartData = [{
    name: "Completed",
    value: completed,
    fill: "hsl(var(--chart-1))"
  }, {
    name: "Pending",
    value: pending,
    fill: "hsl(var(--chart-2))"
  }, {
    name: "Overdue",
    value: overdue,
    fill: "hsl(var(--chart-3))"
  }].filter(item => item.value > 0);
  const chartConfig = {
    value: {
      label: "Tasks"
    },
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-1))"
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))"
    },
    overdue: {
      label: "Overdue",
      color: "hsl(var(--chart-3))"
    }
  }
  if (events.length === 0) {
    return <Card className="w-full aspect-square max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg">Task Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground text-sm">No tasks available</p>
        </CardContent>
      </Card>;
  }
  return <Card className="w-full aspect-square max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">Productivity Pie</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Chart config={chartConfig} className="mx-auto aspect-square max-h-[200px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={30} outerRadius={60} paddingAngle={2} />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </Chart>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">{pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">{overdue}</div>
            <div className="text-xs text-muted-foreground">Overdue</div>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default TaskChart;