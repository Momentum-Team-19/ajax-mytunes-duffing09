const searchResults = document.querySelector('#searchResults')
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
        let picDiv = document.createElement('img')
        picDiv.src = result.artworkUrl60
        searchResults.appendChild(picDiv)

        let titleDiv = document.createElement('p')
        titleDiv.innerText = result.trackName
        searchResults.appendChild(titleDiv)

        let bandDiv = document.createElement('h4')
        bandDiv.innerText = result.artistName
        searchResults.appendChild(bandDiv)

    }

})
})