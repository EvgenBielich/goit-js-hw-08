import throttle from 'lodash.throttle';

const LS_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Vimeo.Player(iframe);

player.on(
   'timeupdate',
   throttle(e => {
   localStorage.setItem(LS_TIME_KEY, e.seconds);
   }, 1000),
);

player.setCurrentTime(localStorage.getItem(LS_TIME_KEY)).catch(error => {
   console.log(error.name, error.message);
});
