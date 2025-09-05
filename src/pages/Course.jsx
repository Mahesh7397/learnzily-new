import React, { useEffect, useState } from 'react';
import Header from './course/Header';
import CourseSection from './course/CourseSection';
import { enrolledCourses } from '../data/mockData';
import { SessionNavBar } from '../component/SessionNavBar';
import { UseDataProvider } from '../contexts/DataProvider';
import CourseResultPage from './course/CourseResultPage';
import LoaderOne from '../component/ui/loader-one';


const Course = () => {
  const [isloading, setisloading] = useState(false)
  const { searchQuery, setSearchQuery, result, setresult, searchitem } = UseDataProvider();
  useEffect(() => {
    if (searchQuery.length > 0) {
      searchitem()
    } else {
      setresult([])
    }
  }, [searchQuery])
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
      <SessionNavBar />
      <div className='pl-[3.04rem]'>
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        {isloading ? <LoaderOne /> : result?.length > 0 ? <CourseResultPage result={result} /> : <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <CourseSection
            title="My Courses"
            description="Access your enrolled courses, PYQs, and notes"
            courses={enrolledCourses}
            onCourseAction={handleCourseAction}
          />
        </main>}
      </div>
    </div>
  );
};

export default Course;
