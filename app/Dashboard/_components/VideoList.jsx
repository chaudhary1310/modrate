"use client"
import React, { useState } from 'react';
import { Thumbnail } from '@remotion/player';

import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';


function VideoList({ videoList }) {
  const [openPlayDialog, setOpenPlayerDialog] = useState(false);  // Initially set to false
  const [videoId, setVideoId] = useState(null);

  return (
    <div className='mt-10 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-10'>
      {videoList?.map((video, index) => (
        <div 
          key={video?.id || index}
          className='cursor-pointer hover:scale-105 transition-all'
          onClick={() => {
            setOpenPlayerDialog(true);  // Open dialog on click
            setVideoId(video?.id);      // Set the selected video ID
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={390}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{ borderRadius: 15 }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log(v)
            }}
          />
        </div>
      ))}
      {openPlayDialog && <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />}
    </div>
  );
}




export default VideoList;
