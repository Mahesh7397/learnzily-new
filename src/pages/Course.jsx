import React from 'react';
import Header from './course/Header';
import CourseSection from './course/CourseSection';
import { enrolledCourses } from '../data/mockData';
import { useCourseSearch } from '../contexts/useCourseSearch';
import { SessionNavBar } from '../component/SessionNavBar';


const Course = () => {

   const { searchQuery, setSearchQuery, filteredCourses: filteredExclusiveCourses } = useCourseSearch([]);

  const handleCourseAction = (courseId, action) => {
    console.log(`Course ${courseId} - Action: ${action}`);
    
    switch (action) {
      case 'pyq':
        alert(`Opening PYQ for course ${courseId}`);
        break;
      case 'notes':
        alert(`Opening Notes for course ${courseId}`);
        break;
      case 'buy':
        alert(`Purchasing course ${courseId}`);
        break;
      default:
        break;
    }
  };
  return (
        <div className="min-h-screen bg-background transition-theme">
          <SessionNavBar/>
          <div className='pl-[3.04rem]'>
             <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <CourseSection
          title="My Courses"
          description="Access your enrolled courses, PYQs, and notes"
          courses={enrolledCourses}
          onCourseAction={handleCourseAction}
        />
      </main>
          </div>
     
    </div>
  );
};

export default Course;
