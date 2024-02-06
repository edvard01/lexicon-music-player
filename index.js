const songs = [
  "assets/songs/The_End_Has_Come_-_Avenger_Kills.mp3",
  "assets/songs/When_I_Fall_-_Avenger_Kills.mp3",
  "assets/songs/The_Fears_-_Avenger_Kills.mp3",
  "assets/songs/Law_abiding_citizen_-_Avenger_Kills.mp3",
  "assets/songs/The_savior_-_Avenger_Kills.mp3",
  "assets/songs/Time_of_sins_-_Avenger_Kills.mp3",
];

const pause = "pause_circle";
const play = "play_circle";
let progressBarInterval;
let currentSongIndex = 0;

const songObjects = [];

class Song {
  constructor(path, title, author, album, albumCover, id) {
    this.path = path;
    this.title = title;
    this.author = author;
    this.album = album;
    this.albumCover = albumCover;
    this.id = id;
  }
}

const playlist = document.querySelector(".playlist");
const audio = document.querySelector("#audio-player");
const currentlyPlayingImg = document.querySelector(".currently-playing-img")
  .children[0];
const currentlyPlayingText = document.querySelector(".currently-playing-info")
  .children[1];
const songStateIcon = document.querySelector(".currently-playing-nav-section")
  .children[2];
const progressBar = document.querySelector(".progress-bar");
const progressBarFill = document.querySelector(".progress-bar-fill");
const progressBarText = document.querySelector(".duration").children;
const nextSong = document.querySelector("#next-song");
const lastSong = document.querySelector("#last-song");

setupSongs();
displayAlbum(songObjects);

const mutablePlaylist = songObjects;

function displayAlbum(songs) {
  for (const song of songs) {
    let html =
      `<article class="song" id="${song.id}">` +
      `<img src="${song.albumCover}" alt="album"/>` +
      `<div class="song-text">` +
      `<h3>${song.title}</h3>` +
      `<p>${song.author}</p>` +
      `</div>` +
      `</article>`;
    playlist.innerHTML += html;
  }
}

playlist.addEventListener("click", (e) => {
  let index = e.target.closest(".song").id;
  playSong(index - 1);
});

songStateIcon.addEventListener("click", (e) => {
  if (songStateIcon.innerHTML === "pause_circle") {
    clearInterval(progressBarInterval);
    audio.pause();
    songStateIcon.innerHTML = play;
  } else {
    if (isNaN(audio.duration)) {
      playSong(currentSongIndex);
    } else {
      progressBarInterval = setInterval(drawProgressBar, 50);
      audio.play();
      songStateIcon.innerHTML = pause;
    }
  }
});

progressBar.addEventListener("click", (e) => {
  if (!isNaN(audio.duration)) {
    const elementWidth = e.currentTarget.offsetWidth;
    const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const clickPosition = (clickX / elementWidth) * elementWidth;
    audio.currentTime = audio.duration * (clickPosition / elementWidth);
  }
});

progressBarFill.addEventListener("click", (e) => {
  if (!isNaN(audio.duration)) {
    const elementWidth = 250;
    const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const clickPosition = (clickX / elementWidth) * elementWidth;
    audio.currentTime = audio.duration * (clickPosition / elementWidth);
  }
});

audio.addEventListener("ended", (e) => {
  playNextSong();
});

nextSong.addEventListener("click", (e) => {
  playNextSong();
});

lastSong.addEventListener("click", (e) => {
  playLastSong();
});

function playSong(index) {
  currentSongIndex = index;
  let currentSong = mutablePlaylist[index];
  audio.src = currentSong.path;
  currentlyPlayingImg.src = currentSong.albumCover;
  currentlyPlayingText.children[0].innerHTML = currentSong.title;
  currentlyPlayingText.children[1].innerHTML = currentSong.author;
  songStateIcon.innerHTML = pause;
  audio.play();
  drawProgressBar();
  progressBarInterval = setInterval(drawProgressBar, 50);
  addPlayingStyling(currentSong);
}

function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex > mutablePlaylist.length - 1) {
    currentSongIndex = 0;
  }

  playSong(currentSongIndex);
}

function playLastSong() {
  if (audio.currentTime > 5) {
    audio.currentTime = 0;
    drawProgressBar();
  } else {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songObjects.length - 1;
    }

    playSong(currentSongIndex);
  }
}

function drawProgressBar() {
  let currentTime = audio.currentTime;
  let length = audio.duration;
  let lengthProcent = currentTime / length;
  let width = 250 * lengthProcent;

  progressBarFill.style.width = `${width}px`;
  progressBarText[0].innerHTML = formatTime(currentTime);
  if (!isNaN(audio.duration)) {
    progressBarText[1].innerHTML = formatTime(audio.duration);
  }
}

function addPlayingStyling(song) {
  const listItem = document.getElementById(`${song.id}`);
  if (song.id === 1) {
    const lastListItem = document.getElementById(`${songObjects.length}`);
    console.log(lastListItem);
    lastListItem.classList.remove("playing");
  } else {
    const lastListItem = document.getElementById(`${song.id - 1}`);
    console.log(lastListItem);
    lastListItem.classList.remove("playing");
  }
  listItem.classList.add("playing");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

function setupSongs() {
  songObjects.push(
    new Song(
      songs[0],
      "The End Has Come",
      "Avenger Kills",
      "The End Has Come",
      "assets/album-cover/theendhascome.jpg",
      1
    )
  );
  songObjects.push(
    new Song(
      songs[1],
      "When I Fall",
      "Avenger Kills",
      "The End Has Come",
      "assets/album-cover/theendhascome.jpg",
      2
    )
  );
  songObjects.push(
    new Song(
      songs[2],
      "The Fears",
      "Avenger Kills",
      "The End Has Come",
      "assets/album-cover/theendhascome.jpg",
      3
    )
  );
  songObjects.push(
    new Song(
      songs[3],
      "Law abiding citizen",
      "Avenger Kills",
      "The Savior",
      "assets/album-cover/thesavior.jpg",
      4
    )
  );
  songObjects.push(
    new Song(
      songs[4],
      "The savior",
      "Avenger Kills",
      "The Savior",
      "assets/album-cover/thesavior.jpg",
      5
    )
  );
  songObjects.push(
    new Song(
      songs[5],
      "Time of sins",
      "Avenger Kills",
      "The Savior",
      "assets/album-cover/thesavior.jpg",
      6
    )
  );
}
