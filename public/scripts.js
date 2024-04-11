window.onload = onDocumentLoad;

function onDocumentLoad() {
    fetch("/.netlify/functions/getApiKey")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
}
