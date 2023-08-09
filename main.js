const searchResults = document.querySelector('#searchResults')
const musicPlayer = document.getElementById("musicPlayer")
const form = document.getElementById("searchZone")
const searchTerm = document.getElementById("searchTerm")
const modeSwitch = document.getElementById("modeSwitch");
const figCaption = document.getElementById("figCaption")


document.addEventListener("DOMContentLoaded", () => {
    const darkModePreference = localStorage.getItem("darkModePreference");
    console.log(darkModePreference)
    if (darkModePreference !== null) {
        // declaring isDarkMode as the result of darkModePreferene being true or false.
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

//taking parent element as argument and remove all of child nodes in loop clearing the searchResults container before displaying new searches
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}
//adds event listener to the form. when form is submitted, preventDefault prevents default form submission behavior. thenn logs value of searchTerm input and calls 'removeAllChildNodes' to clear existing results
form.addEventListener("submit",(event) => {
    event.preventDefault();
    console.log(searchTerm.value)
    removeAllChildNodes(searchResults)
    
    // fetching for the API to make a GET request.
    fetch('https://proxy-itunes-api.glitch.me/search?term=' + searchTerm.value, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    })
    // code checks if response contains results
    .then((response) => {
        return response.json()
    })
    
    .then((data) => {
        
        if (data.results.length === 0) {
            console.log("no results")
            let messageDiv = document.createElement('div')
            // this block of code is saying if the search doesn't show any results, give the message 'invalid search term'
            messageDiv.innerText = "Invalid search term"
            searchResults.appendChild(messageDiv)
        }
        else {
            
            // going through 'data.results' array and creating html elements to display each results information.
            console.log(data.results)
            for(let result of data.results) {
                let songBox = document.createElement('div')
                songBox.classList.add("songBox")
                let imageBox = document.createElement('div')
                imageBox.classList.add("imageBox")
                let picDiv = document.createElement('img')
                picDiv.src = result.artworkUrl100
                imageBox.appendChild(picDiv)
                songBox.appendChild(imageBox)
                
                
                let titleDiv = document.createElement('p')
                titleDiv.classList.add('titleDiv')
                titleDiv.innerText = result.trackName
                songBox.appendChild(titleDiv)
                
                let bandDiv = document.createElement('h4')
                bandDiv.classList.add("bandDiv")
                bandDiv.innerText = result.artistName
                songBox.appendChild(bandDiv)
                searchResults.appendChild(songBox)
                // adding click listener to each result (songbox) to play preview of song
                songBox.addEventListener("click",() =>
                musicPlayer.src = result.previewUrl,
                musicPlayer.controls = true,
                musicPlayer.preload = "auto")
                figCaption.innerText = `Now playing: ${result.artistName} - ${result.trackName}`
                
            }
        }
    })
    // if error occurs during the fetch or response, 'catch()' block is triggered and it says "Epic Fail"
    .catch(error => {
        console.error('Fetch error', error)
        let errorMessage = document.createElement('div')
        errorMessage.innerText = "Epic Fail"
        searchResults.appendChild(errorMessage)
    })
})