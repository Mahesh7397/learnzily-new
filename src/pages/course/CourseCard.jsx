import React from 'react';
import { FileText, BookOpen } from 'lucide-react';



const CourseCard = ({ 
  course, 
  onPYQClick, 
  onNotesClick, 
  onBuyClick 
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-6 hover:shadow-lg transition-theme hover:border-brand/20 group">
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-2 group-hover:text-brand transition-theme line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3">{course.category}</p>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">{course.description}</p>
      </div>

      {course.isEnrolled ? (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            onClick={onPYQClick}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-border text-card-foreground rounded-lg hover:bg-secondary transition-theme flex-1 text-sm sm:text-base"
          >
            <FileText className="w-4 h-4" />
            <span>PYQ</span>
          </button>
          <button 
            onClick={onNotesClick}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-border text-card-foreground rounded-lg hover:bg-secondary transition-theme flex-1 text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4" />
            <span>Notes</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-brand">{course.currency}{course.price}</span>
            <span className="text-muted-foreground text-xs sm:text-sm">/ course</span>
          </div>
          <button 
            onClick={onBuyClick}
            className="w-full bg-brand text-brand-foreground py-2.5 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-theme shadow-sm hover:shadow-md text-sm sm:text-base"
          >
            Buy for {course.currency}{course.price}
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;