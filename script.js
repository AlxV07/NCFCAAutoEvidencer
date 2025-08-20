import { SettingsContent, AboutContent } from './content_html.js';
import { publisherToCredential, publisherToName } from "./citation_completion_data.js";
import { DefaultTabStr, generateEvidencingSetup, updateEvidencingSetup } from "./content_generation.js";


// ============================================= Settings Content Generation =============================================

function setupSettingsContent() {
    addThemeListeners();
}


// ============================================= Constants & Values =============================================

const tabNotFoundContent = `<h2>Tab Not Found</h2><p>The requested tab does not exist.</p>`;
const NonTabsHashToContent = new Map([['#about', AboutContent], ['#settings', SettingsContent]]);
const ContentDisplay = document.getElementById('content');

const aboutTabButton = document.getElementById('about-tab');
const newTabButton = document.getElementById('new-tab')

const cookiesStart = '$7ST@7T7$';

const TabsContainerElement = document.getElementById('tabs-container')
const TabHashToTabData = new Map([]);  // TabHash -> TabData



// ============================================= Tabs =============================================

let curTabElement = null;
let curTabData = null;


function getTabElements() {
    /*
    Get all tab elements in tab container
     */
    return Array.from(TabsContainerElement.querySelectorAll('a'));
}

function newTab() {
    /*
    Creates a new tab.
     */
    const tabElement = document.createElement('a');

    // Generate unique id
    let tabId = (Date.now() % 1000).toString();
    let hash = `#tab${tabId}`
    while (TabHashToTabData.has(hash) || (tabId.startsWith('6') && tabId.endsWith('6'))) { tabId = (Date.now() % 1000).toString() }
    tabElement.textContent = `Tab ${tabId}`;
    tabElement.href = hash;

    TabHashToTabData.set(hash, JSON.parse(DefaultTabStr));
    TabHashToTabData.get(hash)['tabId'] = tabId;
    TabsContainerElement.appendChild(tabElement);
    TabsContainerElement.scrollTop = TabsContainerElement.scrollHeight;
    tabElement.click();  // Triggers onHashChange
}

function deleteTab() {
    /*
    Deletes the selected tab.
     */
    let tabs = getTabElements()
    const curTabHash = window.location.hash;
    TabHashToTabData.delete(`${curTabHash}`);
    const i = tabs.indexOf(TabsContainerElement.removeChild(document.querySelector(`a[href~="${curTabHash}"]`)))

    // Save current TabHashToTabData w/ removed tab
    updateCookies()

    // Trigger onHashChange
    tabs = getTabElements()
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
    for (const hash of TabHashToTabData.keys()) {
        const tab = document.createElement('a');
        tab.textContent = `Tab ${hash.slice(4)}`;
        tab.href = hash.toString();
        TabsContainerElement.appendChild(tab);
        TabsContainerElement.scrollTop = TabsContainerElement.scrollHeight;
        tab.click();  // Trigger onHashChange
    }
}


// ============================================= Window Listeners =============================================

function onHashChange() {
    /*
    On window hash changed.
     */
    const hash = window.location.hash;

    // Tab not found?
    if (!TabHashToTabData.has(hash) && !NonTabsHashToContent.has(hash)) {
        ContentDisplay.innerHTML = tabNotFoundContent;
        return;
    }

    // Otherwise, select tab.
    const tab = document.querySelector(`a[href="${hash}"]`)  // Find tab w/ target hash
    if (curTabElement !== null) {  // update previous tab
        let t = curTabElement;
        let c = Theme.get('tab-back'); let h = Theme.get('tab-back-hover');
        t.style.backgroundColor = c;
        t.onmouseenter = () => {t.style.backgroundColor = h};
        t.onmouseleave = () => {t.style.backgroundColor = c};
    }
    curTabElement = tab;
    const c = Theme.get('cur-back'); const h = Theme.get('cur-back-hover');
    curTabElement.style.backgroundColor = c
    curTabElement.onmouseenter = () => {tab.style.backgroundColor = h}
    curTabElement.onmouseleave = () => {tab.style.backgroundColor = c}

    // Is a none-tab?
    if (NonTabsHashToContent.has(hash)) {
        ContentDisplay.innerHTML = NonTabsHashToContent.get(hash);
        if (hash === '#settings') { setupSettingsContent(); }
        return;
    }

    loadCookies();
    curTabData = TabHashToTabData.get(hash);
    ContentDisplay.innerHTML = generateEvidencingSetup(curTabData);
    updateEvidencingSetup(curTabData, deleteTab, fieldUp, fieldDown, setAccessedDate, copyEvidence, clearAll, updateEvidenceResult);
    updateEvidenceResult();
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
    curTabElement = aboutTabButton
    aboutTabButton.click();
}

window.addEventListener('load', onLoad);
window.addEventListener('hashchange', onHashChange);


// ============================================= Theme =============================================

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
    getTabElements().forEach(t => {
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


// ============================================= Cookies =============================================

function loadCookies() {
    /*
    Loads cookie data and updates tabs.
     */

    const cookies = document.cookie.split('; ')
    let cookie = null;
    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split('=');
        if (cookieName === cookiesStart) {
            cookie = cookieValue;
            break
        }
    }

    // Cookies empty or no data
    if (cookie === null) {
        console.log('No cookies found (null). Setting to blank...');
        clearCookies();
    } else if (cookie === '') {
        console.log('Blank cookies ("").  Continuing...');
    } else {  // Parse
        try {
            const hashToData = JSON.parse(cookie);
            hashToData.forEach(a => {
                const hash = a[0];
                const d = a[1];
                TabHashToTabData.set(hash, d);
            })
        } catch (e) {
            console.log('Error loading cookies:', e);
            console.log('With cookie:', cookie)
            console.log('Setting to blank...');
            clearCookies();
        }
    }
}

function clearCookies() {
    /*
    Sets document cookies to blank ("")
     */
    document.cookie = cookiesStart + '=;';
}

function updateCookies() {
    /*
    Updates document cookies.
     */
    const a = []
    for (const hash of TabHashToTabData.keys()) {
        a.push([hash, TabHashToTabData.get(hash)])
    }
    document.cookie = cookiesStart + '=' + JSON.stringify(a) + '; Expires=Tue, 10 Mar 2026 12:00:00 UTC'
}


// ============================================= Evidencing =============================================

function fieldUp(fieldId) {
    const o = curTabData['fieldOrder']
    let i = 0
    while (o[i] !== fieldId) {
        i++;
    }
    if (i === o.length) {
        console.error('Field ID:', fieldId, 'not found in tab data:\n', curTabData)
        return
    }
    if (i === 0) {  // top element, nothing to move up to
        return
    }

    // Swap upwards
    o[i] = o[i - 1];
    o[i - 1] = fieldId;

    // Update
    updateCookies()
    onHashChange()
}

function fieldDown(fieldId) {
    const o = curTabData['fieldOrder']
    let i = 0
    while (o[i] !== fieldId) {
        i++;
    }
    if (i === o.length) {
        console.error('Field ID:', fieldId, 'not found in tab data:\n', curTabData)
        return
    }
    if (i === o.length - 1) {  // bottom element, nothing to move down to
        return
    }

    // Swap downwards
    o[i] = o[i + 1];
    o[i + 1] = fieldId;

    // Update
    updateCookies()
    onHashChange()
}

function timesNewRomanSpan(text) {return `<span style="font-family: 'Times New Roman', Times, serif;">${text}</span>`}

function underlinedSpan(text) {return `<span style="text-decoration: underline">${text}</span>`}
function italicizedSpan(text) {return `<span style="font-style: italic">${text}</span>`}
function boldSpan(text) {return `<span style="font-weight: bold">${text}</span>`}

function tenPtSpan(text) {return `<span style="font-size: 10pt;">${text}</span>`}
function twelvePtSpan(text) {return `<span style="font-size: 12pt">${text}</span>`}

function linkSpan(text) {return `<a href=${text}><span style="color: #2043a9" >${text}</span></a>`}

function setAccessedDate() {
    const date = new Date()
    const splitDate = date.toString().split(" ")
    const month = date.toLocaleString('default', { month: 'long' });
    curTabData['fieldData']['cd']['v'] = `${month} ${splitDate[2]}, ${splitDate[3]}`
    document.getElementById('value_cd').textContent = `${month} ${splitDate[2]}, ${splitDate[3]}`
    updateEvidenceResult()
}

function copyEvidence() {
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

function clearAll() {
    curTabData['fieldOrder'].forEach(fieldId => {
        document.getElementById('clear_' + fieldId).click()
        const inputFieldExcludeButton = document.getElementById('exclude_' + fieldId)
        if (inputFieldExcludeButton.innerHTML === 'Include') {inputFieldExcludeButton.click()}  // TODO: remove and replace w/ update field["e"]
    })
    updateEvidenceResult()
}

function updateEvidenceResult() {
    /*
    Updates formatted display w/ current info from fields, saves cookies, fills credentials
     */
    document.getElementById('copy-button').textContent = 'Copy';
    const formattedDisplay = document.getElementById('formatted-display');

    let citationText = ''
    const fieldData = curTabData['fieldData'];
    curTabData['fieldOrder'].forEach(fieldId => {
        if (!fieldData[fieldId]['e']) {
            let t = (fieldData[fieldId]['p'] + fieldData[fieldId]['v'] + fieldData[fieldId]['s']);  // prefix + value + suffix
            if (fieldId === 'li') {  // link
                t = fieldData[fieldId]['p'] + linkSpan(fieldData[fieldId]['v']) + fieldData[fieldId]['s'];
                if (fieldData[fieldId]['u']) { t = underlinedSpan(t); } else {}
                if (fieldData[fieldId]['i']) { t = italicizedSpan(t); }
                if (fieldData[fieldId]['b']) { t = boldSpan(t); }
                if (fieldData[fieldId]['z'] === 10) { t = tenPtSpan(t); } else { t = twelvePtSpan(t); }
                t = timesNewRomanSpan(t);
            } else {
                if (fieldData[fieldId]['u']) { t = underlinedSpan(t); }
                if (fieldData[fieldId]['i']) { t = italicizedSpan(t); }
                if (fieldData[fieldId]['b']) { t = boldSpan(t); }
                if (fieldData[fieldId]['z'] === 10) { t = tenPtSpan(t); } else { t = twelvePtSpan(t); }
                t = timesNewRomanSpan(t);
            }
            if (fieldId === 'ev') {
                t = timesNewRomanSpan(fieldData['ev']['v'])
                if (fieldData[fieldId]['u']) { t = underlinedSpan(t); }
                if (fieldData[fieldId]['i']) { t = italicizedSpan(t); }
                if (fieldData[fieldId]['b']) { t = boldSpan(t); }
                if (fieldData[fieldId]['z'] === 10) { t = tenPtSpan(t); } else { t = twelvePtSpan(t); }
                t = `<br>${fieldData['ev']['p']}${t}${fieldData['ev']['s']}`
            }
            if (fieldId === 'im') {  // add new line
                t = `<br>${t}`;
            }
            citationText += t + " ";
        }
    })
    let result = `${citationText}`

    formattedDisplay.innerHTML = timesNewRomanSpan(`${result}`)
    updateCookies()
    if (autoFillPublisherCredentialsEnabled) {
        const l = document.getElementById('value_li').textContent;
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


// ============================================= Citation Completion =============================================

let prevLink = '';
let autoFillPublisherCredentialsEnabled = true;  // currently set to always true, maybe change in settings to disable auto-citing

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
        document.getElementById('value_pn').textContent = publisherToName.get(p).toString()
    }
    if (publisherToCredential.has(p)) {
        document.getElementById('value_pc').textContent = publisherToCredential.get(p).toString()
    }
    updateEvidenceResult()
}
