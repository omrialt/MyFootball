`use strict`
let divHtml = document.querySelector(".row")
let searchBar = document.querySelector("#search-bar")
let sortLeagues = document.querySelector("#leagues")
let showMoreBtn = document.querySelector("#show-more")
let videoArray = [];

const highlights = async function () {
    try {
        const getFetch = await fetch("https://www.scorebat.com/video-api/v3/feed/?token=MTY5MDFfMTY0OTU3MTM1Ml8xZTM5YTJlNzA2ZWMwMmUzZmYyMzc4MTI0MjE4MTYwNDRiODYwNzNj")
        if (!getFetch.ok) throw new Error("something dont work,try again please")
        const respone = await getFetch.json()
        videoArray = respone.response
        championsLeague()
        renderHighlights(videoArray)
    } catch (err) {
        console.error(err)
    }
}
highlights()

//helper function to sort for only euro champions league
const championsLeague = function () {
    for (let i = 0; i < videoArray.length; i++) {
        if (videoArray[i].competition.lastIndexOf("CHAMPIONS LEAGUE") === 0) {
            videoArray[i].competition_2 = "E_CHAMPIONS LEAGUE"
        }
    }
}
//get only 30 highlights, more will loaded with showMoreBtn
function renderHighlights(array) {
    divHtml.innerHTML = ""
    for (let i = 0; i < 30; i++) {
        divHtml.innerHTML += `<div class="card">
       <div class="card-body">
           <h5 class="card-title">${array[i].title}</h5>
           <p class="card-text">${array[i].competition}</p>
           <p class="card-text">${array[i].date.slice(0,10)}</p>
           ${array[i].videos[0].embed}
       </div>`
    }


}

function loadAllHighlights() {
    for (let i = 30; i < videoArray.length; i++) {
        divHtml.innerHTML += `<div class="card">
    <div class="card-body">
        <h5 class="card-title">${videoArray[i].title}</h5>
        <p class="card-text">${videoArray[i].competition}</p>
        <p class="card-text">${videoArray[i].date.slice(0,10)}</p>
        ${videoArray[i].videos[0].embed}
    </div>`

    }
    showMoreBtn.style.display = "none"
}

function searching(inp) {
    showMoreBtn.style.display = "none"
    const filterdArr = videoArray.filter(video =>
        video.title.toLowerCase().includes(inp.toLowerCase()) || video.competition.toLowerCase().includes(inp.toLowerCase())
    )
    renderHighlights(filterdArr)

}

function sortByLeague(value) {
    showMoreBtn.style.display = "none"
    if (+value === 1) {
        let filterd = videoArray.filter(video =>
            video.competition === 'SPAIN: La Liga'
        )
        renderHighlights(filterd)
    }
    if (+value === 2) {
        let filterd = videoArray.filter(video =>
            video.competition === 'ENGLAND: Premier League'
        )
        renderHighlights(filterd)
    }
    if (+value === 3) {
        let filterd = videoArray.filter(video =>
            video.competition === 'ITALY: Serie A'
        )
        renderHighlights(filterd)
    }
    if (+value === 4) {
        let filterd = videoArray.filter(video =>
            video.competition === 'FRANCE: Ligue 1'
        )
        renderHighlights(filterd)
    }
    if (+value === 5) {
        let filterd = videoArray.filter(video =>
            video.competition === 'GERMANY: Bundesliga'
        )
        renderHighlights(filterd)
    }
    if (+value === 6) {
        let filterd = videoArray.filter(video =>
            video.competition_2 === "E_CHAMPIONS LEAGUE"
        )
        renderHighlights(filterd)
    }
    if (+value === 0) {
        renderHighlights(videoArray)
    }
}

searchBar.addEventListener(`input`, () => {
    const input = searchBar.value
    searching(input)
})
sortLeagues.addEventListener(`change`, () => {
    sortByLeague(sortLeagues.value)

})
showMoreBtn.addEventListener(`click`, loadAllHighlights)