/*
DISCLAIMER: This code is quite iffy and was put together while half-awake, plus it's JS so.
I might try to clean it up, but it works rn & I don't want to break everything - so we'll see.
 */


import { SettingsContent, AboutContent } from './content_html.js';
import { publisherToCredential, publisherToName } from "./citation_completion_data.js";


// === Theme Handling ===

function addThemeListeners() {
    document.querySelectorAll(".color-circle").forEach(circle => {
        circle.addEventListener("click", () => {
            setTheme(circle.style.backgroundColor);
        });
    });
}

const Theme = new Map([
    // cur tab
    ["cur-back", "#111111"],
    ["cur-back-hover", "2c2c2c1"],
    // other tabs
    ["tab-back", "#3f3f3f"],
    ["tab-back-hover", "#212121"],
])  // map storing current themes; initially gray

function setTheme(color) {
    if (color === "rgb(68, 68, 68)") {  // Gray theme
        Theme.set('cur-back', '#111111')
        Theme.set('cur-back-hover', '#2c2c2c')
        Theme.set('tab-back', '#3f3f3f')
        Theme.set('tab-back-hover', '#212121')
    }
    if (color === "rgb(208, 0, 0)") {  // Red theme
        Theme.set('cur-back', 'rgba(37,0,0,0.5)')
        Theme.set('cur-back-hover', 'rgba(72,0,0,0.5)')
        Theme.set('tab-back', 'rgba(112,0,0,0.5)')
        Theme.set('tab-back-hover', 'rgba(72,0,0,0.5)')
    }
    if (color === "rgb(211, 132, 0)") {  // Orange theme
        Theme.set('cur-back', 'rgba(210,79,0,0.5)')
        Theme.set('cur-back-hover', 'rgba(190,67,0,0.5)')
        Theme.set('tab-back', 'rgba(128,72,0,0.5)')
        Theme.set('tab-back-hover', 'rgba(117,40,0,0.5)')
    }
    if (color === "rgb(255, 255, 114)") {  // Yellow theme
        Theme.set('cur-back', 'rgba(164,150,0,0.5)')
        Theme.set('cur-back-hover', 'rgba(162,149,0,0.5)')
        Theme.set('tab-back', 'rgba(79,61,0,0.5)')
        Theme.set('tab-back-hover', 'rgba(134,105,0,0.5)')
    }
    if (color === "rgb(0, 168, 0)") {  // Green theme
        Theme.set('cur-back', 'rgba(0,148,0,0.5)')
        Theme.set('cur-back-hover', 'rgba(0,119,0,0.5)')
        Theme.set('tab-back', 'rgba(8,72,0,0.5)')
        Theme.set('tab-back-hover', 'rgba(0,108,6,0.5)')
    }
    if (color === "rgb(0, 0, 161)") {  // Blue theme
        Theme.set('cur-back', 'rgba(45,115,173,0.5)')
        Theme.set('cur-back-hover', 'rgba(45,82,173,0.5)')
        Theme.set('tab-back', 'rgba(21,32,96,0.5)')
        Theme.set('tab-back-hover', 'rgba(45,81,173,0.5)')
    }
    if (color === "rgb(57, 0, 96)") {  // Purple theme
        Theme.set('cur-back', 'rgba(85,0,176,0.5)')
        Theme.set('cur-back-hover', 'rgba(63,0,157,0.5)')
        Theme.set('tab-back', 'rgba(36,0,86,0.5)')
        Theme.set('tab-back-hover', 'rgba(68,5,119,0.5)')
    }
    if (color === "rgb(255, 198, 255)") {  // Pink theme
        Theme.set('cur-back', 'rgba(170,0,217,0.5)')
        Theme.set('cur-back-hover', 'rgba(161,0,197,0.5)')
        Theme.set('tab-back', 'rgba(120,0,140,0.5)')
    Theme.set('tab-back-hover', 'rgba(231,16,180,0.5)')
    }

    // Update current tabs
    let c = Theme.get('tab-back');
    let h = Theme.get('tab-back-hover');
    getTabs().forEach(t => {
        t.style.backgroundColor = c;
        t.onmouseenter = () => {t.style.backgroundColor = h};
        t.onmouseleave = () => {t.style.backgroundColor = c};
    })

    aboutTabButton.style.backgroundColor = c;
    aboutTabButton.onmouseenter = () => {aboutTabButton.style.backgroundColor = h};
    aboutTabButton.onmouseleave = () => {aboutTabButton.style.backgroundColor = c};

    newTabButton.style.backgroundColor = c;
    newTabButton.onmouseenter = () => {newTabButton.style.backgroundColor = h};
    newTabButton.onmouseleave = () => {newTabButton.style.backgroundColor = c};

    onHashChange()
}


// === Settings Content Generation ===

function setupSettingsContent() {
    addThemeListeners();
}


// === Constants & Values ===

const NonTabsHashToContent = new Map([['#about', AboutContent], ['#settings', SettingsContent]]);

const tabNotFoundContent = `<h2>Tab Not Found</h2><p>The requested tab does not exist.</p>`;

const cookiesStart = '$7ST@7T7$';
const cookiesEnd = '$73N0S7$';

const defaultFieldOrder = 'author,authorCredentials,publisher,publisherCredentials,publishedDate,title,accessed,team,link,evidence,impact'.split(',');
const defaultExcluded = 'n,n,n,n,n,n,n,n,n,n,n'.split(',');
const defaultFieldValues = ',,,,,,,,,,'.split(',');
const fieldToLabel = new Map([
    ['author', 'Authors(s)'],
    ['authorCredentials', 'Authors(s) Credentials'],
    ['publisher', 'Publisher'],
    ['publisherCredentials', 'Publisher Credentials'],
    ['publishedDate', 'Published Date'],
    ['title', 'Article Title'],
    ['accessed', 'Accessed'],
    ['team', 'Team'],
    ['link', 'Article Link'],
    ['evidence', 'Evidence'],
    ['impact', 'Impact'],
]);

const TabsContainer = document.getElementById('tabs-container')
const TabHashToData = new Map([]);  // Hash -> [fieldOrder, excluded, fieldValues]

const ContentDisplay = document.getElementById('content');

const aboutTabButton = document.getElementById('about-tab');
const newTabButton = document.getElementById('new-tab')


// === Tabs ===

let curTab = null;  // Button element for cur tab


function getTabs() {
    /*
    Get tabs in tab container
     */
    return Array.from(TabsContainer.querySelectorAll('a'));
}

function addTabComponent(tab) {
    TabsContainer.appendChild(tab);
    TabsContainer.scrollTop = TabsContainer.scrollHeight;
}

function updateTab(hash, data) {
    TabHashToData.set(hash, data);
}

function newTab() {
    /*
    Creates a new tab.
     */
    const tab = document.createElement('a');

    // Generate unique good hash
    let href = (Date.now() % 1000).toString()
    while (TabHashToData.has(`#tab${href}`) || (href.startsWith('6') && href.endsWith('6'))) {
        href = (Date.now() % 1000).toString()
    }

    tab.textContent = `Tab ${href}`;
    tab.href = `#tab${href}`;
    updateTab(`#tab${href}`, [defaultFieldOrder, defaultExcluded, defaultFieldValues]);
    addTabComponent(tab);
    tab.click();  // Triggers onHashChange
}

function deleteTab() {
    /*
    Deletes the selected tab.
     */
    let tabs = getTabs()
    const hash = window.location.hash;
    TabHashToData.delete(`${hash}`);
    const i = tabs.indexOf(TabsContainer.removeChild(document.querySelector(`a[href~="${hash}"]`)))

    updateCookies()

    // Trigger onHashChange
    tabs = getTabs()
    if (tabs.length === 0) {
        aboutTabButton.click()
    } else {
        tabs[Math.max(i - 1, 0)].click()
    }
}

function initializeTabsContainer() {
    /*
    Populates TabsContainer onLoad
     */
    for (const hash of TabHashToData.keys()) {
        const tab = document.createElement('a');
        tab.textContent = `Tab ${hash.slice(4)}`;
        tab.href = hash;
        TabsContainer.appendChild(tab);
        TabsContainer.scrollTop = TabsContainer.scrollHeight;
        tab.click();  // Trigger onHashChange
    }
}


// === Window Listeners ===

function onHashChange() {
    /*
    On window hash changed.
     */
    const hash = window.location.hash;

    // Tab not found?
    if (!TabHashToData.has(hash) && !NonTabsHashToContent.has(hash)) {
        ContentDisplay.innerHTML = tabNotFoundContent;
        return;
    }

    // Otherwise, select tab.
    const tab = document.querySelector(`a[href="${hash}"]`)  // Find tab w/ target hash
    if (curTab !== null) {  // update previous tab
        let t = curTab;
        let c = Theme.get('tab-back')
        let h = Theme.get('tab-back-hover')
        t.style.backgroundColor = c
        t.onmouseenter = () => {t.style.backgroundColor = h}
        t.onmouseleave = () => {t.style.backgroundColor = c}
    }
    curTab = tab;
    const c = Theme.get('cur-back')
    const h = Theme.get('cur-back-hover')
    curTab.style.backgroundColor = c
    curTab.onmouseenter = () => {tab.style.backgroundColor = h}
    curTab.onmouseleave = () => {tab.style.backgroundColor = c}

    // Is a none-tab?
    if (NonTabsHashToContent.has(hash)) {
        ContentDisplay.innerHTML = NonTabsHashToContent.get(hash);
        if (hash === '#settings') {
            setupSettingsContent();
        }
        return;
    }

    loadCookies()
    setDisplayContentFromData(TabHashToData.get(hash))
    addEvidencingListeners()
    setExcluded(TabHashToData.get(hash))
    updateFormattedText()
}

function onLoad() {
    /*
    On window load.
     */

    const hash = window.location.hash;
    if (hash !== '') {
        onHashChange();
    }
    newTabButton.addEventListener('click', newTab)
    loadCookies()
    initializeTabsContainer()

    // Open application to about page
    curTab = aboutTabButton
    aboutTabButton.click();
}

window.addEventListener('load', onLoad);
window.addEventListener('hashchange', onHashChange);


// === Cookies ===

function clearCookies() {
    document.cookie = ''
}

function loadCookies() {
    /*
    Loads cookie data and updates tabs.
     */

    // Cookies empty or no data
    try {
        if (document.cookie === '' || document.cookie.split(cookiesStart, 2)[1].split(cookiesEnd, 2)[0] === '') {
            return;
        }
    } catch (e) {
        console.log('Error loading cookies:', e);
        console.log('`document.cookie`:', document.cookie)
        console.log('Clearing document.cookie');
        clearCookies();
        return;
    }

    const cookie = document.cookie.split(cookiesStart, 2)[1].split(cookiesEnd, 2)[0]

    try {
        const hashToData = JSON.parse(cookie);
        hashToData.forEach(a => {
            const hash = a[0];
            const d = a[1];
            updateTab(hash, d);
        })
    } catch (e) {
        console.log('Error loading cookies:', e);
        console.log('Clearing document.cookie');
        clearCookies();
    }
}

function updateCurrentTabContent() {
    let hash = window.location.hash;
    const fieldOrderArray = TabHashToData.get(hash)[0];
    const excludedArray = [];
    const fieldValueArray = [];
    fieldOrderArray.forEach(field => {
        excludedArray.push((document.getElementById('exclude_' + field).textContent === 'Include') ? 'y' : 'n')
        fieldValueArray.push(document.getElementById('input_' + field).textContent)
    })
    TabHashToData.get(hash)[1] = excludedArray
    TabHashToData.get(hash)[2] = fieldValueArray
}

function updateCookies() {
    /*
    Updates document cookies.
     */
    const a = []
    for (const hash of TabHashToData.keys()) {
        a.push([hash, TabHashToData.get(hash)])
    }
    document.cookie = cookiesStart + JSON.stringify(a) + cookiesEnd
}


// === Evidencing Setup Generation ===

function setDisplayContentFromData(data) {
    /*
    Generates and sets Content display from data: creates elements for Evidencing setup, sets field values, excludes
     */
    const [fieldOrder, excluded, fieldValues] = data

    let content = `
    <h2 id="content-title">${curTab.textContent} <button id="delete-tab">Delete Tab</button> </h2>
    `;

    fieldOrder.forEach(field => {
        content += generateFieldContentFrom(field);
    })

    content += `
    <div class="field-container">
        <button id="copy-button">Copy</button>
        <div id="formatted-display"></div>
        <button id="clearall-button">Clear All</button>
    </div> `;

    ContentDisplay.innerHTML = content;

    for (let i = 0; i < fieldOrder.length; i++) {
        document.getElementById('input_' + fieldOrder[i]).textContent = fieldValues[i]
    }

}

function setExcluded(data) {
    const [fieldOrder, excluded, fieldValues] = data
    for (let i = 0; i < excluded.length; i++) {  // Exclude
        if (excluded[i] === 'y') {
            document.getElementById('exclude_' + data[0][i]).onclick(true) // true for skip update
        }
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

function addEvidencingListeners() {
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

        // input field element highlighting
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

        // input field exclude button
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

        // input field clear button
        const inputFieldClearButton = document.getElementById('clear_' + field)
        inputFieldClearButton.addEventListener('click', () => {
            inputFieldElement.innerHTML = ''
            updateFormattedText()
        })
    })
}


// === Evidencing ===

function timesNewRomanSpan(text) {return `<span style="font-family: 'Times New Roman', Times, serif; font-style: normal; text-decoration: none; font-weight: normal;">${text}</span>`}
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
    let str = document.getElementById('formatted-display').innerHTML.trim()
    function listener(e) {
        e.clipboardData.setData("text/html", str);
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    document.getElementById('copy-button').textContent = 'Copied ✓'
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
    const published = importantSpan(document.getElementById('input_publishedDate').textContent)
    const publisher = importantSpan(document.getElementById('input_publisher').textContent)
    const publisherCredentials = credentialSpan(document.getElementById('input_publisherCredentials').textContent)
    const article = articleSpan(document.getElementById('input_title').textContent)
    const accessed = nonImportantSpan(document.getElementById('input_accessed').textContent)
    const team = nonImportantSpan(document.getElementById('input_team').textContent)
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
        citationText += `According to ${author}. `
    }
    if (!isDisabled['authorCredentials']) {
        citationText += `${authorCredentials}. `
    }
    if (!isDisabled['publisher']) {
        citationText += `Published by ${publisher}. `
    }
    if (!isDisabled['publisherCredentials']) {
        citationText += `${publisherCredentials}. `
    }
    if (!isDisabled['publishedDate']) {
        citationText += `Published ${published}. `
    }
    if (!isDisabled['title']) {
        citationText += `${article}. `
    }
    if (!isDisabled['accessed']) {
        citationText += `Accessed ${accessed}. `
    }
    if (!isDisabled['team']) {
        citationText += `[${team}]. `
    }
    if (!isDisabled['link']) {
        citationText += `${link}`
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

    if (fillPublisherCredentials) {
        const l = document.getElementById('input_link').textContent
        if (l !== prevLink) {
            prevLink = l;
            if (prevLink !== '') {
                try {
                    const p = urlStringToPublisher(prevLink);
                    if (p !== null) {
                        fillCredentialsFromPublisher(p)
                    }
                } catch (e) { }
            }
        }
    }
}


// === Citation Completion ===

let prevLink = '';
let fillPublisherCredentials = true;

function urlStringToPublisher(urlString) {
    let hostname = new URL(urlString).hostname;
    let parts = hostname.split(".");
    for (let i = 0; i < parts.length; i++) {
        if (publisherToName.has(parts[i])) {
            return parts[i];
        }
    }
    return null;
}

function fillCredentialsFromPublisher(p) {
    if (publisherToName.has(p)) {
        document.getElementById('input_publisher').textContent = publisherToName.get(p)
    }
    if (publisherToCredential.has(p)) {
        document.getElementById('input_publisherCredentials').textContent = publisherToCredential.get(p)
    }
    updateFormattedText()
}
