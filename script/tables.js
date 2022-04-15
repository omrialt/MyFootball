`use strict`
let leagueSelector = document.querySelector("#leagues")
let tableBody = document.querySelector("#rows")
let tableBodyStats = document.querySelector("#rows-stats")
let theadToHide = document.querySelector(".hidden")
let sortWins = document.querySelector("#wins")
let sortDraw = document.querySelector("#draws")
let sortLose = document.querySelector("#lose")
let sortGoals = document.querySelector("#goals")
let sortPts = document.querySelector("#pt")
let leagueName = document.querySelector("h4")
let leagueStats = document.querySelector("#details")
let standingsArr = []
let statsArr = []
let tableString = ` <tr id="name_l">
<th scope="col">#</th>
<th scope="col">Team</th>
<th scope="col">Games</th>
<th scope="col" id="wins">Wins</th>
<th scope="col" id="draws">Draws</th>
<th scope="col" id="lose">Loses</th>
<th scope="col">Goals</th>
<th scope="col" id="goals">GD</th>
<th scope="col" id="pt">Points</th>
</tr>`



const getTables = async function (leagueId) {
    try {
        const getFetch = await fetch(`https://apiv3.apifootball.com/?action=get_standings&league_id=${leagueId}&APIkey=e4da6a6d76abb9735a4c9f5a8baf83b22243acac295bb6a4f1ff3c815f6a933c`)
        const getScorers = await fetch(`https://apiv3.apifootball.com/?action=get_topscorers&league_id=${leagueId}&APIkey=e4da6a6d76abb9735a4c9f5a8baf83b22243acac295bb6a4f1ff3c815f6a933c`)
        if (!getFetch.ok || !getScorers.ok) throw new Error("something dont work,try again please")
        const response = await getFetch.json()
        const responseStats = await getScorers.json()
        standingsArr = response
        statsArr = responseStats
        addKeysToArr()
        renderTopScorers()
        if (standingsArr.length > 26) {
            renderGroupStage()
        } else {
            renderTable()
        }

    } catch (err) {
        alert(err)
        location.reload()
    }

}
//helper function that add some keys that used in css and sort function
function addKeysToArr() {
    for (let i = 0; i < standingsArr.length; i++) {
        standingsArr[i].goal_dif = standingsArr[i].overall_league_GF - standingsArr[i].overall_league_GA

        standingsArr[i].promotion_id = standingsArr[i].overall_promotion.slice(12, 24).toLowerCase().replace(" ", "-")

        standingsArr[i].relegation = standingsArr[i].overall_promotion.slice(0, 10).toLowerCase().replace(" ", "-")
    }
    standingsArr[0].champ = "champ"
}


getTables(302)

//function to render any table expect leagues with group stage(like international tournaments)
const renderTable = function () {
    leagueStats.style.display = ""
    leagueName.innerHTML = standingsArr[0].league_name
    tableBody.innerHTML = ""
    for (let i = 0; i < standingsArr.length; i++) {
        tableBody.innerHTML += `
        <tr id="${standingsArr[i].promotion_id}" class="${standingsArr[i].champ==="champ"?"champ":`${standingsArr[i].relegation}`}">
      <th scope="row">${i+1}</th>
      <td><img class="img-table" src="${standingsArr[i].team_badge}" alt="${standingsArr[i].team_name}"> ${standingsArr[i].team_name} </td>
      <td>${standingsArr[i].overall_league_payed}</td>
      <td>${standingsArr[i].overall_league_W}</td>
      <td>${standingsArr[i].overall_league_D}</td>
      <td>${standingsArr[i].overall_league_L}</td>
      <td>${standingsArr[i].overall_league_GF}:${standingsArr[i].overall_league_GA}</td>
      <td>${standingsArr[i].goal_dif}</td>
      <td>${standingsArr[i].overall_league_PTS}</td>
      
    </tr>
        `
    }
}



const htmlToGroup = function (index) {
    leagueName.innerHTML = `${standingsArr[index].league_name}`
    leagueStats.style.display = "none"
    tableBody.innerHTML += `<tr><td colspan="9"><h4 style="text-align: center;" >${standingsArr[index].league_round}</h4></td></tr>
   ${tableString}
    `
    for (let i = index; i <= index + 3; i++) {
        tableBody.innerHTML += `
         <tr id="">
        <th scope="row">${standingsArr[i].overall_league_position}</th>
        <td><img class="img-table" src="${standingsArr[i].team_badge}" alt="${standingsArr[i].team_name}"> ${standingsArr[i].team_name} </td>
        <td>${standingsArr[i].overall_league_payed}</td>
        <td>${standingsArr[i].overall_league_W}</td>
        <td>${standingsArr[i].overall_league_D}</td>
        <td>${standingsArr[i].overall_league_L}</td>
        <td>${standingsArr[i].overall_league_GF}:${standingsArr[i].overall_league_GA}</td>
        <td>${standingsArr[i].goal_dif}</td>
        <td>${standingsArr[i].overall_league_PTS}</td>
        </tr>
      `
    }
}

//im most cases each group includes 8 groups which includes 4 teams,so this function run the function above 8 times(1 per group)

const renderGroupStage = function () {
    tableBody.innerHTML = ""
    htmlToGroup(0)
    htmlToGroup(4)
    htmlToGroup(8)
    htmlToGroup(12)
    htmlToGroup(16)
    htmlToGroup(20)
    htmlToGroup(24)
    htmlToGroup(28)

}

const renderTopScorers = function () {
    tableBodyStats.innerHTML = ""
    document.querySelector("h6").innerHTML = `${standingsArr[0].league_name} Top Scorers`
    for (let i = 0; i < 10; i++)
        tableBodyStats.innerHTML += `
    <tr>
<td>${i+1}</td>
<td>${statsArr[i].player_name}</td>
<td>${statsArr[i].team_name}</td>
<td>${statsArr[i].goals}(${statsArr[i].penalty_goals})</td>
    </tr>
    `
}



// helper function to get leagues id`s
/*
const getNation = async function (id) {
    const getNation = await fetch(`https://apiv3.apifootball.com/?action=get_leagues&country_id=${id}&APIkey=e4da6a6d76abb9735a4c9f5a8baf83b22243acac295bb6a4f1ff3c815f6a933c`)
    const respone = await getNation.json()

    respone.sort((a, b) => a.league_id - b.league_id)
    console.log(respone)
}
getNation(0)
*/

function sortByUser(td_id) {

    if (standingsArr.length > 26) return
    if (td_id === "goals") {
        standingsArr.sort((a, b) => b.goal_dif - a.goal_dif)
    }
    if (td_id === "draws") {
        standingsArr.sort((a, b) => b.overall_league_D - a.overall_league_D)
    }
    if (td_id === "wins") {
        standingsArr.sort((a, b) => b.overall_league_W - a.overall_league_W)
    }
    if (td_id === "lose") {
        standingsArr.sort((a, b) => a.overall_league_L - b.overall_league_L)
    }
    if (td_id === "pt") {
        standingsArr.sort((a, b) => b.overall_league_PTS - a.overall_league_PTS)
    }
    renderTable()
}

leagueSelector.addEventListener(`change`, () => {
    const id = leagueSelector.value
    getTables(id)
})
sortWins.addEventListener(`click`, () => {
    sortByUser("wins")
})
sortDraw.addEventListener(`click`, () => {
    sortByUser("draws")
})
sortLose.addEventListener(`click`, () => {
    sortByUser("lose")
})
sortPts.addEventListener(`click`, () => {
    sortByUser("pt")
})
sortGoals.addEventListener(`click`, () => {
    sortByUser("goals")
})