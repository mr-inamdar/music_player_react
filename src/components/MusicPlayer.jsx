import React, { useState, useRef, useEffect } from 'react';
import {Play, Pause, Next, Previous} from "./IconBtn";
import TRACKS from "../data/tracks";
import RangeSlider from './RangeSlider';

export default function MusicPlayer() {
  const musik_ref = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // useEffect(() => {
  //   isPlaying ? musik_ref.current.play() : musik_ref.current.pause();
  // }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (!musik_ref.current) return;

    if (isPlaying) {
      musik_ref.current.play();
    } else {
      musik_ref.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: TRACKS[currentTrack].title,
        artist: TRACKS[currentTrack].artist,
        album: "MUSIK",
        artwork: [
          { src: TRACKS[currentTrack].cover, sizes: "512x512", type: "image/png" },
        ],
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        // musik_ref.current.play();
        HandlePlayPause();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        // musik_ref.current.pause();
        HandlePlayPause();
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        // nextSong();
        HendleNext();
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        // prevSong();
        HendlePrev();
      });
    }
  }, []);

  // useEffect(() => {
  //   if (isPlaying) {
  //     musik_ref.current.play();
  //   }
  // }, [currentTrack]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState =
        isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);


  // const HandlePlayPause = () =>{
  //   setIsPlaying(!isPlaying);
  // }
  const HandlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // const HendleNext = () =>{
  //   setCurrentTrack((currentTrack + 1) % TRACKS.length);
  // }
  // const HendlePrev = () =>{
  //   setCurrentTrack(currentTrack === 0 ? TRACKS.length - 1 : currentTrack - 1);
  // }
  const HendleNext = () => {
    setCurrentTrack(prev => (prev + 1) % TRACKS.length);
  };

  const HendlePrev = () => {
    setCurrentTrack(prev =>
      prev === 0 ? TRACKS.length - 1 : prev - 1
    );
  };

  const handle_seek = (e)=>{
    musik_ref.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  const format_time = (time)=>{
    const minutes = Math.floor(time/60).toString().padStart(2, '0');
    const secounds = Math.floor(time % 60).toString().padStart(2, '0');

    return `${minutes}:${secounds}`;
  }
  const { title , artist, cover, src} = TRACKS[currentTrack];
  return (
    <div className='musik_c'>
      <h1>𝕄𝕌𝕊𝕀𝕂</h1>
      <div className="musik_wrapper">
        <div className="musik_content">
            <img src={cover} alt="cover-img" className="musik_cover" />
            <div className="title_wrapper">
                <h2 className='title_track'>{title}</h2>
            </div>
            <p className="track_artist">{artist}</p>
            <div className="timeline">
              <p>{format_time(currentTime)}</p>
              {/* timeline */}
              <RangeSlider max={duration} value={currentTime} onChange={handle_seek} />
              <p>{format_time(duration)}</p>
            </div>
            <div className="controls">
                <Previous onClick= {HendlePrev} />
                { isPlaying ? ( <Pause onClick={HandlePlayPause} /> ) : ( <Play onClick= {HandlePlayPause} /> ) }
                <Next onClick= {HendleNext} />
            </div>
            <audio
              ref={musik_ref}
              src={src}
              preload="metadata"
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              onEnded={HendleNext}
            />
        </div>
      </div>
    </div>
  )
}
