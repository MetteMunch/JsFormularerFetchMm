import {sendJsonRequest} from "./modulejson.js";

console.log("jeg er i formkommune")

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formKommune;

function createFormEventListener() {
    formKommune = document.getElementById("formKommune");
    formKommune.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault(); //forhindrer submit form i at blive udført direkte i backend
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);
    try {
        const formData = new FormData(form); //formData indeholder alle indtastede data
        console.log("Data fra formData ",formData);
        const responseData = await postFormDataAsJson(url, formData);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

async function postFormDataAsJson(url, formData) {
    console.log("vi er i postformdata")
    console.log("url ",url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.region = {}
    plainFormData.region.kode = plainFormData.regionKode;
    const resp = await sendJsonRequest(url, plainFormData, "POST")
    return resp
}