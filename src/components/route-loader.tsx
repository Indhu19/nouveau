import React, { useEffect, useState } from 'react';

export const RouteLoader: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWidth(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
