import React, { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";



function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function DashboardCalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
   
  useEffect(() => {
     const savedEvents = localStorage.getItem('schedule_events');
     if (savedEvents) {
       const parsedEvents = JSON.parse(savedEvents);
       setEvents(parsedEvents);
     }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const selectedDateStr = formatDate(selectedDate);
  const todayStr = formatDate(new Date());

  const dayEvents = events.filter((e) => {

    const date = new Date(e.date);

    const output = date.toISOString().split("T")[0];
    return output=== selectedDateStr
  } );

  function handlePrevMonth() {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  }

  function handleNextMonth() {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  }

  function handleAddEvent() {
    setEditingEvent(null);
    setShowModal(true);
  }

  function handleEditEvent(event) {
    setEditingEvent(event);
    setShowModal(true);
  }

  function handleSaveEvent(eventData) {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((e) => (e.id === editingEvent.id ? { ...e, ...eventData } : e))
      );
    } else {
      const newEvent= {
      ...eventData,
      id: Math.max(...events.map(e => e.id), 0) + 1,
      completed: false
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('schedule_events', JSON.stringify(updatedEvents));
    }
    setShowModal(false);
  }

  function handleDeleteEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setShowModal(false);
  }

  return (
    <div className="w-full max-w-md bg-background text-foreground p-4 sm:p-6 rounded-3xl border border-border">
      {/* Calendar Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-md hover:bg-accent"
            >
              ◀
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-md hover:bg-accent"
            >
              ▶
            </button>
          </div>
        </div>
        {/* Days Header */}
        <div className="grid grid-cols-7 text-center text-xs text-muted-foreground mb-2">
          {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 text-center text-sm gap-y-2">
          {Array.from({ length: firstDay }).map((_, i) => (
            <span key={"empty-" + i}></span>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const dateStr = formatDate(date);
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDateStr;
            const hasEvent = events.some((e) => e.date === dateStr);

            return (
              <span
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`cursor-pointer p-1 rounded-full w-7 h-7 mx-auto flex items-center justify-center 
                  ${isToday ? "bg-primary text-primary-foreground" : ""} 
                  ${isSelected ? "ring-2 ring-primary" : ""} 
                  ${hasEvent ? "underline" : ""}`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">
            {selectedDate.toLocaleDateString("default", {
              month: "long",
              day: "numeric",
            })}
          </h2>
          <button
            onClick={handleAddEvent}
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium"
          >
            + Add Event
          </button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {dayEvents.length > 0 ? (
            dayEvents.map((event) => (
              <div
                key={event.id}
                className="flex justify-between items-center bg-muted p-2 rounded text-muted-foreground"
              >
                <div>
                  <p className="font-semibold text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.time} - {event.details}
                  </p>
                </div>
                <button
                  onClick={() => handleEditEvent(event)}
                  className="text-sm text-primary"
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No events.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <EventModal
          event={editingEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setShowModal(false)}
          defaultDate={selectedDateStr}
        />
      )}
    </div>
  );
}

function EventModal({ event, onSave, onDelete, onClose, defaultDate }) {
  const [form, setForm] = useState(
    event || {
      title: "",
      date: defaultDate,
      time: "",
      type: "study",
      details: "",
      notification: false,
    }
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-background text-foreground p-6 rounded-2xl w-full max-w-sm space-y-4"
      >
        <h2 className="font-bold text-lg">{event ? "Edit Event" : "Add Event"}</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full border border-border bg-background text-foreground p-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border border-border bg-background text-foreground p-2 rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-border bg-background text-foreground p-2 rounded"
        >
          <option value="study">Study</option>
          <option value="assignments">Assignments</option>
          <option value="meet">Meet</option>
          <option value="personal">Personal</option>
        </select>
        <input
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Details"
          className="w-full border border-border bg-background text-foreground p-2 rounded"
        />
        <button
          type="button"
          onClick={() =>
            setForm((f) => ({ ...f, notification: !f.notification }))
          }
          className={`flex items-center gap-2 px-3 py-1 rounded-md border ${form.notification
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
            }`}
        >
          {form.notification ? <BellRing size={18} /> : <Bell size={18} />}
          <span className="text-sm">
            {form.notification ? "On" : "Off"}
          </span>
        </button>
        <div className="flex justify-between">
          {event && (
            <button
              type="button"
              onClick={() => onDelete(event.id)}
              className="px-3 py-1 bg-destructive text-destructive-foreground rounded"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-muted text-muted-foreground rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-primary text-primary-foreground rounded"
          >
            {event ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
