'use client'
import { useEffect, useRef } from 'react';

const VideoCard = () => {
const containerRef = useRef(null);

useEffect(() => {
  if (typeof window === 'undefined') return;

  const container = containerRef.current;
  let scrollPosition = container.scrollWidth;

  const scrollVideos = () => {
    if (container) {
      scrollPosition += 2;
      container.scrollLeft = scrollPosition;

      if (scrollPosition >= container.scrollWidth - container.clientWidth) {
        scrollPosition = 0;
      }
    }
  };

  const intervalId = setInterval(scrollVideos, 30);

  return () => clearInterval(intervalId);
}, []);

const videos = [
    "/videos/1.mp4",
    "/videos/2.mp4",
    "/videos/3.mp4",
    "/videos/4.mp4",
    "/videos/5.mp4",
    
   
];

return (
  <div className="relative w-full h-[60vh]  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"> 
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full flex overflow-hidden space-x-4 p-4"
    >
      {videos.map((videoSrc, index) => (
        <video
          key={index}
          width={100}
          height={150}
          className="  h-48 object-cover rounded-lg w-full bg-transparent"
          autoPlay
          loop
          muted
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  </div>
);
};

export default VideoCard;
