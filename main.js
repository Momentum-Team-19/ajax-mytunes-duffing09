const searchResults = document.querySelector('#searchResults')
const musicPlayer = document.getElementById("musicPlayer")
const form = document.getElementById("searchZone")
const searchTerm = document.getElementById("searchTerm")

form.addEventListener("submit",(event) => {
event.preventDefault();
    console.log(searchTerm.value)

fetch('https://proxy-itunes-api.glitch.me/search?term=' + searchTerm.value, {
    method: 'GET',
    headers: {"Content-Type": "application/json"}
})

.then((response) => {
    return response.json()
})

.then((data) => {
    console.log(data.results)
    for(let result of data.results) {
        let songBox = document.createElement('div')
        songBox.classList.add("songBox")
        let picDiv = document.createElement('img')
        picDiv.src = result.artworkUrl60
        songBox.appendChild(picDiv)

        let titleDiv = document.createElement('p')
        titleDiv.classList.add('titleDiv')
        titleDiv.innerText = result.trackName
        songBox.appendChild(titleDiv)

        let bandDiv = document.createElement('h4')
        bandDiv.innerText = result.artistName
        songBox.appendChild(bandDiv)
        searchResults.appendChild(songBox)
        songBox.addEventListener("click",() =>
            musicPlayer.src = result.previewUrl,
            musicPlayer.controls = true,
            musicPlayer.preload = "auto")
    }

})
})