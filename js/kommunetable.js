import {fetchAnyUrl, sendJsonRequest} from "./modulejson.js";

console.log("Jeg er i kommunetable js")

const urlKommuner = "http://localhost:8080/kommuner"
const urlRegioner = "http://localhost:8080/regioner"
const pbHentKommuner = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")
let kommuner = []
let regioner = []
let regMap = new Map()

//Listeners
pbHentKommuner.addEventListener("click",actionGetKommuner)


//Functions

function actionGetKommuner() {
    fetchKommuner()
    fetchRegioner()
}

async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommuner)
    if(kommuner) {
        kommuner.forEach(createTableRow)
    } else {
        alert("Fejl ved kald til backend url: "+ urlKommuner +"\n"+
            "Vil du vide mere, så kig i consollen")
    }
}

async function fetchRegioner() {
    console.log("er jeg kommet ind i fetchRegioner?")
    regioner = await fetchAnyUrl(urlRegioner)
    if(regioner) {
        regioner.forEach(region => regMap.set(region.navn, region))
    } else {
        alert("fejl ved kald til backend url: " +urlRegioner+"\n"+
            "Vil du vide mere, så kig i consollen")
    }
}

function createTableRow(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length //tblKommuner er HTML-tabellen
    console.log("rowCount", rowCount)
    let row = tblKommuner.insertRow(rowCount) //Her indsættes
    //en ny række i tabellen på den næste ledige plads (efter indeks startende med 0)
    console.log("Kommune", kommune)

    let cell = row.insertCell(cellCount++)//Her oprettes første
    //celle i rækken
    console.log("Hvilket nummer har første celle til input?", cellCount)
    cell.innerHTML = kommune.kode //Her tildeles cellen en værdi

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href

    //Add dropdown regioner
    cell = row.insertCell(cellCount++)
    const dropDown = document.createElement('select')//Her laver vi html elementet select, som
    //er en drop down
    regMap.forEach(reg => { //For hver region i vores Map...
        const element = document.createElement('option') //opretter vi en valgmulighed i dd
        element.textContent = reg.navn //teksten der skal vises er navn
        element.value = reg.kode

        if(reg.kode === kommune.region.kode) { //her får vi den til at starte visning
            //med regionen som den er tilknyttet med oprindeligt
            element.selected = true
        }
        dropDown.append(element)
    })
    cell.appendChild(dropDown)

    row.Id = kommune.kode
    console.log("row id ",row.Id)

    cell = row.insertCell(cellCount++) //Her indsætter vi en deleteknap direkte i js
    const pbDelete = document.createElement("input")
    pbDelete.type = "button"
    pbDelete.setAttribute("value","Slet kommune")
    cell.appendChild(pbDelete) //Her knyttes knappen til cellen

    pbDelete.onclick = async function() {
        if(confirm("Er du sikker på, at du vil slette: "+kommune.navn +"?")) {
           const success = await deleteKommune(kommune)
            //Vi sletter først fra backEnd inden sletning fra tabellen
            if(success) {
                row.remove() //Fjerner fra UI hvis sletning i DB lykkes
            }
        }

    }
    console.log("row", row)
}

async function deleteKommune(kommune) {
    const deleteUrl = "http://localhost:8080/kommuner/" +kommune.kode
    const response = await sendJsonRequest(deleteUrl,{},"DELETE")
    if(response.ok) {
        console.log("Kommune slettet: ",kommune.navn)
        return true
    } else {
        alert("Fejl ved sletning af kommunen.");
        return false;
    }

}

