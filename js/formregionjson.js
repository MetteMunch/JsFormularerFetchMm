console.log("jeg er i formregionjson")
//Her gemmer jeg en hardkoded region


const urlPostRegion = "http://localhost:8080/region"


function createRegion() {
    const region = {}
    region.kode = "9999"
    region.navn = "KEAxx"
    region.href = "http.kea"
    return region
}

async function postDataAsJson(url, obj) {
    const objectAsJsonString = JSON.stringify(obj);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString,
    };

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error(errorMessage);
    } else {
        //vi har fået response fra backend. Vi skal tænke os godt om hvor vi henter json ud
        //const js1 = response.json() //.json() returnerer igen et promise,
        console.log("ok")
        console.log(response.statusText)
    }
    return response;
}

async function postRegion(region) {
    const nogetjson = await postDataAsJson(urlPostRegion, region);
    console.log(nogetjson);
    console.log("noget json")
    //console.log(nogetjson.json()); //vi får fejl hvis vi har kaldt .json() før
    const js1 = await nogetjson.json();
    console.log(js1);
}


let reg1 = createRegion()
postRegion(reg1)

console.log("Får jeg kaldt url", urlPostRegion)
console.log("Gemmes denne region", reg1)


