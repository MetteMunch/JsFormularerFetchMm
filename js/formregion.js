console.log("Jeg er i formregion")

//Her vil jeg gemme en region oprettet via formularen fra html


document.addEventListener('DOMContentLoaded', createFormEventListener);
let formRegion;

function createFormEventListener() {
    formRegion = document.getElementById("formRegion");
    formRegion.addEventListener("submit", handleFormSubmit);
}

