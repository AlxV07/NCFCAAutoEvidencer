function timesNewRomanSpan(text) {
    return `<span style="font-family: 'Times New Roman', Times, serif">${text}</span>`
}

function italicizedSpan(text) {
    return `<span style="font-style: italic">${text}</span>`
}

function underlinedSpan(text) {
    return `<span style="text-decoration: underline">${text}</span>`
}

function twelvePtSpan(text) {
    return `<span style="font-size: 12pt">${text}</span>`
}

function tenPtSpan(text) {
    return `<span style="font-size: 10pt;">${text}</span>`
}

function linkSpan(text) {
    return `<span style="color: cornflowerblue" >${
        italicizedSpan(underlinedSpan(tenPtSpan(text)))
    }</span>`
}

function evidenceSpan(text) {
    return `<span>${
        twelvePtSpan(`[“]${underlinedSpan(text)}[”]`)
    }</span>`
}

function credentialSpan(text) {
    return `<span>${
        nonImportantSpan(`(${text})`)
    }</span>`
}

function articleSpan(text) {
    return `<span>${
        nonImportantSpan(`(“${text}”)`)
    }</span>`
}

function nonImportantSpan(text) {
    return `<span>${
        italicizedSpan(tenPtSpan(text))
    }</span>`
}

function importantSpan(text) {
    return `<span>${
        underlinedSpan(italicizedSpan(twelvePtSpan(text)))
    }</span>`
}

function updateFormattedText() {
    document.getElementById('copyButton').textContent = 'Copy'
    const inputData = {
        author: document.getElementById('authorInput').textContent,
        credentials: document.getElementById('authorCredentialsInput').textContent,
        accessed: document.getElementById("accessedDate").textContent,
        published: document.getElementById('publishedDate').textContent,
        publisher: document.getElementById('publisherInput').textContent,
        article: document.getElementById('articleInput').textContent,
        link: document.getElementById('linkInput').textContent,
        evd: document.getElementById('evidenceInput').textContent
    };
    chrome.storage.local.set({ 'savedData': inputData });
    const formattedTextDiv = document.getElementById('formattedEvidence');
    const author = importantSpan(document.getElementById('authorInput').textContent)
    const credentials = credentialSpan(document.getElementById('authorCredentialsInput').textContent)
    const accessed = importantSpan(document.getElementById("accessedDate").textContent)
    const published = importantSpan(document.getElementById('publishedDate').textContent)
    const publisher = importantSpan(document.getElementById('publisherInput').textContent)
    const article = articleSpan(document.getElementById('articleInput').textContent)
    const link = linkSpan(document.getElementById('linkInput').textContent)
    const evd = evidenceSpan(document.getElementById('evidenceInput').textContent)
    const citing = nonImportantSpan(`
        According to ${author} ${credentials}, Accessed on ${accessed}, Published on ${published} by ${publisher}, ${article} ${link}   
    `)
    formattedTextDiv.innerHTML = timesNewRomanSpan(`${citing}\n${evd}`)
}

function setDate(component) {
    let splitDate = Date().split(" ")
    component.textContent = `${splitDate[1]}. ${splitDate[2]}, ${splitDate[3]}`
    updateFormattedText()
}

function copyEvd() {
    let str = document.getElementById("formattedEvidence").innerHTML.trim()
    function listener(e) {
        e.clipboardData.setData("text/html", str);
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    document.getElementById('copyButton').textContent = 'Copied ✓'
}

function clearForm() {
    document.getElementById('authorInput').textContent = ''
    document.getElementById('authorCredentialsInput').textContent = ''
    document.getElementById("accessedDate").textContent = ''
    document.getElementById('publishedDate').textContent = ''
    document.getElementById('publisherInput').textContent = ''
    document.getElementById('articleInput').textContent = ''
    document.getElementById('linkInput').textContent = ''
    document.getElementById('evidenceInput').textContent = ''
    updateFormattedText()
}

function addListeners() {
    document.getElementById("authorInput").addEventListener('input', updateFormattedText)
    document.getElementById('authorCredentialsInput').addEventListener('input', updateFormattedText)
    document.getElementById("accessedDate").addEventListener('input', updateFormattedText)
    document.getElementById('publishedDate').addEventListener('input', updateFormattedText)
    document.getElementById('publisherInput').addEventListener('input', updateFormattedText)
    document.getElementById('articleInput').addEventListener('input', updateFormattedText)
    document.getElementById('linkInput').addEventListener('input', updateFormattedText)
    document.getElementById('evidenceInput').addEventListener('input', updateFormattedText)
    document.getElementById('copyButton').addEventListener('click', copyEvd)
    document.getElementById('accessedDateButton').addEventListener('click', () => setDate(document.getElementById('accessedDate')))
    document.getElementById('clearButton').addEventListener('click', clearForm)
}

function onLoad() {
    addListeners()
    updateFormattedText()
}


window.onload = onLoad
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('savedData', function(result) {
        const savedData = result.savedData;
        if (savedData) {
            if (savedData.author) {document.getElementById('authorInput').textContent = savedData.author}
            if (savedData.credentials) {document.getElementById('authorCredentialsInput').textContent = savedData.credentials}
            if (savedData.accessed) {document.getElementById("accessedDate").textContent = savedData.accessed}
            if (savedData.published) {document.getElementById('publishedDate').textContent = savedData.published}
            if (savedData.publisher) {document.getElementById('publisherInput').textContent = savedData.publisher}
            if (savedData.article) {document.getElementById('articleInput').textContent = savedData.article}
            if (savedData.link) {document.getElementById('linkInput').textContent = savedData.link}
            if (savedData.evd) {document.getElementById('evidenceInput').textContent = savedData.evd}
        }
        updateFormattedText()
    });
})
