const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainerBtn = document.getElementById("videoContainer");

let volumeValue = 0.5;

video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.pause ? "Pause" : "Play";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  volume.value = video.muted ? 0 : volumeValue;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
};

const timeformat = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const handleTimeUpDate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));

  timeline.value = Math.floor(video.currentTime);
};

const handleLoadedMetaData = () => {
  totalTime.innerText = timeformat(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainerBtn.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

video.addEventListener("loadedmetadata", handleLoadedMetaData);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volume.addEventListener("input", handleVolume);
video.addEventListener("timeupdate", handleTimeUpDate);
timeline.addEventListener("input", handleTimeLineChange);
fullScreen.addEventListener("click", handleFullscreen);
