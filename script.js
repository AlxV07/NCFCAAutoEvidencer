/*
DISCLAIMER: This code is absolutely disgusting and was put together while half-awake.  Plus it's JS.
I might try to clean it up, but it works rn & I don't want to break everything - so we'll see.
 */


// === Constants & Values ===

const settingsContent = `
<h2>Settings</h2>
To be implemented soon.<br><br>

NOTICE: Massive rework of application in progress.  Please report any bugs!<br><br>

Settings will include: <br>
- Access to auto-citation database. <br>
- Color theme customization. <br>`;

const aboutContent = `
<h2>About</h2>

NCFCAAutoEvidencer Version: 3.0.1.3<br>
Last updated: 11/3/24<br><br>

A tool to quickly format evidence for NCFCA Debate.
Copy-and-paste evidence straight from sources to automatically format cards.
<br><br>

NCFCAAutoEvidencer Version 3+ introduces new usability, wrapping the good old Evidencer in a multi-tab database-powered application.<br>
Version 3+ will enable users to:<br>
- Automatically cite from a growing database of citations of known authors, publishers, and websites.<br>
- Save & edit multiple pieces of evidence across sessions and devices with tabs.<br>
- Choose and create custom UI color themes.<br><br>

NOTICE: Massive rework of application in progress.  Please report any bugs!<br><br>

NOTICE: NCFCAAutoEvidencer Version 3+ uses cookies to, and only to, save evidence in-browser across sessions. Blocking cookies blocks this feature.<br><br>

Any suggestions, comments, or feedback is appreciated! <br><br>

Contact: alexander.kai.chen@gmail.com | <a href="https://alxv07.github.io/AboutMe/">https://alxv07.github.io/AboutMe/</a> <br>
Chen/Kuykendall | Region 11, 2023-2024 | Sts. Peter & Paul Speech & Debate<br>
Chen/O'Connors | Region 11, 2024-2025 | Sts. Peter & Paul Speech & Debate<br><br>`;

const tabSplit = '$7T@B37$'
const itemSplit = '$71T3MS7$'
const fieldValSplit = '$7F13LDS7$'
const cookiesStart = '$7ST@7T7$'
const cookiesEnd = '$73N0S7$'

const defaultFieldOrder = 'author,authorCredentials,publisher,publisherCredentials,publishedDate,title,accessed,link,evidence,impact'.split(',');
const defaultExcluded = 'n,n,n,n,n,n,n,n,n,n'.split(',');
const defaultFieldValues = ',,,,,,,,,'.split(',');
const tabNotFoundContent = `<h2>Tab Not Found</h2><p>The requested tab does not exist.</p>`;
const hashToContent = new Map([
    ['#settings', '#settings'],
    ['#about', '#about']
    // Hash -> [fieldOrder, excluded, fieldValues]
]);

const fieldToLabel = new Map([
    ['author', 'Authors(s)'],
    ['authorCredentials', 'Authors(s) Credentials'],
    ['publisher', 'Publisher'],
    ['publisherCredentials', 'Publisher Credentials'],
    ['publishedDate', 'Published Date'],
    ['title', 'Article Title'],
    ['accessed', 'Accessed'],
    ['link', 'Article Link'],
    ['evidence', 'Evidence'],
    ['impact', 'Impact'],
]);

let curTab = null;


// === Tabs ===

function getTabs() {
    const tabsContainer = document.getElementById('tabs-container');
    return Array.from(tabsContainer.querySelectorAll('a'));
}

function newTab() {
    const tabsContainer = document.getElementById('tabs-container')
    const tab = document.createElement('a');

    let href = (Date.now() % 1000).toString()
    while (hashToContent.has(`#tab${href}`) || (href.startsWith('6') && href.endsWith('6'))) {
        href = (Date.now() % 1000).toString()
    }

    tab.textContent = `Tab ${href}`;
    tab.href = `#tab${href}`;
    hashToContent.set(`#tab${href}`, [defaultFieldOrder, defaultExcluded, defaultFieldValues]);
    tabsContainer.appendChild(tab);
    tabsContainer.scrollTop = tabsContainer.scrollHeight;
    tab.click();
}

function deleteTab() {
    const tabsContainer = document.getElementById('tabs-container')
    let tabs = getTabs()
    if (tabs.length === 0) {
        return;
    }
    hashToContent.delete(`${window.location.hash}`);
    const c = document.querySelector(`a[href~="${window.location.hash}"]`)
    tabsContainer.removeChild(c)
    const i = tabs.indexOf(c)

    updateCookies()

    tabs = getTabs()

    if (tabs.length === 0) {
        document.getElementById('about-tab').click()
    } else {
        const m = Math.max(i - 1, 0)
        tabs[m].click()
    }
}

function initializeTabsContainer() {
    const tabsContainer = document.getElementById('tabs-container')
    for (const hash of hashToContent.keys()) {
        if (hashToContent.get(hash) !== hash) {  // Is a tab
            const tab = document.createElement('a');
            tab.textContent = `Tab ${hash.slice(4)}`;
            tab.href = hash;
            tabsContainer.appendChild(tab);
            tabsContainer.scrollTop = tabsContainer.scrollHeight;
            tab.click();
        }
    }
}


// === Window Listeners ===

function onHashChange() {
    let hash = window.location.hash;
    const content = document.getElementById('content');
    let newContent;
    if (hashToContent.has(hash)) {
        const tab = document.querySelector(`a[href="${hash}"]`)
        if (curTab !== null) {
            const t = curTab
            t.style.backgroundColor = '#444'
            curTab.onmouseenter = () => {t.style.backgroundColor = '#555'}
            curTab.onmouseleave = () => {t.style.backgroundColor = '#444'}
        }
        curTab = tab;
        curTab.style.backgroundColor = '#ad2d2d'
        curTab.onmouseenter = () => {tab.style.backgroundColor = '#ad3d2d'}
        curTab.onmouseleave = () => {tab.style.backgroundColor = '#ad2d2d'}

        loadCookies()

        const data = hashToContent.get(hash);
        if (hash === data) {  // Not a tab
            switch (hash) {
                case '#settings': {
                    newContent = settingsContent;
                    break;
                }
                case '#about': {
                    newContent = aboutContent;
                    break;
                }
            }
        } else {
            generateEvidencingSetupContentFrom(data)
            addContentListeners()
            for (let i = 0; i < data[0].length; i++) {  // Exclude
                if (data[1][i] === 'y') {
                    document.getElementById('exclude_' + data[0][i]).onclick(true) // true for skip update
                }
            }
            updateFormattedText()
            return
        }
    } else {
        newContent = tabNotFoundContent;
    }
    content.innerHTML = newContent;
}

function onLoad() {
    const hash = window.location.hash;
    if (hash !== '') {
        onHashChange();
    }
    document.getElementById('new-tab').addEventListener('click', newTab)
    loadCookies()
    initializeTabsContainer()

    const aboutTab = document.getElementById('about-tab');
    curTab = aboutTab
    aboutTab.click();
}

window.addEventListener('load', onLoad);
window.addEventListener('hashchange', onHashChange);


// === Cookies ===

function loadCookies() {
    try {
        if (document.cookie === '') {
            return
        }
        const cookie = document.cookie.split(cookiesStart, 2)[1].split(cookiesEnd, 2)[0]
        if (cookie === '') {
            return;
        }

        const tabs = cookie.split(tabSplit)
        tabs.forEach(data => {
            const d = data.split(itemSplit)
            const hash = d[0];
            const fieldOrderS = d[1];
            const excludedS = d[2];
            const fieldValuesS = d[3];

            const fieldOrder = fieldOrderS.substring(1, fieldOrderS.length - 1).split(',');
            const excluded = excludedS.substring(1, excludedS.length - 1).split(',');
            const fieldValues = fieldValuesS.substring(1, fieldValuesS.length - 1).split(fieldValSplit)

            hashToContent.set(hash, [fieldOrder, excluded, fieldValues])
        })

    } catch (e) {
        console.log('Error loading cookies:', e)
    }
}

function updateCurrentTabContent() {
    let hash = window.location.hash;
    const fieldOrderArray = hashToContent.get(hash)[0]
    const excludedArray = []
    const fieldValueArray = []
    fieldOrderArray.forEach(field => {
        excludedArray.push((document.getElementById('exclude_' + field).textContent === 'Include') ? 'y' : 'n')
        fieldValueArray.push(document.getElementById('input_' + field).textContent)
    })
    hashToContent.get(hash)[1] = excludedArray
    hashToContent.get(hash)[2] = fieldValueArray
}

function updateCookies() {
    let result = '';

    for (const hashToContentKey of hashToContent.keys()) {
        if (hashToContent.get(hashToContentKey) !== hashToContentKey) {  // Is a tab
            result += stringifyTabData(hashToContentKey) + tabSplit
        }
    }
    result = result.substring(0, result.length - tabSplit.length)
    document.cookie = cookiesStart + result + cookiesEnd
}

function stringifyTabData(hash) {
    const fieldOrderArray = hashToContent.get(hash)[0]
    const excludedArray = hashToContent.get(hash)[1]
    const fieldValueArray = hashToContent.get(hash)[2]
    let fieldOrder = '['
    let excluded = '['
    let fieldValues = '['
    fieldOrderArray.forEach(field => {
        fieldOrder += field + ','
    })
    excludedArray.forEach(e => {
        excluded += e + ','
    })
    fieldValueArray.forEach(v => {
        fieldValues += v + fieldValSplit
    })
    fieldOrder = fieldOrder.substring(0, fieldOrder.length - 1) + ']'
    excluded = excluded.substring(0, excluded.length - 1) + ']'
    fieldValues = fieldValues.substring(0, fieldValues.length - fieldValSplit.length) + ']'
    return hash + itemSplit + fieldOrder + itemSplit + excluded + itemSplit + fieldValues
}


// === Evidencing Setup Generation ===

function generateEvidencingSetupContentFrom(data) {
    const [fieldOrder, excluded, fieldValues] = data

    let content = `
    <h2 id="content-title">${curTab.textContent} <button id="delete-tab">Delete</button> </h2>
    `;

    fieldOrder.forEach(field => { content += generateFieldContentFrom(field); })

    content += `
    <div class="field-container">
        <button id="copy-button">Copy</button>
        <div id="formatted-display"></div>
        <button id="clearall-button">Clear All</button>
    </div> `;

    document.getElementById('content').innerHTML = content;

    for (let i = 0; i < fieldOrder.length; i++) {
        document.getElementById('input_' + fieldOrder[i]).textContent = fieldValues[i]
    }
}

function generateFieldContentFrom(field) {
    return `<div class="field-container">
        <label class="field-label" id="label_${field}">${fieldToLabel.get(field)}</label>` +
        (field === "accessed"? `<button id="accessed-button">Today</button>` : '') +
        `<div class="field-input" id="input_${field}" contentEditable="true"></div>
        <button class="field-exclude" id="exclude_${field}">Exclude</button>
        <button class="field-clear" id="clear_${field}">Clear</button>
    </div>`;
}

function addContentListeners() {
    document.getElementById('delete-tab').addEventListener('click', deleteTab)
    document.getElementById('accessed-button').addEventListener('click', setAccessedDate)
    document.getElementById('copy-button').addEventListener('click', copyEvd)
    document.getElementById('clearall-button').addEventListener('click', clearForm)

    const fieldContainers = document.querySelectorAll('div[class="field-container"]')
    for (const element of fieldContainers) {
        element.addEventListener('mouseenter', () => {element.style.backgroundColor = '#f5f5f5'})
        element.addEventListener('mouseleave', () => {element.style.backgroundColor = 'white'})
        element.style.backgroundColor = 'white'
    }

    defaultFieldOrder.forEach(field => {
        const inputFieldElement = document.getElementById('input_' + field);
        inputFieldElement.addEventListener('input', updateFormattedText)

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
        const inputFieldExcludeButton = document.getElementById('exclude_' + field)
        inputFieldExcludeButton.onclick = (skipUpdate) => {
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
            if (skipUpdate === true) {
                return
            }
            updateFormattedText()
        }
        const inputFieldClearButton = document.getElementById('clear_' + field)
        inputFieldClearButton.addEventListener('click', () => {
            inputFieldElement.innerHTML = ''
            updateFormattedText()
        })
    })
}


// === Evidencing ===

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

function setAccessedDate() {
    const date = new Date()
    const splitDate = date.toString().split(" ")
    const month = date.toLocaleString('default', { month: 'long' });
    document.getElementById('input_accessed').textContent = `${month} ${splitDate[2]}, ${splitDate[3]}`
    updateFormattedText()
}

function copyEvd() {
    let str = document.querySelector("[class~=formatted-evidence]").innerHTML.trim()
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
    defaultFieldOrder.forEach(field => {
        document.getElementById('input_' + field).innerHTML = ''
        const inputFieldExcludeButton = document.getElementById('exclude_' + field)
        if (inputFieldExcludeButton.innerHTML === 'Include') {inputFieldExcludeButton.click()}
    })
    updateFormattedText()
}

function updateFormattedText() {
    document.getElementById('copy-button').textContent = 'Copy'
    const formattedDisplay = document.getElementById('formatted-display');

    const author = importantSpan(document.getElementById('input_author').textContent)
    const authorCredentials = credentialSpan(document.getElementById('input_authorCredentials').textContent)
    const accessed = nonImportantSpan(document.getElementById('input_accessed').textContent)
    const published = importantSpan(document.getElementById('input_publishedDate').textContent)
    const publisher = importantSpan(document.getElementById('input_publisher').textContent)
    const publisherCredentials = credentialSpan(document.getElementById('input_publisherCredentials').textContent)
    const article = articleSpan(document.getElementById('input_title').textContent)
    const link = linkSpan(document.getElementById('input_link').textContent)
    const evd = evidenceSpan(document.getElementById('input_evidence').textContent)
    const impact = impactSpan(document.getElementById('input_impact').textContent)

    const isDisabled = {}
    defaultFieldOrder.forEach(field => {
        const element = document.getElementById('input_' + field)
        isDisabled[field] = element.style.textDecoration === 'line-through'
    })
    let citationText = ''
    if (!isDisabled['author']) {
        citationText += `According to ${author} `
    }
    if (!isDisabled['authorCredentials']) {
        citationText += authorCredentials + ' '
    }
    if (!isDisabled['publisher']) {
        citationText += `Published by ${publisher} `
    }
    if (!isDisabled['publisherCredentials']) {
        citationText += publisherCredentials + ' '
    }
    if (!isDisabled['publishedDate']) {
        citationText += `Published on ${published} `
    }
    if (!isDisabled['title']) {
        citationText += article + ' '
    }
    if (!isDisabled['accessed']) {
        citationText += `Accessed on ${accessed} `
    }
    if (!isDisabled['link']) {
        citationText += link + ' '
    }
    let citation = `${nonImportantSpan(citationText)}`
    if (!isDisabled['evidence']) {
        citation += `<br>${evd}`
    }
    if (!isDisabled['impact']) {
        citation += `<br>${impact}`
    }
    formattedDisplay.innerHTML = timesNewRomanSpan(`${citation}`)
    updateCurrentTabContent()
    updateCookies()
}
