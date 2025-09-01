import { useState, useMemo } from 'react';


export const useCourseSearch = (courses) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      return courses;
    }

    const query = searchQuery.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCourses,
  };
};