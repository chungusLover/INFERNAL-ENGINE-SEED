
//FRESH GAME DATA
var freshData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    clock: 0
}

//GAME DATA(PROFILE)
var gameData = freshData

//INCREASE GOLD
function mineGold() {
    gameData.gold += gameData.goldPerClick
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
}

//COUNT TIME
function tickClock() {
    gameData.clock += 1
    document.getElementById("clock").innerHTML = gameData.clock + " ticks"
}

//INCREASE GOLD PER CLICK
function buyGoldPerClick() {
    if (gameData.gold >= gameData.goldPerClickCost) {
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        gameData.goldPerClickCost *= 2
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"
    }
}

//DELETE CONF
function confirmDelete(){
    document.getElementById("deleteButton1").style.display = "none"
    document.getElementById("deleteButton2").style.display = "inline-block"
}

//DELETE PROFILE
function deleteSave(){
    localStorage.removeItem("goldMinerSave")
    location.reload()

}
//SAVE PROFILE
function forceSave(){
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}

//STARTUP

//HIDE DELETE CONFIRMATION
document.getElementById("deleteButton2").style.display = "none"

//LOAD EXISTING PROFILE GAME
var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
if (savegame !== null) {
    gameData = savegame
}
//DISPLAY CORRECT PRICES
document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"

//GAME LOOP (1 SECOND INTERVAL)
var mainGameLoop = window.setInterval(function(){
    tickClock()
    mineGold()

}, 1000)

//AUTOSAVE
var saveGameLoop = window.setInterval(function() {
    forceSave()
}, 10000)


