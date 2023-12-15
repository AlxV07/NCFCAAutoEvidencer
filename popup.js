
    function importantSpan(text) {
    return `<span style="font-size: 12pt; font-style: italic; text-decoration: underline">${text}</span>`
}

    function nonImportantSpan(text) {
    return `<span style="font-size: 10pt; font-style: italic;">${text}</span>`
}

    function linkSpan(text) {
    return `<span style="font-size: 10pt; font-style: italic; color: cornflowerblue">${text}</span>`
}

    function updateFormattedText() {
    const formattedTextDiv = document.getElementById('formattedEvidence');

    const author = importantSpan(document.getElementById('authorInput').textContent)
    const credentials = nonImportantSpan(document.getElementById('authorCredentialsInput').textContent)
    const accessed = importantSpan(document.getElementById("accessedDate").textContent)
    const published = importantSpan(document.getElementById('publishedDate').textContent)
    const publisher = importantSpan(document.getElementById('publisherInput').textContent)
    const article = nonImportantSpan(document.getElementById('articleInput').textContent)
    const link = linkSpan(document.getElementById('linkInput').textContent)
    const evd = importantSpan(document.getElementById('evidenceInput').textContent)

    const citing = `According to ${author} (${credentials}), Accessed ${accessed}, Published on ${published} by ${publisher}, ("${article}") ${link}`

    formattedTextDiv.innerHTML = citing + evd
}

    window.onload = updateFormattedText
