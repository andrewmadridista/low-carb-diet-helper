import { GoogleGenerativeAI } from "@google/generative-ai";
window.onload = onDocumentLoad;

let getAI;
let resultElement;

async function getApiKey() {
    try {
        const response = await fetch("/.netlify/functions/getApiKey");
        const data = await response.json();
        return data.key;
    } catch (error) {
        console.error(error);
        return nulls;
    }
}

function renderResponseText(text) {
    const previousContent = document.getElementById("result-content");
    previousContent.remove();

    const normalizedText = text.replace("**", "");
    const textChunks = normalizedText.split("*");

    const newContent = document.createElement("div");
    newContent.id = "result-content";

    textChunks.forEach(part => {
        newContent.appendChild(document.createTextNode(part));
        newContent.appendChild(document.createElement("br"));
    })
   
    resultElement.appendChild(newContent)
}

function renderLoader() {
    const loaderElement = document.getElementById("loader");
    loaderElement.style.display = "block";
}

function removeLoader() {
    const loaderElement = document.getElementById("loader");
    loaderElement.style.display = "none";
}

async function onStartGeneration(event) {
    event.preventDefault();

    if(!getAI) {
        console.error("The gen ai is not set up yet");
    }

    renderLoader()

    const inputValue = event.target.productName.value;

    const model = getAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Is ${inputValue} suitable for the low carb diet product?
     What's a carb content of a typical portion? Please keep your output breef - up to 100 words.
      Do a short explanation in which case the ${inputValue} is suitable. Reply in the conversational manner.`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    removeLoader();
    renderResponseText(text);
}

async function onDocumentLoad() {
    const apiKey = await getApiKey()
    getAI = new GoogleGenerativeAI(apiKey);

    const formElement = document.getElementById("low-carb-test-form");
    resultElement = document.getElementById("result");

    formElement.addEventListener("submit", onStartGeneration);

}
