import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg w-[100%] text-black"> {/* Set background color here */}
      <Skeleton height={20} width={200} className="mb-2 bg-white" />
      <Skeleton count={5} height={30} className='bg-white' />
    </div>
  );
};

export default LoadingSkeleton;
