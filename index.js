const songs = [
  "assets/songs/The_End_Has_Come_-_Avenger_Kills.mp3",
  "assets/songs/When_I_Fall_-_Avenger_Kills.mp3",
  "assets/songs/The_Fears_-_Avenger_Kills.mp3",
  "assets/songs/Law_abiding_citizen_-_Avenger_Kills.mp3",
  "assets/songs/The_savior_-_Avenger_Kills.mp3",
  "assets/songs/Time_of_sins_-_Avenger_Kills.mp3",
];

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

setupSongs();
displayAlbum(songObjects);

function displayAlbum(songs) {
  for (const song of songs) {
    let html =
      `<article class="song">` +
      `<img src="${song.albumCover}" alt="album"/>` +
      `<div class="song-text">` +
      `<h3>${song.title}</h3>` +
      `<p>${song.author}</p>` +
      `</div>` +
      `</article>`;
    playlist.innerHTML += html;
  }
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
