import React from 'react'
import SearchResultCard from './CourseResult'

const CourseResultPage = (result) => {
  return (
    result?.length>0?
      <section className="mb-8 sm:mb-12">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-brand mb-2">Search Result</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {result.map((item)=>{
           <SearchResultCard result={item} />
        })
        }
      </div>
    </section>:<section className="mb-8 sm:mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-bold text-brand mb-2"> Result Not Found</h2>
      </div>
    </section>
  )
}

export default CourseResultPage