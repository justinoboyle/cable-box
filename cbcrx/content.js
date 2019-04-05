fetch(chrome.runtime.getURL('data/channels-final.json'))
    .then(r => r.json())
    .then(j => {console.log(j); window._CHANNELS = j; setTimeout(() => run(), 2)})

if(window.location.href.includes('newtab')) window.location.href="https://hulu.com/"

function run() {
    if(window.location.href.includes('/profiles')) return document.getElementsByClassName('cu-nav-link ProfileList__profile-item')[0].click()
    if(window.location.href.includes('hulu.com/') && window.location.href.endsWith('/')) tuneToChannel(2)
}

function tuneToChannel(channel = 2) {
    try {
    let {path, name, number} = _CHANNELS[channel]
    let provider = path.split("@")[0]
    path = path.split("@")[1]
    switch(provider) {
        case "hulu": {
            return window.location.href=`https://hulu.com/watch/${path}`
        }
        case "url": {
            return window.location.href=path
        }
    }
    }catch(e) {}
}
// CHANGE chrome://flags/#autoplay-policy
setInterval(() => {
    try {
    Object.values(document.getElementsByClassName('vjs-menu-item')).filter(a => a.innerText.includes('CC1'))[0].click()
    }catch(e) {}
}, 2000)
setTimeout(() => {
    var node = document.createElement("inject");
let sp = "Player__container"
if(window.location.href.includes('brightcove.net')) {
    sp = "video-js"
    console.log("ABC!")
    setInterval(() => {
        document.getElementsByTagName('video')[0].play()
        PLAYBR()
    }, 1000)
    
}
function PLAYBR() {
    console.log(document.getElementsByClassName('vjs-big-play-button')[0])
    document.getElementsByClassName('vjs-big-play-button')[0].click()
}
document.getElementsByClassName(sp)[0].prepend(node); document.getElementsByTagName('inject')[0].innerHTML = window.INJECT; r() 
}, 50)
function r() {
    let buf = ""
let tr = -1
window.onkeydown = ({key}) => key == '0' || parseInt(key) ? pushNumber(key) : handleKey(key)
let e = false
let last = null
let current = 300
function handleKey(key) {
    console.log(key)
    switch(key) {
        case "PageUp": return changeToChannel(current + 1)
        case "PageDown": return changeToChannel(current - 1)
    }
}

function pushNumber(num) {
    buf += num
    if(!e) {
        document.getElementsByClassName('circle')[0].setAttribute('class', 'circle circle-enabled')
        document.getElementsByClassName('navBar')[0].setAttribute('class', 'navBar navBar-enabled')

        setTimeout(() => {
            let change = buf
            document.getElementsByClassName('circle')[0].setAttribute('class', 'circle circle-disabling')
            buf = ""
            setTimeout(() => {
                document.getElementsByClassName('circle')[0].setAttribute('class', 'circle circle-disabled')
                document.getElementsByClassName('navBar')[0].setAttribute('class', 'navBar navBar-disabled')

            }, 400)
            document.getElementsByClassName('text')[0].innerHTML = ""
            last = null
            changeToChannel(parseInt(change))
            e = false
        }, 3000)
        e = true
    }
    let p = document.createElement('f')
    p.innerText = num
    last = p
    document.getElementsByClassName('text')[0].appendChild(p)
    window.changeToChannel = tuneToChannel
}

}
window.INJECT = `
<style>

.circular-chart {
  display: inline;
  margin: 10px auto;
  max-width: 70px;
  max-height: 70px;
  /* background-color: pink; */

}

.navBar {
    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    padding-left: 30px;
    padding-right: 30px;
    position: absolute;
    width: 100%;
    z-index: 999;
    top: 0 !important;
}

.navBar-enabled {
    animation: fadein 500ms;
    opacity: 1;
}

.navBar-disabled {
    animation: fadeout 500ms;
    opacity: 0;
}
.navBar-disabled-initial {
    opacity: 0;
}

.circle {
  stroke: white;
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  
  
}
.circle-disabled {
    stroke-dasharray: 100;
    opacity: 0;
}
.circle-enabled {
    animation: progress 3s ease-out forwards, fadein 500ms;
    opacity: 1;
}
.circle-disabling {
    animation: fadeout 500ms;
    opacity: 0;
}

.text {
   font-size: 40px; 
   color: white;
   font-weight: 600;
    margin-top: 30px;
    top: 30px;
    /* background-color: pink; */
    display: inline-block;
    transform: translateY(-30px);
    font-family: sans-serif;
    margin-left: 10px;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}


@keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

f {
    animation: fadein 500ms;
    margin-right: 5px;
    border-bottom: 2px solid white

}

body {
    margin: 0;
    /* background: url('https://cdn1.thr.com/sites/default/files/imagecache/landscape_928x523/2018/02/screen_shot_2018-02-07_at_9.57.26_am_1_-_h_2018.jpg') no-repeat center; */
    background-size: cover;
}

@keyframes progress {
  0% {
    stroke-dasharray: 100 0;
  }
}
webview,iframe {
    width: 100%;
    height: 100%;
}
</style>
<div class="navBar navBar-disabled-initial">
    <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle circle-disabled"
            stroke-dasharray="0, 100"
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
    </svg>
    <div class="text"></div>
</div>
`
