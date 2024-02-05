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

const songObjects = [];

class Song {
  constructor(path, title, author, album, albumCover) {
    this.path = path;
    this.title = title;
    this.author = author;
    this.album = album;
    this.albumCover = albumCover;
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

setupSongs();
displayAlbum(songObjects);

function displayAlbum(songs) {
  let counter = 0;
  for (const song of songs) {
    let html =
      `<article class="song" id="${counter}">` +
      `<img src="${song.albumCover}" alt="album"/>` +
      `<div class="song-text">` +
      `<h3>${song.title}</h3>` +
      `<p>${song.author}</p>` +
      `</div>` +
      `</article>`;
    playlist.innerHTML += html;
    counter++;
  }
}

playlist.addEventListener("click", (e) => {
  let index = e.target.closest(".song").id;
  playSong(index);
});

songStateIcon.addEventListener("click", (e) => {
  if (songStateIcon.innerHTML === "pause_circle") {
    audio.pause();
    clearInterval(progressBarInterval);
    songStateIcon.innerHTML = play;
  } else {
    audio.play();
    songStateIcon.innerHTML = pause;
    progressBarInterval = setInterval(drawProgressBar, 1000);
  }
});

progressBar.addEventListener("click", (e) => {
  console.log(e.target.style.offsetX);
});

function playSong(index) {
  let currentSong = songObjects[index];
  audio.src = currentSong.path;
  currentlyPlayingImg.src = currentSong.albumCover;
  currentlyPlayingText.children[0].innerHTML = currentSong.title;
  currentlyPlayingText.children[1].innerHTML = currentSong.author;
  songStateIcon.innerHTML = pause;
  audio.play();
  drawProgressBar();
  progressBarInterval = setInterval(drawProgressBar, 5);
}

function drawProgressBar() {
  let currentTime = audio.currentTime;
  let length = audio.duration;
  let lengthProcent = currentTime / length;
  let width = 250 * lengthProcent;
  console.log(progressBarFill);

  progressBarFill.style.width = `${width}px`;
  progressBarText[0].innerHTML = formatTime(currentTime);
  progressBarText[1].innerHTML = formatTime(audio.duration);
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
      "assets/album-cover/theendhascome.jpg"
    )
  );
  songObjects.push(
    new Song(
      songs[1],
      "When I Fall",
      "Avenger Kills",
      "The End Has Come",
      "assets/album-cover/theendhascome.jpg"
    )
  );
  songObjects.push(
    new Song(
      songs[2],
      "The Fears",
      "Avenger Kills",
      "The End Has Come",
      "assets/album-cover/theendhascome.jpg"
    )
  );
  songObjects.push(
    new Song(
      songs[3],
      "Law abiding citizen",
      "Avenger Kills",
      "The Savior",
      "assets/album-cover/thesavior.jpg"
    )
  );
  songObjects.push(
    new Song(
      songs[4],
      "The savior",
      "Avenger Kills",
      "The Savior",
      "assets/album-cover/thesavior.jpg"
    )
  );
  songObjects.push(
    new Song(
      songs[5],
      "Time of sins",
      "Avenger Kills",
      "The Savior",
      "assets/album-cover/thesavior.jpg"
    )
  );
}
