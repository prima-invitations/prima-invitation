document.addEventListener('DOMContentLoaded', function () {
  const audio = new Audio('https://prima-invitations.vercel.app/grigoriy-daria/assets/music.mp3');
  const playButton = document.querySelector('.js-play-music');

  playButton.addEventListener('click', function () {
    playButton.classList.toggle('active');

    if (playButton.classList.contains('active')) {
      document.querySelector('.music-play').setAttribute('src', 'https://prima-invitations.vercel.app/grigoriy-daria/img/icons/pause.svg');
      audio.play();
    } else {
      document.querySelector('.music-play').setAttribute('src', 'https://prima-invitations.vercel.app/grigoriy-daria/img/icons/play.svg');
      audio.pause();
    }
  });
});
