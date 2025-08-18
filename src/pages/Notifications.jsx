import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";
import { Badge } from "../component/ui/badge";
import { Button } from "../component/ui/button";
import { Bell, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'reminder',
      title: 'Math Quiz in 5 minutes',
      message: 'Your scheduled math quiz starts at 10:00 AM',
      time: '9:55 AM',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Assignment Due Tomorrow',
      message: 'Physics lab report is due tomorrow at 11:59 PM',
      time: '2 hours ago',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'general',
      title: 'Study Group Meeting',
      message: 'Chemistry study group meeting at 3:00 PM in Room 201',
      time: '1 day ago',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'system',
      title: 'Focus Mode Completed',
      message: 'Great job! You completed a 25-minute focus session',
      time: '2 days ago',
      isRead: true,
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'assignment':
        return <Clock className="w-4 h-4 text-red-500" />;
      case 'system':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-brand" />
              <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted ${
                      !notification.isRead ? 'bg-accent/50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-brand rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        {!notification.isRead && (
                          <Button variant="ghost" size="sm" className="text-xs">
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Assignment Reminders</h4>
                    <p className="text-xs text-muted-foreground">Get notified about upcoming assignments</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Study Session Alerts</h4>
                    <p className="text-xs text-muted-foreground">Notifications for scheduled study sessions</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Focus Mode Notifications</h4>
                    <p className="text-xs text-muted-foreground">Alerts during focus mode sessions</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
