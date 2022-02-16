import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo.Player('vimeo-player');

// const onPlay = event => {
//   console.log(event.seconds);
//   const storage = localStorage.setItem('videoplayer - current - time', event.seconds);
// };

// player.on('timeupdate', onPlay, 1000);

player.on(
  'timeupdate',
  throttle(event => {
    console.log(event.seconds);
    localStorage.setItem('videoplayer - current - time', event.seconds);
  }, 1000),
);

player
  .setCurrentTime(localStorage.getItem('videoplayer - current - time'))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
