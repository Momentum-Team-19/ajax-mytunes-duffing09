const searchResults = document.querySelector('#searchResults')
const musicPlayer = document.getElementById("musicPlayer")
const form = document.getElementById("searchZone")
const searchTerm = document.getElementById("searchTerm")
const modeSwitch = document.getElementById("modeSwitch");

document.addEventListener("DOMContentLoaded", () => {
    const darkModePreference = localStorage.getItem("darkModePreference");
    console.log(darkModePreference)
    if (darkModePreference !== null) {
        const isDarkMode = darkModePreference ==="true";
        document.body.classList.toggle("dark-mode", isDarkMode);
    }
})


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode")
    const isDarkMode = document.body.classList.contains("dark-mode")
    localStorage.setItem("darkModePreference", isDarkMode)
}
modeSwitch.addEventListener("click", toggleDarkMode)

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}
form.addEventListener("submit",(event) => {
event.preventDefault();
console.log(searchTerm.value)
removeAllChildNodes(searchResults)


fetch('https://proxy-itunes-api.glitch.me/search?term=' + searchTerm.value, {
    method: 'GET',
    headers: {"Content-Type": "application/json"}
})

.then((response) => {
    return response.json()
})

.then((data) => {

    if (data.results.length === 0) {
        console.log("no results")
        let messageDiv = document.createElement('div')
        messageDiv.innerText = "Invalid search term"
        searchResults.appendChild(messageDiv)
    }
    else {


    console.log(data.results)
    for(let result of data.results) {
        let songBox = document.createElement('div')
        songBox.classList.add("songBox")
        let picDiv = document.createElement('img')
        picDiv.src = result.artworkUrl100
        songBox.appendChild(picDiv)

        let titleDiv = document.createElement('p')
        titleDiv.classList.add('titleDiv')
        titleDiv.innerText = result.trackName
        songBox.appendChild(titleDiv)

        let bandDiv = document.createElement('h4')
        bandDiv.classList.add("bandDiv")
        bandDiv.innerText = result.artistName
        songBox.appendChild(bandDiv)
        searchResults.appendChild(songBox)
        songBox.addEventListener("click",() =>
            musicPlayer.src = result.previewUrl,
            musicPlayer.controls = true,
            musicPlayer.preload = "auto")
    
    }
    }
})
.catch(error => {
    console.error('Fetch error', error)
    let errorMessage = document.createElement('div')
    errorMessage.innerText = "Epic Fail"
    searchResults.appendChild(errorMessage)
})
})