import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from "react-player"

function VideoPlayer() {
  const [state, setState] = useState({
    videoUrl: null,
    pausedTotal: 0,
    pausedTimestamp: 0,

    videoDuration: 0
  });

  useEffect(() => {
      // didnt wire up react router correctly to be able to use useParams and useLocation. not enough time to redo. so i did this indstead
      const pathArray = window.location.pathname.split('/'); 
      const videoId = pathArray[pathArray.length - 1];

      getVideoUrl(videoId);
  }, []);

  async function userProgress(videoDuration) {
    const pathArray = window.location.pathname.split('/');
    const videoId = pathArray[pathArray.length - 1];
    await axios({
      url: `/users/progress?class=${videoId}`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      data: {
        videoDuration,
        videoId,
      }
    })
  }

  async function getVideoUrl(videoId) {
    const response = await axios({
      url: `/classes/${videoId}/video-url`,
      method: 'get',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      }
    });
    
    setState((prevState) => ({
      ...prevState,
      ...response.data
    }));
  };

  async function handleProgress(e) {
    const pathArray = window.location.pathname.split('/'); 
    const videoId = pathArray[pathArray.length - 1];
    await axios({
      url: `/users/progress`,
      method: 'put',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
      data: {
        videoId,
        time: Math.floor(e.playedSeconds),
      }
    });
  }

  function handlePause(e) {
    setState((prevState) => ({
      ...prevState,
      pausedTimestamp: (Date.now() / 1000),
    }));
  }

  function handleDuration(e) {
    setState((prevState) => ({
      ...prevState,
      videoDuration: e,
    }));

    userProgress(e);
  }

  async function handlePlay(e) {
    if (state.pausedTimestamp === 0) {
      return
    }

    const timePaused = Math.round((Date.now() / 1000) - state.pausedTimestamp);
    const pausedTotal = state.pausedTotal + timePaused;

    setState((prevState) => ({
      ...prevState,
      pausedTotal,
    }));

    const pathArray = window.location.pathname.split('/'); 
    const videoId = pathArray[pathArray.length - 1];
    await axios({
      url: `/users/progress`,
      method: 'put',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
      data: {
        videoId,
        pausedTotal,
      }
    });
  }

  return (
    <div className="login min-vh-100 d-infline-flex flex-column justify-content-center align-items-center">
      <ReactPlayer
        url={state.videoUrl}
        width='100%'
        height='85vh'
        onProgress={handleProgress}
        onPause={handlePause}
        onDuration={handleDuration}
        onPlay={handlePlay}
        controls
      />
    </div>
  );
}

export default VideoPlayer;
