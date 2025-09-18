import React, { useEffect, useState } from 'react';
import Header from './course/Header';
import CourseSection from './course/CourseSection';
import { enrolledCourses } from '../data/mockData';
import { SessionNavBar } from '../component/SessionNavBar';
import { UseDataProvider } from '../contexts/DataProvider';
import CourseResultPage from './course/CourseResultPage';
import LoaderOne from '../component/ui/loader-one';


const Course = () => {
  const { searchQuery, setSearchQuery, result, setresult, searchitem ,Userdata} = UseDataProvider();

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchitem()
    } else {
      setresult([])
    }
  }, [searchQuery])

  const handleCourseAction = (tag) => {
    setSearchQuery(tag.trim())
  };

// isloading ? <LoaderOne /> : 
  return (
    <div className="min-h-screen bg-background transition-theme">
      <SessionNavBar />
      <div className='pl-[3.04rem]'>
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
         {searchQuery?.length > 0?result?.length > 0 ? <CourseResultPage result={result} /> :<div className="flex  items-center mt-4 justify-center">
          <div className='text-center'>
            <h1 className="text-4xl font-bold text-slate-foreground mb-3">
            Nothing Found
          </h1>
          <p className="text-lg text-slate-foreground mb-2">
            Sorry, we couldn't find what you're looking for.
          </p>
          <p className="text-slate-foreground">
            The page or content you searched for doesn't exist or may have been moved.
          </p>
          </div>
        </div>:<main className="w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <CourseSection
            title="My Courses"
            description="Access your enrolled courses, PYQs, and notes"
            course={Userdata}
            onclick={handleCourseAction}
          />
        </main>}
      </div>
    </div>
  );
};

export default Course;
