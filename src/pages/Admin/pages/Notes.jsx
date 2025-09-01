import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Search, Download, Calendar, User, BookOpen, Edit, Trash2, Plus } from 'lucide-react';

const Notes = () => {
  const location = useLocation()
  const { data } = location.state || [];
  console.log(data)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [notes, setNotes] = useState([...data])

  {/**
    College_Degree: "majskj"
Course_name: "test cose"
Issue_date: "2025-08-23T07:54:25.375Z"
Key: "notes/undefined"
Sub_name: "test"
    */}
  const subjects = ['all', ...Array.from(new Set(notes.map(note => note.Course_name)))];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.Sub_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.Course_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    const matchesSubject = selectedSubject === 'all' || note.Sub_name === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const handleEdit = (id) => {
    // In a real app, this would open an edit modal or navigate to edit page
    console.log('Edit note with id:', id);
    alert('Edit functionality would be implemented here');
  };

  const handleDownload = (note) => {
    // In a real app, this would trigger actual file download
    console.log('Download note:', note.title);
    alert(`Downloading: ${note.title}`);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-foreground"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent text-foreground"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredNotes.length} of {notes.length} notes
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map(note => (
          <div key={note.id} className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {note.Sub_name}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-brand/10 text-brand text-xs font-medium rounded-full">
                    {note.Course_name}
                  </span>
                </div>
                <BookOpen className="h-5 w-5 text-brand ml-2 flex-shrink-0" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  {note.author}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(note.Issue_date).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(note.id)}
                    className="p-1.5 text-muted-foreground hover:text-info hover:bg-info/10 rounded transition-colors"
                    title="Edit note"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                    title="Delete note"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(note)}
                    className="flex items-center space-x-1 bg-brand text-brand-foreground px-3 py-1.5 rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or browse all subjects.</p>
        </div>
      )}
    </div>
  )
}

export default Notes