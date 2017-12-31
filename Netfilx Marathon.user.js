// ==UserScript==
// @name         Netflix Marathon
// @namespace    https://ran.su/
// @version      1.2
// @description  Automatically skip recaps, intros and click nexts on Netflix and Amazon video for you.
// @author       ran
// @include      https://www.netflix.com/*
// @include      https://www.amazon.com/gp/video/*
// @include      https://www.amazon.com/gp/product/*
// @include      https://www.amazon.com/*
// @grant        none
// @license MIT
// ==/UserScript==
var count = 0;

function find() {
  if (count === 0) {
    if (document.getElementsByClassName('skip-credits').length !== 0) {
      //console.log('Found credits.');
      document.getElementsByClassName('skip-credits')[0].firstElementChild.click();
      count = 40;
      //console.log('Found credits. +4s');
      //window.clearInterval(intervalId);
    }
    else if (document.getElementsByClassName('postplay-still-container').length !== 0) {
      //console.log('Found autoplay.');
      document.getElementsByClassName('postplay-still-container')[0].click();
      count = 5;
    }
    else if (document.getElementsByClassName('countdown').length !== 0) {
      //console.log('Found Amazon video next.');
      document.getElementsByClassName('countdown')[0].click();
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

var intervalId = window.setInterval(find, 200);
