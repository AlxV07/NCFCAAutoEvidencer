function timesNewRomanSpan(text) {return `<span style="font-family: 'Times New Roman', Times, serif">${text}</span>`}
function italicizedSpan(text) {return `<span style="font-style: italic">${text}</span>`}
function boldSpan(text) {return `<span style="font-weight: bold">${text}</span>`}
function underlinedSpan(text) {return `<span style="text-decoration: underline">${text}</span>`}
function twelvePtSpan(text) {return `<span style="font-size: 12pt">${text}</span>`}
function tenPtSpan(text) {return `<span style="font-size: 10pt;">${text}</span>`}
function linkSpan(text) {return `<a href=${text}><span style="color: cornflowerblue" >${italicizedSpan(underlinedSpan(tenPtSpan(text)))}</span></a>`}
function evidenceSpan(text) {return `<span>${twelvePtSpan(`[“]${underlinedSpan(text)}[”]`)}</span>`}
function credentialSpan(text) {return `<span>${nonImportantSpan(`(${text})`)}</span>`}
function articleSpan(text) {return `<span>${nonImportantSpan(`(“${text}”)`)}</span>`}
function nonImportantSpan(text) {return `<span>${italicizedSpan(tenPtSpan(text))}</span>`}
function importantSpan(text) {return `<span>${underlinedSpan(italicizedSpan(twelvePtSpan(text)))}</span>`}
function impactSpan(text) {return `<span>${twelvePtSpan(boldSpan(`MPX: ${text}`))}</span>`}

function updateFormattedText() {
    document.getElementById('copyButton').textContent = 'Copy'
    const formattedTextDiv = document.getElementById('formattedEvidence');
    const author = importantSpan(document.getElementById('authorInput').textContent)
    const authorCredentials = credentialSpan(document.getElementById('authorCredentialsInput').textContent)
    const accessed = importantSpan(document.getElementById("accessedDate").textContent)
    const published = importantSpan(document.getElementById('publishedDate').textContent)
    const publisher = importantSpan(document.getElementById('publisherInput').textContent)
    const publisherCredentials = credentialSpan(document.getElementById('publisherCredentialsInput').textContent)
    const article = articleSpan(document.getElementById('articleInput').textContent)
    const link = linkSpan(document.getElementById('linkInput').textContent)
    const evd = evidenceSpan(document.getElementById('evidenceInput').textContent)
    const impact = impactSpan(document.getElementById('impactInput').textContent)

    const isDisabled = {}
    for (const inputField of inputFields) {
        const element = document.getElementById(inputField)
        isDisabled[inputField] = element.style.textDecoration === 'line-through'
    }
    let citationText = ''
    if (!isDisabled['authorInput']) {
        citationText += `According to ${author} `
    }
    if (!isDisabled['authorCredentialsInput']) {
        citationText += authorCredentials + ' '
    }
    if (!isDisabled['accessedDate']) {
        citationText += `Accessed on ${accessed} `
    }
    if (!isDisabled['publishedDate']) {
        citationText += `Published on ${published} `
    }
    if (!isDisabled['publisherInput']) {
        citationText += `Published by ${publisher} `
    }
    if (!isDisabled['publisherCredentialsInput']) {
        citationText += publisherCredentials + ' '
    }
    if (!isDisabled['articleInput']) {
        citationText += article + ' '
    }
    if (!isDisabled['linkInput']) {
        citationText += link + ' '
    }
    let citation = `${nonImportantSpan(citationText)}`
    if (!isDisabled['evidenceInput']) {
        citation += `<br>${evd}`
    }
    if (!isDisabled['impactInput']) {
        citation += `<br>${impact}`
    }
    formattedTextDiv.innerHTML = timesNewRomanSpan(`${citation}`)

    let everythingExcluded = true
    for (const disabledKey in isDisabled) {
        if (!isDisabled[disabledKey]) {
            everythingExcluded = false
            break
        }
    }
    if (everythingExcluded) {
        setTimeout(() => {
            alert('Knew somebody would do this ;D You silly little idiot <3')
        }, 250)  // Timeout to update color
    }
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
    document.getElementById('publisherCredentialsInput').textContent = ''
    document.getElementById('articleInput').textContent = ''
    document.getElementById('linkInput').textContent = ''
    document.getElementById('evidenceInput').textContent = ''
    document.getElementById('impactInput').textContent = ''

    for (const inputField of inputFields) {
        const inputFieldExcludeButton = document.getElementById('exclude_' + inputField)
        if (inputFieldExcludeButton.innerHTML === 'Include') {
            inputFieldExcludeButton.click()
        }
    }
    updateFormattedText()
}

function addListeners() {
    document.getElementById("authorInput").addEventListener('input', updateFormattedText)
    document.getElementById('authorCredentialsInput').addEventListener('input', updateFormattedText)
    document.getElementById("accessedDate").addEventListener('input', updateFormattedText)
    document.getElementById('publishedDate').addEventListener('input', updateFormattedText)
    document.getElementById('publisherInput').addEventListener('input', updateFormattedText)
    document.getElementById('publisherCredentialsInput').addEventListener('input', updateFormattedText)
    document.getElementById('articleInput').addEventListener('input', updateFormattedText)
    document.getElementById('linkInput').addEventListener('input', updateFormattedText)
    document.getElementById('evidenceInput').addEventListener('input', updateFormattedText)
    document.getElementById('impactInput').addEventListener('input', updateFormattedText)
    document.getElementById('copyButton').addEventListener('click', copyEvd)
    document.getElementById('accessedDateButton').addEventListener('click', () => setDate(document.getElementById('accessedDate')))
    document.getElementById('clearButton').addEventListener('click', clearForm)

    const inputContainers = document.querySelectorAll('div[class="input-container"]')
    for (const element of inputContainers) {
        element.addEventListener('mouseenter', () => {element.style.backgroundColor = '#f5f5f5'})
        element.addEventListener('mouseleave', () => {element.style.backgroundColor = 'white'})
    }

    for (const inputField of inputFields) {
        const inputFieldElement = document.getElementById(inputField)
        inputFieldElement.addEventListener('mouseenter', () => {
            if (inputFieldElement.style.backgroundColor === 'white' || !inputFieldElement.style.backgroundColor) {
                inputFieldElement.focus()
                inputFieldElement.style.boxShadow = '2px 2px 3px gray'
            }
        })
        inputFieldElement.addEventListener('mouseleave', () => {
            inputFieldElement.blur()
            inputFieldElement.style.boxShadow = ''
        })

        const inputFieldExcludeButton = document.getElementById('exclude_' + inputField)
        inputFieldExcludeButton.addEventListener('click', () => {
            if (inputFieldExcludeButton.innerHTML === 'Exclude') {
                inputFieldExcludeButton.innerHTML = 'Include'
                inputFieldElement.contentEditable = 'false'
                inputFieldElement.style.textDecoration = 'line-through'
                inputFieldElement.style.backgroundColor = '#ffe9e9'
            } else {
                inputFieldExcludeButton.innerHTML = 'Exclude'
                inputFieldElement.contentEditable = 'true'
                inputFieldElement.style.textDecoration = ''
                inputFieldElement.style.backgroundColor = 'white'
            }
            updateFormattedText()
        })

        const inputFieldClearButton = document.getElementById('clear_' + inputField)
        inputFieldClearButton.addEventListener('click', () => {
            inputFieldElement.innerHTML = ''
            updateFormattedText()
        })
    }
}

const inputFields = [
    'authorInput',
    'authorCredentialsInput',
    'accessedDate',
    'publishedDate',
    'publisherInput',
    'publisherCredentialsInput',
    'articleInput',
    'linkInput',
    'evidenceInput',
    'impactInput',
]

function onLoad() {
    addListeners()
    updateFormattedText()
}

window.onload = onLoad
