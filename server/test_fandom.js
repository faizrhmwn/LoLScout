const res = await fetch('https://lol.fandom.com/api.php?action=query&titles=T1&prop=pageimages&format=json&pilicense=any')
const json = await res.json()
console.log(JSON.stringify(json, null, 2))
