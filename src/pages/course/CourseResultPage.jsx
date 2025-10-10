import React, { useEffect, useState } from 'react'
import SearchResultCard from './CourseResult'
import InfiniteScroll from 'react-infinite-scroll-component';

const CourseResultPage = ({result}) => {
  
  const [items, setItems] = useState([]);
const [hasMore, setHasMore] = useState(true);

  // Simulate full data (200 items)
  const fullData =result;

  // Initial load
  useEffect(() => {
    setItems(fullData.slice(0, 20)); // Load first 20 items
  }, []);

  const fetchMoreData = () => {
    if (items.length >= fullData.length) {
      setHasMore(false);
      return;
    }

    // Simulate loading more data
    setTimeout(() => {
      const nextItems = fullData.slice(items.length, items.length + 20);
      setItems(prev => [...prev, ...nextItems]);
    }, 500);
  };

  return (
    result?.length>0?
      <section className="mb-8 md:pl-[3.04rem] sm:mb-12">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-brand mb-2">Search Result</h2>
      </div>
     <InfiniteScroll
      className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<hr/>}
    >
      {items.map((item, index) => (
         <SearchResultCard result={item} />
      ))}
    </InfiniteScroll>      
    </section>:<section className="mb-8 sm:mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold text-brand mb-2"> Result Not Found</h2>
      </div>
    </section>
  )
}

export default CourseResultPage