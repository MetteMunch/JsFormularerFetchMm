console.log("jeg er i formregionjson")
//I denne JS gemmer jeg en hardkoded region.
//Denne kode opretter et JavaScript objekt (region), sender det som JSON-data til en server ved hjælp
// af fetch API, og håndterer svaret. Koden bruger async/await, som er en moderne måde at håndtere asynkrone
// operationer som API-kald.


const urlPostRegion = "http://localhost:8080/region" //Dette er url, som vi vil sende data til (REST API, POST endpoint)


function createRegion() {
    const region = {} //Her laver vi et tomt objekt
    region.kode = "5678" //Her giver vi objektet (regionen) nogle properties
    region.navn = "RegNy"
    region.href = "http.kea"
    return region
}

async function postDataAsJson(url, obj) { //async funktion returnerer et promise, dvs. vi kan bruge await inde i funktionen
    //denne funktion har kun ét job, nemlig at sende POST request og returnere responsen
    //denne funktion kan genbruges til forskellige API endpoints

    try {
        const objectAsJsonString = JSON.stringify(obj); //stringify konverterer vores objekt til en JSON-streng
        console.log("sender JSON som streng", objectAsJsonString);
        const fetchOptions = { //Her definerer vi et objekt "fetchOptions" som beskriver hvordan vi vil sende data
            method: "POST",
            headers: {
                "Content-Type": "application/json", //Vi fortæller serveren, at vi sender JSON
            },
            body: objectAsJsonString, //Det er vores objekt konverteret til en JSON-streng som vi sender som data (i body)
        };

        const response = await fetch(url, fetchOptions); //fetch sender vores fetchOptions (datapakke) til den angivne url.
        //fetch returnerer et promise til et starte med, men await gør at vi venter på korrekt svar (response)

        if (!response.ok) {
            const errorMessage = response.statusText;
            console.error("Dette er fejlbeskeden", errorMessage); //Hvis serveren returnerer med en fejl, henter vi denne fejlbesked og udskriver den i konsollen
            console.log("Dette er fejlbeskeden", errorMessage); //Hvis serveren returnerer med en fejl, henter vi denne fejlbesked og udskriver den i konsollen
        }
        return await response.json();

    } catch (error) {
        console.error("Fejl ved postDataAsJson", error)
        return null
    }
}

async function postRegion(region) {
    //Denne funktion håndterer flow
    const responseJson = await postDataAsJson(urlPostRegion, region);

    if(responseJson) {
        console.log("Modtaget JSON svar: ",responseJson)
    } else {
        console.log("Ingen data modtaget, der skete en fejl")
    }
}


let reg1 = createRegion()
postRegion(reg1)

console.log("Får jeg kaldt url", urlPostRegion)
console.log("Gemmes denne region", reg1)


