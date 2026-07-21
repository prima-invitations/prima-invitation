document.addEventListener('DOMContentLoaded', function () {
  const audio = new Audio('https://prima-invitation.com/pavel-emma/assets/music.mp3');
  const playButton = document.querySelector('.js-play-music');

  playButton.addEventListener('click', function () {
    playButton.classList.toggle('active');

    if (playButton.classList.contains('active')) {
      document
        .querySelector('.music-play')
        .setAttribute('src', 'https://prima-invitation.com/pavel-emma/img/icons/pause.svg');
      audio.play();
    } else {
      document
        .querySelector('.music-play')
        .setAttribute('src', 'https://prima-invitation.com/pavel-emma/img/icons/play.svg');
      audio.pause();
    }
  });
});
