function timesNewRomanSpan(text) {return `<span style="font-family: 'Times New Roman', Times, serif">${text}</span>`}
function italicizedSpan(text) {return `<span style="font-style: italic">${text}</span>`}
function boldSpan(text) {return `<span style="font-weight: bold">${text}</span>`}
function underlinedSpan(text) {return `<span style="text-decoration: underline">${text}</span>`}
function twelvePtSpan(text) {return `<span style="font-size: 12pt">${text}</span>`}
function tenPtSpan(text) {return `<span style="font-size: 10pt;">${text}</span>`}
function linkSpan(text) {return `<a href=${text}><span style="color: #2043a9" >${italicizedSpan(underlinedSpan(tenPtSpan(text)))}</span></a>`}
function evidenceSpan(text) {return `<span>${twelvePtSpan(`[“]${underlinedSpan(text)}[”]`)}</span>`}
function credentialSpan(text) {return `<span>${nonImportantSpan(`(${text})`)}</span>`}
function articleSpan(text) {return `<span>${nonImportantSpan(`(“${text}”)`)}</span>`}
function nonImportantSpan(text) {return `<span>${italicizedSpan(tenPtSpan(text))}</span>`}
function importantSpan(text) {return `<span>${underlinedSpan(italicizedSpan(twelvePtSpan(text)))}</span>`}
function impactSpan(text) {return `<span>${twelvePtSpan(boldSpan(`MPX: ${text}`))}</span>`}

const inputFieldNames = [
    'authorInput',
    'authorCredentialsInput',
    'accessedDateInput',
    'publishedDateInput',
    'publisherInput',
    'publisherCredentialsInput',
    'articleInput',
    'linkInput',
    'evidenceInput',
    'impactInput',
]
const inputFields = []  // Populated in `onload`
function populateInputFieldsArray() {
    for (const inputFieldName of inputFieldNames) {
        inputFields.push(document.getElementById(inputFieldName))
    }
}

function setAccessedDate() {
    const date = new Date()
    const splitDate = date.toString().split(" ")
    const month = date.toLocaleString('default', { month: 'long' });
    document.getElementById('accessedDateInput').textContent = `${month} ${splitDate[2]}, ${splitDate[3]}`
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
    for (const inputField of inputFields) {
        inputField.innerHTML = ''
    }
    for (const inputField of inputFieldNames) {
        const inputFieldExcludeButton = document.getElementById('exclude_' + inputField)
        if (inputFieldExcludeButton.innerHTML === 'Include') {inputFieldExcludeButton.click()}
    }
    updateFormattedText()
}

// Playing
let ranges = []
// End

function addListeners() {
    for (const inputField of inputFields) {
        inputField.addEventListener('input', updateFormattedText)
    }

    // Playing
    // let evidenceImportanceInput = document.getElementById('evidenceImportanceInput');
    // document.getElementById('evidenceInput').addEventListener('input', () => {
    //     let old = evidenceImportanceInput.innerText
    //     let news = document.getElementById('evidenceInput').innerText
    //     evidenceImportanceInput.innerText = news
    //     console.log(news)
    // })
    // document.getElementById('evidenceImportanceInputUnderline').addEventListener('click', () => {
    //     let selection = window.getSelection();
    //     let selectedText = selection.toString();
    //     if (selectedText.length > 0) {
    //         let range = selection.getRangeAt(0);
    //         let startNode = range.startContainer.parentNode;
    //         let startIndex = Array.prototype.indexOf.call(startNode.childNodes, range.startContainer);
    //         let startOffset = range.startOffset;
    //         let endIndex = Array.prototype.indexOf.call(startNode.childNodes, range.endContainer);
    //         let endOffset = range.endOffset;
    //         let size = endOffset - startOffset;
    //         console.log("Selected text: ", selectedText);
    //         console.log("Start index: ", startIndex);
    //         console.log("Size: ", size);
    //         let h = evidenceImportanceInput.innerText
    //         let orig = h.substring(0, startIndex + startOffset)
    //         let toUnderline = h.substring(startIndex + startOffset, startIndex + startOffset + size)
    //         let rest = h.substring(startIndex + size + startOffset, h.length)
    //         evidenceImportanceInput.innerHTML = orig + '<u>' + toUnderline + '</u>' + rest
    //     }
    // })
    // End

    document.getElementById('copyButton').addEventListener('click', copyEvd)
    document.getElementById('accessedDateButton').addEventListener('click', () => setAccessedDate())
    document.getElementById('clearAllButton').addEventListener('click', clearForm)
    const fieldContainers = document.querySelectorAll('div[class="field-container"]')
    for (const element of fieldContainers) {
        element.addEventListener('mouseenter', () => {element.style.backgroundColor = '#f5f5f5'})
        element.addEventListener('mouseleave', () => {element.style.backgroundColor = 'white'})
    }
    for (const inputField of inputFieldNames) {
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

function updateFormattedText() {
    document.getElementById('copyButton').textContent = 'Copy'
    const formattedEvidence = document.getElementById('formattedEvidence');
    const author = importantSpan(document.getElementById('authorInput').textContent)
    const authorCredentials = credentialSpan(document.getElementById('authorCredentialsInput').textContent)
    const accessed = importantSpan(document.getElementById('accessedDateInput').textContent)
    const published = importantSpan(document.getElementById('publishedDateInput').textContent)
    const publisher = importantSpan(document.getElementById('publisherInput').textContent)
    const publisherCredentials = credentialSpan(document.getElementById('publisherCredentialsInput').textContent)
    const article = articleSpan(document.getElementById('articleInput').textContent)
    const link = linkSpan(document.getElementById('linkInput').textContent)
    const evd = evidenceSpan(document.getElementById('evidenceInput').textContent)
    const impact = impactSpan(document.getElementById('impactInput').textContent)

    const isDisabled = {}
    for (const inputField of inputFieldNames) {
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
    if (!isDisabled['accessedDateInput']) {
        citationText += `Accessed on ${accessed} `
    }
    if (!isDisabled['publishedDateInput']) {
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
    formattedEvidence.innerHTML = timesNewRomanSpan(`${citation}`)

    // Hehe
    let everythingExcluded = true
    for (const disabledKey in isDisabled) {
        if (!isDisabled[disabledKey]) {
            everythingExcluded = false
            break
        }
    }
    if (everythingExcluded) {
        setTimeout(() => {
            alert('Knew somebody would do this ;D You silly little goofy <3')
        }, 250)  // Timeout to update color
    }
}

function onLoad() {
    populateInputFieldsArray()
    addListeners()
    updateFormattedText()
}

window.onload = onLoad
