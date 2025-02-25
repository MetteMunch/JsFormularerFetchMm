import{fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i kommunetable js")

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
    let rowCount = tblKommuner.rows.length //tblKommuner er HTML-tabellen
    console.log("rowCount", rowCount)
    let row = tblKommuner.insertRow(rowCount) //Her indsættes
    //en ny række i tabellen på den næste ledige plads
    console.log("Kommune", kommune)

    let cell = row.insertCell(cellCount++)//Her oprettes første
    //celle i rækken
    cell.innerHTML = kommune.kode //Her tildeles cellen en værdi

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.kode

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.region.navn

    cell = row.insertCell(cellCount++) //Her indsætter vi en deleteknap direkte
    //i js
    const pbDelete = document.createElement("input")
    pbDelete.type = "button"
    pbDelete.setAttribute("value","Slet kommune")
    cell.appendChild(pbDelete) //Her knyttes knappen til cellen


    console.log("row", row)

}
