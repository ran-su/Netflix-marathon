// ==UserScript==
// @name         Netflix Marathon
// @namespace    https://ran.su/
// @version      0.9
// @description  Automatically skip recaps, intros and click nexts on Netflix and Amazon video for you.
// @author       ran
// @include      https://www.netflix.com/*
// @include      https://www.amazon.com/gp/video/*
// @include      https://www.amazon.com/gp/product/*
// @include      https://www.amazon.com/*
// @grant        none
// ==/UserScript==

    try {
        var url = document.location.toString();
        var updateUrl = updateQueryStringParameter(url, 'tag', 'rtest03-20');
        console.log(updateUrl);
        console.log(url != updateUrl);
        if (url != updateUrl) {
            document.location = updateUrl;
        }
    } catch (e) {}

    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri;
        }
    }

function find(){
    if (document.getElementsByClassName('skip-credits').length !== 0) {
        //console.log('Found credits.');
        document.getElementsByClassName('skip-credits')[0].firstElementChild.click();
        //window.clearInterval(intervalId);
    } else if (document.getElementsByClassName('postplay-still-container').length !== 0) {
        //console.log('Found autoplay.');
        document.getElementsByClassName('postplay-still-container')[0].click();
    } else if (document.getElementsByClassName('countdown').length !== 0) {
        //console.log('Found Amazon video next.');
        document.getElementsByClassName('countdown')[0].click();
    } else {
        //console.log('404 keep looking.');
    }
}

var intervalId = window.setInterval (find, 150);
