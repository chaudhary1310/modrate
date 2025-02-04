import React from 'react';
import { AbsoluteFill, Img, Sequence, useVideoConfig, useCurrentFrame, Audio, interpolate } from 'remotion';

function RemotionVideo({ script, audioFileUrl, captions, imageList, setDurationInFrame }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getDurationFrame = () => {
    const duration = (captions[captions?.length - 1]?.end / 1000) * fps;
    setDurationInFrame(duration);
    return duration;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000;
    const currentCaption = captions.find(word => currentTime >= word.start && currentTime <= word.end);
    return currentCaption ? currentCaption.text : '';
  };

  return script && (
    <AbsoluteFill className='bg-black'>
      {imageList?.map((item, index) => {
        const startTime = (index * getDurationFrame()) / imageList.length;
        const duration = getDurationFrame();
        const scale = interpolate(
          frame,
          [startTime, startTime + duration / 2, startTime + duration],
          index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <Sequence
            key={item || index}  // Added unique key prop here
            from={startTime}
            durationInFrames={getDurationFrame()}
          >
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Img
                src={item}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${scale})`
                }}
              />
              <AbsoluteFill style={{
                color: 'white',
                justifyContent: 'center',
                bottom: 50,
                height: 150,
                textAlign: 'center',
                width: '100%'
              }}>
                <h2 style={{ fontSize: '2rem' }}>{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
