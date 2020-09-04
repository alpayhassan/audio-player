const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const muteBtn = document.getElementById('mute');

// Audio Files
const audioFiles = [
    {
        name: '111',
        displayName: 'Surah al-Masad',
        artist: 'Muhammad Siddiq al Minshawi',
    },
    {
        name: '112',
        displayName: 'Surah al-Ikhlaas',
        artist: 'Muhammad Siddiq al Minshawi',
    },
    {
        name: '113',
        displayName: 'Surah al-Falaq',
        artist: 'Muhammad Siddiq al Minshawi',
    },
    {
        name: '114',
        displayName: 'Surah al-Naas',
        artist: 'Muhammad Siddiq al Minshawi',
    }
];

//Check
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//  Update DOM
function loadSong(song) {
    title.innerText = song.displayName;
    artist.textContent = song.artist;
    music.src = `audiofiles/${song.name}.mp3`;
    image.src = `img/111.jpg`;
}

//  Current Song
let songIndex = 0;

//  Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = audioFiles.length - 1;
    }
    console.log(songIndex);
    loadSong(audioFiles[songIndex]);
    playSong();
}

//  Next Song
function nextSong() {
    songIndex++;
    if (songIndex > audioFiles.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(audioFiles[songIndex]);
    playSong();
}

//  On Load - Select First Song
loadSong(audioFiles[songIndex]);

//  Update Progress Bar and Time
function  updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //  Update Progress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //  Calculate Display for Duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //  Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //  Calculate Display for Current Time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//  Set Progress Bar
function  setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

function muteAudio() {
    if(music.muted) {
        music.muted = false;
    }else{
        music.muted = true;
    }
}

function myFunction(x) {
    x.classList.toggle("fa-volume-up");
    // muteBtn.setAttribute('title', 'Unmute');
}

//  Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
muteBtn.addEventListener('click', muteAudio);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);