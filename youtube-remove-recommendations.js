// ==UserScript==
// @name         YouTube Remover Recommendations
// @namespace    https://pastebin.com/giTNDHcE
// @version      2.0
// @description  Thanks to youtube for recommending crappy videos with ~10 views
// @author       NiceL 
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

// ---------------------------------------------------------------------------

function IsNumber(i)
{
    return (i >= '0' && i <= '9');
}

function IsBadVideo(videoViews)
{
    if (!videoViews) {
        return false;
    }

    let text = videoViews.innerText;

    for (let i = 0; i < text.length - 2; i++)
    {
        // not number + space + not number = this is >1000 views (this should work for all languages)
        if (!IsNumber(text[i]) && text[i + 1] == ' ' && !IsNumber(text[i + 2])) {
            return false;
        }
    }

    console.log(text); // debug
    return true;
}

// ---------------------------------------------------------------------------

function Update()
{
    let videosList;

    // delete videos from the right side
    videosList = document.getElementsByClassName("style-scope ytd-compact-video-renderer");
    for (let i = 0; i < videosList.length; i++)
    {
        let videoViews = videosList[i].getElementsByClassName("inline-metadata-item style-scope ytd-video-meta-block")[0];

        if (IsBadVideo(videoViews)) {
            videosList[i].parentElement.remove();
        }
    }

    // delete videos from the main page
    videosList = document.getElementsByClassName("style-scope ytd-rich-item-renderer");
    for (let i = 0; i < videosList.length; i++)
    {
        if (videosList[i].id != "content") {
            continue;
        }

        let videoViews = videosList[i].getElementsByClassName("inline-metadata-item style-scope ytd-video-meta-block")[0];

        if (IsBadVideo(videoViews)) {
            videosList[i].parentElement.remove();
        }
    }
}

// ---------------------------------------------------------------------------

window.addEventListener("message", (event) => {
    Update();
});

window.addEventListener("load", (event) => {
    Update();
});

window.addEventListener("scrollend", (event) => {
    Update();
});
