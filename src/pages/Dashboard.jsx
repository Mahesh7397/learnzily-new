import { useState, useEffect } from "react";
import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../component/ui/card";
import { Button } from "../component/ui/button";
import { Badge } from "../component/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../component/ui/avatar";
import DashboardCalendarWidget from "../component/ui/DashboardCalendarWidget";
import FocusMode from "../component/FocusMode";
import TaskChart from "../component/TaskChart";
import { DashboardHeader } from "../component/DashboardHeader";
import { DashboardStats } from "../component/DashboardStats";
import { MessageSquare, Users, Clock, Bell, Settings, MessageCircle, User } from "lucide-react";
import { Link } from "react-router-dom";
import { UseDataProvider } from "../contexts/DataProvider";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [forumPosts, setForumPosts] = useState([]);
  const { Userdata, getuserdata } = UseDataProvider();
  const displayName = Userdata?.displayName || "User";
  useEffect(() => {
    const savedEvents = localStorage.getItem('dashboard_events');
    const savedPosts = localStorage.getItem('forum_posts');

    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      setEvents(parsedEvents);
    }

    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setForumPosts(parsedPosts);
    }
  }, []);

  useEffect(() => {
    getuserdata(false)
  }, [])

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      events.forEach(event => {
        if (!event.completed) {
          const eventDate = new Date(event.datetime);
          const [hours, minutes] = event.time.split(':');
          eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

          let shouldNotify = false;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          switch (event.repeat) {
            case 'daily':
              const todayEvent = new Date(today);
              todayEvent.setHours(parseInt(hours), parseInt(minutes), 0, 0);
              shouldNotify = Math.abs(now.getTime() - todayEvent.getTime()) <= 30000;
              break;
            case 'weekly':
              const eventDay = eventDate.getDay();
              const todayDay = now.getDay();
              if (eventDay === todayDay) {
                const weeklyEvent = new Date(today);
                weeklyEvent.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                shouldNotify = Math.abs(now.getTime() - weeklyEvent.getTime()) <= 30000;
              }
              break;
            case 'monthly':
              const eventDayOfMonth = eventDate.getDate();
              const todayDayOfMonth = now.getDate();
              if (eventDayOfMonth === todayDayOfMonth) {
                const monthlyEvent = new Date(today);
                monthlyEvent.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                shouldNotify = Math.abs(now.getTime() - monthlyEvent.getTime()) <= 30000;
              }
              break;
            case 'once':
            default:
              const notifyTime = new Date(eventDate.getTime() - (event.notifyBefore || 5) * 60000);
              const timeDiff = Math.abs(now.getTime() - notifyTime.getTime());
              shouldNotify = timeDiff <= 30000 && now >= notifyTime && now < eventDate;
              break;
          }

          if (shouldNotify) {
            if (Notification.permission === 'granted') {
              const repeatText = event.repeat === 'once' ? '' : ` (${event.repeat})`;
              new Notification(`📅 Reminder: ${event.name}${repeatText}`, {
                body: `Starting in ${event.notifyBefore || 5} minutes${event.description ? '\n' + event.description : ''}`,
                icon: '/favicon.ico',
                tag: `event-${event.id}-${now.getDate()}`,
                requireInteraction: true
              });

              console.log('Notification sent for event:', {
                eventId: event.id,
                eventName: event.name,
                repeatType: event.repeat,
                timestamp: now.toISOString()
              });
            }
          }
        }
      });
    };

    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('🎉 StudySync Notifications Enabled!', {
            body: 'You\'ll now receive reminders for your scheduled tasks and events.',
            icon: '/favicon.ico',
            tag: 'welcome-notification'
          });
        }
      });
    }

    checkNotifications();
    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, [events]);

  useEffect(() => {
    setCompletedTasks(events.filter(event => event.completed).length);
  }, [events]);

  const activeTasks = events.filter(event => !event.completed).length;
  const completedTasksCount = events.filter(event => event.completed).length;
  const moneyEarned = 0;

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Math.max(...events.map(e => e.id), 0) + 1,
      completed: false
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('dashboard_events', JSON.stringify(updatedEvents));
    localStorage.setItem('schedule_events', JSON.stringify(updatedEvents));

    console.log('Sending new event to backend:', newEvent);
  };

  const handleEventComplete = (eventId) => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, completed: !event.completed } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('dashboard_events', JSON.stringify(updatedEvents));
    localStorage.setItem('schedule_events', JSON.stringify(updatedEvents));

    const updatedEvent = events.find(e => e.id === eventId);
    if (updatedEvent) {
      console.log('Sending completion status to backend:', {
        eventId,
        completed: !updatedEvent.completed
      });
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-20 transition-all duration-200">
        <div className="max-w-7xl mx-auto p-3 md:p-6 space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center gap-4 w-full">
            <div className="flex items-center justify-between w-full md:w-2/3  md:w-full p-4 bg-gradient-to-r from-brand to-brand-foreground text-white rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-orange-300 text-white text-lg font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div>
                  <h1 className="text-xl font-bold mb-1">Hello,{
                    displayName}</h1>
                  <p className="text-blue-100 text-sm">
                    We've missed you! Check out what's new
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-1/3">
              <Card className="bg-gradient-to-br w-1/2 from-yellow-50 to-orange-50 border-yellow-200 h-18">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">0</div>
                  <p className="text-xs text-yellow-400">Points</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br w-1/2 from-yellow-50 to-orange-50 border-yellow-200 h-18">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">0</div>
                  <p className="text-xs text-yellow-400">Strikes</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <FocusMode />
                </div>
                <div className="md:col-span-1">
                  <TaskChart events={events} />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <DashboardCalendarWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
