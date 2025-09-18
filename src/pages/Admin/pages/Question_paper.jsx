import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Download, Calendar, Clock, FileText, Star, Edit, Trash2, Plus } from 'lucide-react';
import { UseDataProvider } from '../../../contexts/DataProvider';

const Question_paper = () => {
  const location=useLocation()
  const {resources}=UseDataProvider()
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [questionPapers, setQuestionPapers] = useState([...resources?.questionpaper||null]);


  const subjects = ['all', ...Array.from(new Set(questionPapers.map(paper => paper.Sub_name)))];
  const years = ['all', ...Array.from(new Set(questionPapers.map(paper => paper.year.split('-')[1]))).sort().reverse()];

  const filteredPapers = questionPapers.filter(paper => {
    const matchesSearch = paper.Sub_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.Course_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || paper.Sub_name === selectedSubject;
    const matchesYear = selectedYear === 'all' || paper.year.split('-')[1] === selectedYear;
    return matchesSearch && matchesSubject && matchesYear;
  });


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question paper?')) {
      setQuestionPapers(questionPapers.filter(paper => paper.id !== id));
    }
  };

  const handleEdit = (id) => {
    // In a real app, this would open an edit modal or navigate to edit page
    console.log('Edit question paper with id:', id);
    alert('Edit functionality would be implemented here');
  };

  const handleDownload = (paper) => {
    // In a real app, this would trigger actual file download
    console.log('Download question paper:', paper.title);
    alert(`Downloading: ${paper.title}`);
  };

  return (
   <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search question papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-success focus:border-transparent text-foreground"
            />
          </div>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-success focus:border-transparent text-foreground"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-success focus:border-transparent text-foreground"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year === 'all' ? 'All Years' : year}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Showing {filteredPapers.length} of {questionPapers.length} question papers
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPapers.map(paper => (
          <div key={paper.id} className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {paper.Sub_name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                      {paper.Course_name}
                    </span>
                    <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {paper.College_Degree}
                    </span>
                  </div>
                </div>
                <FileText className="h-5 w-5 text-success ml-2 flex-shrink-0" />
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Year: {paper.Sem_month_year}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEdit(paper.id)}
                    className="p-1.5 text-muted-foreground hover:text-info hover:bg-info/10 rounded transition-colors"
                    title="Edit question paper"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(paper.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                    title="Delete question paper"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDownload(paper)}
                    className="flex items-center space-x-1 bg-success text-success-foreground px-3 py-1.5 rounded-lg hover:bg-success/90 transition-colors text-sm font-medium"
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

      {filteredPapers.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No question papers found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or browse all subjects and years.</p>
        </div>
      )}
    </div>
  )
}

export default Question_paper