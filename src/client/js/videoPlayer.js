const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainerBtn = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let volumeValue = 0.5;
let controlsMovementTimeout = null;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.pause ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  volume.value = video.muted ? 0 : volumeValue;
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
};

const timeformat = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

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
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainerBtn.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }

  videoControls.classList.add("showing");

  controlsMovementTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
};

video.addEventListener("loadeddata", handleLoadedMetaData);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volume.addEventListener("input", handleVolume);
video.addEventListener("timeupdate", handleTimeUpDate);
timeline.addEventListener("input", handleTimeLineChange);
fullScreen.addEventListener("click", handleFullscreen);
videoContainerBtn.addEventListener("mousemove", handleMouseMove);
videoContainerBtn.addEventListener("mouseleave", handleMouseLeave);
