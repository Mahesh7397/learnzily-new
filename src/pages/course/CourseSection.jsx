import React from 'react';
import CourseCard from './CourseCard';
import { FileText, BookOpen } from 'lucide-react';


const CourseSection= ({ 
  title, 
  description, 
  onclick,
  course
}) => {
  return (
    <section className="mb-8 sm:mb-12">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-brand mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
<div className="bg-card rounded-xl border border-border p-4 sm:p-6 hover:shadow-lg transition-theme hover:border-brand/20 group">
      {/* Card Header */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.course}
        </h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
          {course.educationType} - {course.institutionName}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            onClick={()=>onclick(course.course)}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-border text-card-foreground rounded-lg hover:bg-secondary transition-theme flex-1 text-sm sm:text-base"
          >
            <FileText className="w-4 h-4" />
            <span>PYQ</span>
          </button>
          <button 
            onClick={()=>onclick(course.course)}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-border text-card-foreground rounded-lg hover:bg-secondary transition-theme flex-1 text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4" />
            <span>Notes</span>
          </button>
        </div>
      </div>
      
    </div>
    </section>
  );
};

export default CourseSection;