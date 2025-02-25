


function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json()).catch(error =>
    console.error("Handled error: ", error))
    //fetch (og response) returnerer et promise, så denne metode skal kaldes i en async
    //metode med await
    //Hele HTTP-response (response) objektet bliver konverteret til JSON-format
    //(Streng / tekstformat som anvendes til at sende over netværk)
}






export {fetchAnyUrl}