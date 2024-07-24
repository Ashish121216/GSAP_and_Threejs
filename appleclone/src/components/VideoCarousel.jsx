import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import pauseImg from "/assets/images/pause.svg";
import playImg from "/assets/images/play.svg";
import replayImg from "/assets/images/replay.svg";
import { useGSAP } from "@gsap/react";
const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpinRef = useRef([]);
  const videoDivRef = useRef([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startplay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;
  const [loadedData, setLoadedData] = useState([]);
  useGSAP(() => {
    gsap.to('#slider',{
      transform: `translateX(${-100 * videoId})%)`,
      duration:2,
      ease:'power2.inOut'
    })
    gsap.to('#video', {
      scrollTrigger:{
        trigger:'#video',
        toggleActions:'restart none none none'
      },
      onComplete:() =>{
        setVideo((pre) => ({
          ...pre,
          startplay:true,
          isPlaying:true,

        }))
      }
    }
    )
  }, [isEnd, videoId])
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetaData = (i,e) => 
    setLoadedData((pre) => [...pre, e])
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpinRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if(progress != currentProgress ){
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? '10vw'
              : window.innerWidth < 1200 ?'10vw'
              :  '4vw'
            })
            gsap.to(span[videoId],{
              width: `${currentProgress}%`,
              backgroundColor: 'white'
            })
          }
        },
        onComplete: () => {
          if(isPlaying){
            gsap.to(videoDivRef[videoDivRef],{
              width:'12px'
            })
            gsap.to(span[videoId],{
              backgroundColor: '#afafaf'
            })
          }
        },
      });
      if(videoId === 0){
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime / 
          hightlightsSlides[videoId].videoDuration
        )
      }
      if(isPlaying){
        gsap.ticker.add(animUpdate);
      }
      else{
        gsap.ticker.remove(animUpdate);
      }
    }
  },[videoId, startPlay]);
  const handleProcess = (type, i) => {
    switch(type){
      case 'video-end':
        setVideo((pre) => ({...pre, isEnd:true, videoId:i+1}))
        break
      case 'video-last':
        setVideo((pre) => ({...pre, isLastVideo:true}))
        break
      case'play':
        setVideo((pre) => ({...pre, isPlaying:!pre.isPlaying}))
        break
      default:
        return video
    }
  }
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id}>
            <div className="video_carousel-container">
              <div
                className="w-full h-full flex-center
                        rounded-3xl bg-black mt-5"
              >
                <video
                  id="video"
                  playsInline={true}
                  muted
                  autoPlay={true}
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() => 
                    i !== 3
                    ? handleProcess('videp-end', i)
                    : handleProcess('video-last')
                  }
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i,e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-5 left-[5%]">
                {list.textLists.map((text) => (
                  <div key={text} className="text-sm">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
        {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpinRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
