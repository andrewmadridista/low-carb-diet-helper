window.onload = onDocumentLoad;

function onDocumentLoad() {
    fetch("/.netlify/functions/getApiKey")
        .then((res) => res.json())
        .then(response => console.log(response))
        .catch((err) => console.log(err));
}
