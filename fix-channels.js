let channels = []

let imp = require('./channels.json')
let fios = require('./fios-channels.json')
let c = 0
let l = []
for(let i in imp) {
    let test = imp[i]
    if(!fios[imp[i]])
        test = "W" + test + " " + test
    if(fios[test])
        channels[parseInt(fios[test])] = {path: i, name: imp[i]}
    else
        l.push({path: i, name: imp[i]})
    c++
}
for(let x of l) channels.push(x)
let b = 0
for(let i in channels) {
    if(channels[i])
    channels[i].number = parseInt(i)
    b++
}
// console.log(b, c)

console.log(JSON.stringify(channels, null, 4))