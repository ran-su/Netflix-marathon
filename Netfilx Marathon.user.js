// ==UserScript==
// @name         Netflix Marathon
// @namespace    https://ran.su/
// @version      1.9
// @description  Automatically skip recaps, intros and click nexts on Netflix and Amazon video for you.
// @author       ran
// @include      https://www.netflix.com/*
// @include      https://www.amazon.com/gp/video/*
// @include      https://www.amazon.de/gp/video/*
// @include      https://www.amazon.*/gp/video/*
// @include      https://www.amazon.*/gp/product/*
// @grant        none
// @license MIT
// ==/UserScript==
var count = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function find() {
  if (count === 0) {
    if (document.getElementsByClassName('skip-credits').length !== 0 && document.getElementsByClassName('skip-credits-hidden').length == 0) {
      //console.log('Found credits.');
      await sleep(200);
      document.getElementsByClassName('skip-credits')[0].firstElementChild.click();
      document.querySelector('.button-nfplayerPlay').click();
      count = 80;
      //console.log('Found credits. +4s');
      //window.clearInterval(intervalId);
    }
    else if (document.getElementsByClassName('postplay-still-container').length !== 0) {
      //console.log('Found autoplay.');
      document.getElementsByClassName('postplay-still-container')[0].click();
      count = 5;
    }
    else if (document.getElementsByClassName('WatchNext-still-container').length !== 0) {
      //console.log('Found autoplay.');
      document.getElementsByClassName('WatchNext-still-container')[0].click();
      count = 5;
    }
    else if (document.getElementsByClassName('countdown').length !== 0) {
      //console.log('Found Amazon video next.');
      document.getElementsByClassName('countdown')[0].click();
      count = 5;
    }
    else if (document.getElementsByClassName('adSkipButton').length !== 0) {
      //console.log('Found Amazon skip ad.');
      document.getElementsByClassName('adSkipButton')[0].click();
      count = 5;
    }
    else if (document.getElementsByClassName('skipElement').length !== 0) {
      //console.log('Found Amazon skip intro.');
      document.getElementsByClassName('skipElement')[0].click();
      count = 5;
    }
    else {
      //console.log('404 keep looking.');
    }
  }
  else {
    count--;
  }
}

var intervalId = window.setInterval(find, 300);
