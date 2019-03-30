(function() {
    if(window.location.href.includes('/profiles')) return document.getElementsByClassName('cu-nav-link ProfileList__profile-item')[0].click()

})()

Object.values(document.getElementsByClassName('channel')).map(x=> ({id: x.getAttribute('data-channel_id'), logo: x.getElementsByTagName('img')[0].src}))