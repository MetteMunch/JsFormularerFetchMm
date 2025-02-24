console.log("Jeg er i formregion")

//Her vil jeg gemme en region oprettet via formularen fra html


document.addEventListener('DOMContentLoaded', createFormEventListener);
//Denne eventlistener venter på at DOM er færdigindlæst, hvorefter den angivne metode kaldes

let formRegion;
let url;


function createFormEventListener() {
    //Denne metode findet HTML-elementet (formularen) med korrekt id, og til dette element knyttes en
    //eventlistener, så den angivne metode kaldes, når der trykkes på submit
    formRegion = document.getElementById("formRegion");
    formRegion.addEventListener("submit", handleFormSubmit); //Når der trykkes på submit knappen,
    //så bliver funtionen handleFormSubmit kaldt
}


async function handleFormSubmit(event) {
    event.preventDefault(); //Vi handler submitten her i JS stedet for default html behaviour
    const form = event.currentTarget; //Her gemmes hele formularen
    url = form.action; //Her gemmes url for POST endpoint

    try {
        const formData = new FormData(form); //FormData interface giver mulighed for at gemme
        // key/value pairs. Dvs. denne FormData-instans samler alle formularfelter og deres værdier.
        console.log("Her vises formData ", formData);
        const responseData = await postFormDataAsJson(url, formData); //Kalder postFormDataAsJson()
        //for at sende dataene som JSON.
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries()) //Konverterer FormData objektet til
    //et almindeligt JavaScript objekt
    console.log("Her er variablen plainFormData: ", plainFormData)
    const response = await postObjectAsJson(url, plainFormData, "POST") //Sender JavaScript objektet
    //til funktionen postObjectAsJson for at sende det som Json
    if (!response.ok) {
        const errorMessage = response.statusText;
        console.error("Dette er fejl i postFormDataAsJson", errorMessage); //Hvis serveren returnerer med en fejl, henter vi denne fejlbesked og udskriver den i konsollen
        console.log("Dette er fejlbeskeden i postFormDataAsJson", errorMessage); //Hvis serveren returnerer med en fejl, henter vi denne fejlbesked og udskriver den i konsollen
    } else {
        alert("region gemt")
    }

}

async function postObjectAsJson(url, object, httpVerbum) {

    const objectAsJsonString = JSON.stringify(object); //stringify konverterer vores objekt til en JSON-streng
    console.log("omdanner object til JSON streng", objectAsJsonString);
    const fetchOptions = { //Her definerer vi et objekt "fetchOptions" som beskriver hvordan vi vil sende data
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json", //Vi fortæller serveren, at vi sender JSON
        },
        body: objectAsJsonString, //Det er vores objekt konverteret til en JSON-streng som vi sender som data (i body)
    };

    const response = await fetch(url, fetchOptions); //HTTP-request sendes med fetch til den angivne url.
    //fetch returnerer et promise til et starte med, men await gør at vi venter på korrekt svar (response)

    if (!response.ok) {
        const errorMessage = response.statusText;
        console.error("Dette er fejl i postObjectAsData", errorMessage); //Hvis serveren returnerer med en fejl, henter vi denne fejlbesked og udskriver den i konsollen
        console.log("Dette er fejl i postObjectAsData", errorMessage); //Hvis serveren returnerer med en fejl, henter vi denne fejlbesked og udskriver den i konsollen
    }
    return response;


}

