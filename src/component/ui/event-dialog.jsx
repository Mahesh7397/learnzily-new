import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Bell, BellRing } from "lucide-react";

export function EventDialog({ event, onSave, onDelete, trigger, isEdit = false }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id:event?.id || null,
    title: event?.title || '',
    details: event?.details || '',
    time: event?.time || '',
    date: event?.datetime ? new Date(event.datetime).toISOString().split('T')[0] : '',
    type: event?.type || 'study',
    notification: event?.notification || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.time || !formData.date) return;

    const datetime = new Date(`${formData.date}T${formData.time}`).toISOString();

    onSave({
      title: formData.title,
      details: formData.details,
      time: formData.time,
      date:datetime,
      type: formData.type,
      notification: formData.notification,
    });

    setOpen(false);
    if (!isEdit) {
      setFormData({
        title: '',
        details: '',
        time: '',
        date: '',
        type: 'study',
        notification: false,
      });
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            {isEdit ? <Edit className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
            {isEdit ? "Edit Event" : "Add Event"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Event" : "Add New Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.details}
              onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
              placeholder="Event description (optional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Event Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="study">Study</SelectItem>
                <SelectItem value="meet">Meeting</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
          <button
          type="button"
          onClick={() =>
            setFormData((f) => ({ ...f, notification: !f.notification }))
          }
          className={`flex items-center gap-2 px-3 py-1 rounded-md border ${formData.notification
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
            }`}
        >
          {formData.notification ? <BellRing size={18} /> : <Bell size={18} />}
          <span className="text-sm">
            {formData.notification ? "On" : "Off"}
          </span>
        </button>
          </div>

          <div className="flex justify-between pt-4">
            {isEdit && event && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEdit ? "Update" : "Create"} Event
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
