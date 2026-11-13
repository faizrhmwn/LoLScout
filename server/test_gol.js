const res = await fetch('https://gol.gg/tournament/tournament-matchlist/Worlds%202024/')
const text = await res.text()
const imgs = text.match(/<img[^>]+src="([^">]+)"/g)
console.log('Sample images from gol.gg:', imgs ? imgs.slice(0, 20) : 'none')
