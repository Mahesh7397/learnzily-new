import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export function EventDialog({ event, onSave, onDelete, trigger, isEdit = false }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: event?.name || '',
    description: event?.description || '',
    time: event?.time || '',
    date: event?.datetime ? new Date(event.datetime).toISOString().split('T')[0] : '',
    type: event?.type || 'study',
    notifyBefore: event?.notifyBefore || 5,
    repeat: event?.repeat || 'once'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.time || !formData.date) return;

    const datetime = new Date(`${formData.date}T${formData.time}`).toISOString();

    onSave({
      name: formData.name,
      description: formData.description,
      time: formData.time,
      datetime,
      type: formData.type,
      notifyBefore: formData.notifyBefore,
      repeat: formData.repeat
    });

    setOpen(false);
    if (!isEdit) {
      setFormData({
        name: '',
        description: '',
        time: '',
        date: '',
        type: 'study',
        notifyBefore: 5,
        repeat: 'once'
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
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
            <Label>Notify Before</Label>
            <Select value={formData.notifyBefore.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, notifyBefore: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Repeat</Label>
            <RadioGroup value={formData.repeat} onValueChange={(value) => setFormData(prev => ({ ...prev, repeat: value }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once" id="once" />
                <Label htmlFor="once">Once</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
            </RadioGroup>
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
