import { useState, useEffect } from "react";
import { SessionNavBar } from "../component/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";
import { Badge } from "../component/ui/badge";
import { Input } from "../component/ui/input";
import { FullScreenCalendar } from "../component/ui/fullscreen-calendar";
import { EventDialog } from "../component/ui/event-dialog";
import { Clock, Calendar as CalendarIcon, Edit } from "lucide-react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";


const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('schedule_events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      setEvents(parsedEvents);
    }
  }, []);

  // Enhanced notification system
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      events.forEach(event => {
        if (!event.completed) {
          const eventDate = new Date(event.datetime);
          const [hours, minutes] = event.time.split(':');
          eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          const notifyTime = new Date(eventDate.getTime() - (event.notifyBefore || 5) * 60000);
          const timeDiff = Math.abs(now.getTime() - notifyTime.getTime());
          
          if (timeDiff <= 30000 && now >= notifyTime && now < eventDate) {
            if (Notification.permission === 'granted') {
              new Notification(`Reminder: ${event.name}`, {
                body: `Starting in ${event.notifyBefore || 5} minutes`,
                icon: '/favicon.ico',
                tag: `event-${event.id}`
              });
            }
          }
        }
      });
    };

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, [events]);

  // Transform events for calendar display
  const scheduleData = events.reduce((acc, event) => {
    const eventDate = new Date(event.datetime);
    const dateKey = eventDate.toDateString();
    
    if (!acc[dateKey]) {
      acc[dateKey] = {
        day: eventDate,
        events: []
      };
    }
    
    acc[dateKey].events.push({
      id: event.id,
      name: event.name,
      time: event.time,
      datetime: event.datetime,
      type: event.type,
      description: event.description
    });
    
    return acc;
  }, {} );

  const calendarData = Object.values(scheduleData);

  // Filter events by search term
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDateLabel = (date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d");
  };

  const getEventsForDate = (date) => {
    const dateKey = date.toDateString();
    return scheduleData[dateKey]?.events || [];
  };

  const getTodaysEvents = () => {
    return getEventsForDate(new Date());
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return Object.values(scheduleData).filter(item => 
      item.day.toDateString() !== today.toDateString()
    ).sort((a, b) => a.day.getTime() - b.day.getTime());
  };

  const handleAddEvent = (eventData) => {
    const newEvent= {
      ...eventData,
      id: Math.max(...events.map(e => e.id), 0) + 1,
      completed: false
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('schedule_events', JSON.stringify(updatedEvents));
    localStorage.setItem('dashboard_events', JSON.stringify(updatedEvents));
    
    console.log('Sending new event to backend:', newEvent);
  };

  const handleEditEvent = (eventData) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...eventData, id: eventId, completed: event.completed } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('schedule_events', JSON.stringify(updatedEvents));
    localStorage.setItem('dashboard_events', JSON.stringify(updatedEvents));
    
    console.log('Sending updated event to backend:', { ...eventData, id: eventId });
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('schedule_events', JSON.stringify(updatedEvents));
    localStorage.setItem('dashboard_events', JSON.stringify(updatedEvents));
    
    console.log('Sending delete request to backend for event:', eventId);
  };

  const eventTypeColors = {
    study: 'bg-blue-100 border-blue-300 text-blue-900 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100',
    meet: 'bg-green-100 border-green-300 text-green-900 dark:bg-green-900 dark:border-green-700 dark:text-green-100',
    assignment: 'bg-red-100 border-red-300 text-red-900 dark:bg-red-900 dark:border-red-700 dark:text-red-100',
    other: 'bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100'
  };

  const eventTypeBadgeColors = {
    study: 'bg-blue-500',
    meet: 'bg-green-500', 
    assignment: 'bg-red-500',
    other: 'bg-gray-500'
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        <div className="h-screen flex flex-col lg:flex-row gap-6 p-6">
          {/* Left side - Calendar */}
          <div className="flex-1 lg:flex-[2]">
            <Card className="h-full">
              <FullScreenCalendar 
                data={calendarData} 
                onDateSelect={setSelectedDate}
                onAddEvent={() => {}}
              />
            </Card>
          </div>

          {/* Right side - Schedule details */}
          <div className="w-full lg:w-80 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add Event Button */}
            <EventDialog onSave={handleAddEvent} />

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getTodaysEvents().length > 0 ? (
                  <div className="space-y-3">
                    {getTodaysEvents()
                      .filter(event => {
                        const fullEvent = events.find(e => e.id === event.id);
                        return !searchTerm || (fullEvent && (
                          fullEvent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fullEvent.description?.toLowerCase().includes(searchTerm.toLowerCase())
                        ));
                      })
                      .map((event) => {
                        const fullEvent = events.find(e => e.id === event.id);
                        return (
                          <div 
                            key={event.id} 
                            className={`p-3 rounded-lg border ${eventTypeColors[event.type]}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge 
                                className={`text-white ${eventTypeBadgeColors[event.type]}`}
                              >
                                {event.type}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-xs">
                                  <Clock className="w-3 h-3" />
                                  {event.time}
                                </div>
                                {fullEvent && (
                                  <EventDialog
                                    event={fullEvent}
                                    onSave={(data) => handleEditEvent(data, event.id)}
                                    onDelete={handleDeleteEvent}
                                    trigger={<Edit className="w-3 h-3 cursor-pointer hover:text-primary" />}
                                    isEdit
                                  />
                                )}
                              </div>
                            </div>
                            <h4 className="font-semibold text-sm mb-1">{event.name}</h4>
                            {event.description && (
                              <p className="text-xs opacity-75">{event.description}</p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    {searchTerm ? "No events match your search" : "No events scheduled for today"}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Selected Date Schedule */}
            {!isToday(selectedDate) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {getDateLabel(selectedDate)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getEventsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDate)
                        .filter(event => {
                          const fullEvent = events.find(e => e.id === event.id);
                          return !searchTerm || (fullEvent && (
                            fullEvent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            fullEvent.description?.toLowerCase().includes(searchTerm.toLowerCase())
                          ));
                        })
                        .map((event) => {
                          const fullEvent = events.find(e => e.id === event.id);
                          return (
                            <div 
                              key={event.id} 
                              className={`p-3 rounded-lg border ${eventTypeColors[event.type]}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Badge 
                                  className={`text-white ${eventTypeBadgeColors[event.type]}`}
                                >
                                  {event.type}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 text-xs">
                                    <Clock className="w-3 h-3" />
                                    {event.time}
                                  </div>
                                  {fullEvent && (
                                    <EventDialog
                                      event={fullEvent}
                                      onSave={(data) => handleEditEvent(data, event.id)}
                                      onDelete={handleDeleteEvent}
                                      trigger={<Edit className="w-3 h-3 cursor-pointer hover:text-primary" />}
                                      isEdit
                                    />
                                  )}
                                </div>
                              </div>
                              <h4 className="font-semibold text-sm mb-1">{event.name}</h4>
                              {event.description && (
                                <p className="text-xs opacity-75">{event.description}</p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      {searchTerm ? "No events match your search" : "No events scheduled for this date"}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                {getUpcomingEvents().length > 0 ? (
                  <div className="space-y-3">
                    {getUpcomingEvents().slice(0, 3).map((dateItem) => (
                      <div key={dateItem.day.toISOString()}>
                        <h5 className="text-xs font-medium text-muted-foreground mb-2">
                          {getDateLabel(dateItem.day)}
                        </h5>
                        {dateItem.events
                          .filter((event) => {
                            const fullEvent = events.find(e => e.id === event.id);
                            return !searchTerm || (fullEvent && (
                              fullEvent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              fullEvent.description?.toLowerCase().includes(searchTerm.toLowerCase())
                            ));
                          })
                          .map((event) => {
                            const fullEvent = events.find(e => e.id === event.id);
                            return (
                              <div 
                                key={event.id} 
                                className={`p-2 rounded-lg border mb-2 ${eventTypeColors[event.type]}`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <Badge 
                                    className={`text-white text-xs ${eventTypeBadgeColors[event.type]}`}
                                  >
                                    {event.type}
                                  </Badge>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-xs">
                                      <Clock className="w-3 h-3" />
                                      {event.time}
                                    </div>
                                    {fullEvent && (
                                      <EventDialog
                                        event={fullEvent}
                                        onSave={(data) => handleEditEvent(data, event.id)}
                                        onDelete={handleDeleteEvent}
                                        trigger={<Edit className="w-2 h-2 cursor-pointer hover:text-primary" />}
                                        isEdit
                                      />
                                    )}
                                  </div>
                                </div>
                                <h4 className="font-semibold text-xs">{event.name}</h4>
                              </div>
                            );
                          })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    {searchTerm ? "No upcoming events match your search" : "No upcoming events"}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
