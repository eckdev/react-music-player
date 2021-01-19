import { useEffect, useRef, useState } from 'react';
import Cover from './Cover';
import Controls from './Controls'
import './App.css';
import Progress from './Progress';

function App() {
  var tracks = [
    {
      name: "Mekanın Sahibi",
      artist: "Norm Ender",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
      url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
      favorited: false
    },
    {
      name: "Everybody Knows",
      artist: "Leonard Cohen",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
      url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
      favorited: true
    },
    {
      name: "Extreme Ways",
      artist: "Moby",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
      url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
      favorited: false
    },
    {
      name: "Butterflies",
      artist: "Sia",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
      url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
      favorited: false
    },
    {
      name: "The Final Victory",
      artist: "Haggard",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
      url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
      favorited: true
    },
    {
      name: "Genius ft. Sia, Diplo, Labrinth",
      artist: "LSD",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
      url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
      favorited: false
    },
    {
      name: "The Comeback Kid",
      artist: "Lindi Ortega",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
      url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
      favorited: true
    },
    {
      name: "Overdose",
      artist: "Grandson",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
      url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
      favorited: false
    },
    {
      name: "Rag'n'Bone Man",
      artist: "Human",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
      url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
      favorited: false
    }
  ];

  const trackDetails = {
    duration: 0,
    currentTime: 0
  };

  const [audio, setAudio] = useState();
  const [durationText, setDurationText] = useState("");
  const [currentTimeText, setCurrentTimeText] = useState("");
  const [barWidth, setBarWidth] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0].source)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const progressRef = useRef(null);


  useEffect(() => {
    const track = new Audio();
    track.src = currentTrack;
    track.onended = function () {
      const i = currentTrackIndex;
      setCurrentTrackIndex(i + 1); setCurrentTrack(tracks[i + 1].source);
      setPlaying(true);
    }
    track.onloadedmetadata = function () {
      generateTime(track.duration, track.currentTime);
    };
    track.ontimeupdate = function () {
      generateTime(track.duration, track.currentTime);
    };
    setAudio(track);
  }, []);

  const nextTrack = () => {
    const i = currentTrackIndex;
    let index = i + 1 === tracks.length ? 0 : i + 1;
    console.log(index);
    setCurrentTrackIndex(index);
    setCurrentTrack(tracks[index].source);
    reset(tracks[index].source)
  }

  const prevTrack = () => {
    let i = currentTrackIndex;
    const index = i - 1 < 0 ? 0 : i - 1;
    setCurrentTrackIndex(index);
    setCurrentTrack(tracks[index].source);
    reset(tracks[index].source)
  }

  const reset = (src) => {
    setBarWidth(0 + '%');
    audio.currentTime = 0;
    audio.src = src;
    setTimeout(() => {
      if (playing) {
        audio.play();
      } else {
        audio.pause();
      }
    }, 300);
  }

  const play = () => {
    setPlaying(true)
    audio.play();
  }

  const pause = () => {
    setPlaying(false)
    audio.pause();
  }

  const generateTime = (duration, currentTime) => {
    if (isNaN(duration)) { duration = 0; }
    if (isNaN(currentTime)) { currentTime = 0; }
    trackDetails.duration = duration;
    trackDetails.currentTime = currentTime;
    let width = (100 / trackDetails.duration) * trackDetails.currentTime;
    setBarWidth(width + "%");
    let durmin = Math.floor(parseFloat(trackDetails.duration / 60));
    let dursec = Math.floor(trackDetails.duration - durmin * 60);
    let curmin = Math.floor(trackDetails.currentTime / 60);
    let cursec = Math.floor(trackDetails.currentTime - curmin * 60);
    if (durmin < 10) {
      durmin = "0" + durmin;
    }
    if (dursec < 10) {
      dursec = "0" + dursec;
    }
    if (curmin < 10) {
      curmin = "0" + curmin;
    }
    if (cursec < 10) {
      cursec = "0" + cursec;
    }
    setDurationText(durmin + ":" + dursec);
    setCurrentTimeText(curmin + ":" + cursec);
  }

  const updateBar = (x) => {
    pause();
    let progress = progressRef.current;
    let maxduration = audio.duration;
    let position = x - progress.offsetLeft;
    let percentage = (100 * position) / progress.offsetWidth;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    setBarWidth(percentage + "%");
    audio.currentTime = (maxduration * percentage) / 100;
    play();
  }

  return (
    <div className="wrapper">
      <div className="player">
        <div className="player__top">
          <Cover photoUrl={tracks[currentTrackIndex].cover}></Cover>
          <Controls url={tracks[currentTrackIndex].url} nextTrack={nextTrack} prevTrack={prevTrack} pause={pause} play={play} playing={playing}></Controls>
        </div>
        <Progress
          artistName={tracks[currentTrackIndex].artist}
          trackName={tracks[currentTrackIndex].name}
          progressRef={progressRef}
          durationText={durationText}
          currentTimeText={currentTimeText}
          barWidth={barWidth}
          updateBar={updateBar}>
        </Progress>
      </div>
    </div>
  );
}

export default App;
