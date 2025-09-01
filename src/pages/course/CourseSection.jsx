import React from 'react';
import CourseCard from './CourseCard';



const CourseSection= ({ 
  title, 
  description, 
  courses, 
  onCourseAction 
}) => {
  return (
    <section className="mb-8 sm:mb-12">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-brand mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPYQClick={() => onCourseAction(course.id, 'pyq')}
            onNotesClick={() => onCourseAction(course.id, 'notes')}
            onBuyClick={() => onCourseAction(course.id, 'buy')}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;