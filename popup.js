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
        twelvePtSpan(`["]${underlinedSpan(text)}["]`)
    }</span>`
}

function credentialSpan(text) {
    return `<span>${
        nonImportantSpan(`(${text})`)
    }</span>`
}

function articleSpan(text) {
    return `<span>${
        nonImportantSpan(`("${text}")`)
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
    formattedTextDiv.innerHTML = `${citing}\n${evd}`
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
    document.getElementById('copyButton').addEventListener('click', function () {
            let str = document.getElementById("formattedEvidence").innerHTML.trim()
            function listener(e) {
                e.clipboardData.setData("text/html", str);
                e.clipboardData.setData("text/plain", str);
                e.preventDefault();
            }
            document.addEventListener("copy", listener);
            document.execCommand("copy");
            document.removeEventListener("copy", listener);
        }
    )
}

function onLoad() {
    addListeners()
    updateFormattedText()
}

window.onload = onLoad
