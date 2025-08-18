
import { Card, CardContent } from "./ui/card";
import { CheckCircle, Clock, IndianRupee } from "lucide-react";


export const DashboardStats = ({ activeTasks, completedTasks, moneyEarned }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4 h-20 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Tasks</p>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{activeTasks}</p>
          </div>
          <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
        <CardContent className="p-4 h-20 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed Tasks</p>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">{completedTasks}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-4 h-20 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Earnings</p>
            <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 flex items-center">
              <IndianRupee className="w-5 h-5 mr-1" />
              {moneyEarned}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
