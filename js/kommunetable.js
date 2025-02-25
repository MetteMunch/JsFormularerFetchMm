import{fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i kommunetable js)")

const urlKommuner = "http://localhost:8080/kommuner"
const pbHentKommuner = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")
let kommuner = []

//Listeners
pbHentKommuner.addEventListener("click",actionGetKommuner)


//Functions

function actionGetKommuner() {
    fetchKommuner()
}

async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommuner)
    if(kommuner) {
        kommuner.forEach(createTable)
    } else {
        alert("Fejl ved kald til backend url: "+ urlKommuner +"\n"+
            "Vil du vide mere, så kig i consollen")
    }
}

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    console.log("rowCount", rowCount)
    let row = tblKommuner.insertRow(rowCount)
    console.log("Kommune", kommune)
}
