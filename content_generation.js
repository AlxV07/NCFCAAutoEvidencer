export const FieldIdToLabel = JSON.parse(`{
    "an": "Author(s)",
    "ac": "Author(s) Credentials",
    "pn": "Publisher",
    "pc": "Publisher Credentials",
    "pd": "Published Date",
    "cd": "Accessed On",
    "ti": "Article Title",
    "te": "Team",
    "li": "Link",
    "ev": "Evidence",
    "im": "Impact"
}`)

export const FieldIdToDefPre = JSON.parse(`{
    "an": "According to ",
    "ac": "(",
    "pn": "Published by ",
    "pc": "(",
    "pd": "On ",
    "cd": "Accessed ",
    "ti": "(\\\\\\"",
    "te": "[",
    "li": "",
    "ev": "[“]",
    "im": "MPX: "
}`)

export const FieldIdToDefSuf = JSON.parse(`{
    "an": ".",
    "ac": ").",
    "pn": ".",
    "pc": ").",
    "pd": ".",
    "cd": ".",
    "ti": "\\\\\\").",
    "te": "].",
    "li": ".",
    "ev": "[”]",
    "im": ""
}`)

export const DefaultTabStr = `{
    "tabId": "default",
    "fieldOrder": ["an", "ac", "pn", "pc", "pd", "cd", "ti", "te", "li", "ev", "im"],
    "fieldData": {
        "an": {
            "fieldId": "an", "v": "",
            "p": "${FieldIdToDefPre["an"]}",
            "s": "${FieldIdToDefSuf["an"]}",
            "z": 12,
            "u": true, "i": true, "b": false,
            "e": false
        },
        
        "ac": {
            "fieldId": "ac", "v": "",
            "p": "${FieldIdToDefPre["ac"]}",
            "s": "${FieldIdToDefSuf["ac"]}",
            "z": 10,
            "u": false, "i": true, "b": false,
            "e": false
        },
        
        "pn": {
            "fieldId": "pn", "v": "",
            "p": "${FieldIdToDefPre["pn"]}",
            "s": "${FieldIdToDefSuf["pn"]}",
            "z": 12,
            "u": true, "i": true, "b": false,
            "e": false
        },
        
        "pc": {
            "fieldId": "pc", "v": "",
            "p": "${FieldIdToDefPre["pc"]}",
            "s": "${FieldIdToDefSuf["pc"]}",
            "z": 10,
            "u": false, "i": true, "b": false,
            "e": false
        },
        
        "pd": {
            "fieldId": "pd", "v": "",
            "p": "${FieldIdToDefPre["pd"]}",
            "s": "${FieldIdToDefSuf["pd"]}",
            "z": 12,
            "u": true, "i": true, "b": false,
            "e": false
        },
        
        "cd": {
            "fieldId": "cd", "v": "",
            "p": "${FieldIdToDefPre["cd"]}",
            "s": "${FieldIdToDefSuf["cd"]}",
            "z": 10,
            "u": false, "i": true, "b": false,
            "e": false
        },
        
        "ti": {
            "fieldId": "ti", "v": "",
            "p": "${FieldIdToDefPre["ti"]}",
            "s": "${FieldIdToDefSuf["ti"]}",
            "z": 10,
            "u": false, "i": true, "b": false,
            "e": false
        },
        
        "te": {
            "fieldId": "te", "v": "",
            "p": "${FieldIdToDefPre["te"]}",
            "s": "${FieldIdToDefSuf["te"]}",
            "z": 10,
            "u": false, "i": true, "b": false,
            "e": false
        },
        
        "li": { 
            "fieldId": "li", "v": "",
            "p": "${FieldIdToDefPre["li"]}",
            "s": "${FieldIdToDefSuf["li"]}",
            "z": 10,
            "u": true, "i": true, "b": false,
            "e": false
        },
        
        "ev": { 
            "fieldId": "ev", "v": "",
            "p": "${FieldIdToDefPre["ev"]}",
            "s": "${FieldIdToDefSuf["ev"]}",
            "z": 12,
            "u": true, "i": false, "b": false,
            "e": false
        },
        
        "im": { 
            "fieldId": "im", "v": "",
            "p": "${FieldIdToDefPre["im"]}",
            "s": "${FieldIdToDefSuf["im"]}",
            "z": 12,
            "u": false, "i": false, "b": true,
            "e": false
        }
    }
}`
JSON.parse(DefaultTabStr)

/*
In main script:
onTabChange ->
    content = generateEvidencingSetup
        header
        generateFieldContainers
        footer
    updateEvidencingSetup
        add container listeners
        update field containers
 */

export function generateEvidencingSetup(tab) {
    /*
    Generates HTML content for evidencing setup for given tab
     */

    let content = ``;

    // Tab header
    const header = `<h2 id="content-title">Tab ${tab["tabId"]} <button id="delete-tab-button">Delete Tab</button> </h2>`;
    content += header;

    // Generate evidence component containers
    tab["fieldOrder"].forEach(fieldId => {
        const container = generateFieldContainerHTML(tab["fieldData"][fieldId]);
        content += container;
    })

    // Footer container
    const footer = `
    <div class="field-container">
        <button id="copy-button"      >Copy</button>
        <div    id="formatted-display"></div>
        <button id="clearall-button"  >Clear All</button>
    </div> `;
    content += footer;

    return content;
}

export function updateEvidencingSetup(tab, deleteTab, fieldUp, fieldDown, setAccessedDate, copyEvidence, clearAll, updateEvidenceResult) {
    /*
    Updates evidencing setup, adding listeners & applying configurations to field containers from given tab
    Requires HTML content to already be loaded in document
     */

    // Add input listeners
    tab["fieldOrder"].forEach(fieldId => {
        addFieldContainerListeners(tab["fieldData"][fieldId], updateEvidenceResult, fieldUp, fieldDown);
    })
    addMiscContainerListeners(deleteTab, setAccessedDate, copyEvidence, clearAll)

    // Update field containers
    tab["fieldOrder"].forEach(fieldId => {
        updateFieldContainer(tab["fieldData"][fieldId]);
    })
}

export function addMiscContainerListeners(deleteTab, setAccessedDate, copyEvidence, clearAll) {
    /*
    Add listeners for delete-tab-button, accessed-button, copy and clearall buttons
     */
    document.getElementById('delete-tab-button').addEventListener('click', () => {deleteTab();})
    document.getElementById('accessed-button').addEventListener('click', () => {setAccessedDate();})
    document.getElementById('copy-button').addEventListener('click', () => {copyEvidence();})
    document.getElementById('clearall-button').addEventListener('click', () => {clearAll();})
}

export function generateFieldContainerHTML(field) {
    /*
    Generate HTML content for singular field container with input val for given field
     */

    const fieldId = field["fieldId"]
    const label = FieldIdToLabel[fieldId] + ((fieldId === 'cd') ? `<button id="accessed-button">Today</button>` : '');
    const underlineDisabled = (fieldId === 'li') ? 'disabled' : '';

    return `
    <div class="field-container" id="container_${fieldId}">
        <div class="field-order" id="order_${fieldId}">
            <button class="field-up"   id="up_${fieldId}"   >↑</button>
            <button class="field-down" id="down_${fieldId}" >↓</button>
        </div>
        
        <label  class="field-label" id="label_${fieldId}">${label}</label>
        
        <div class="field-value" id="value_${fieldId}" contentEditable="true">${field['v']}</div>
        
        <div class="field-pre" id="pre_${fieldId}" contentEditable="true">${field['p']}</div>
        <div class="field-suf" id="suf_${fieldId}" contentEditable="true">${field['s']}</div>
        
        <div class="field-size" id="size_${fieldId}">
            <button class="field-size10pt" id="size10pt_${fieldId}">10pt</button>
            <button class="field-size12pt" id="size12pt_${fieldId}">12pt</button>
         </div>
         
        <button class="field-underline" ${underlineDisabled} id="underline_${fieldId}">U</button>
        <button class="field-italicize" id="italicize_${fieldId}">I</button>
        <button class="field-bold"      id="bold_${fieldId}"     >B</button>
        
        <button class="field-exclude" id="exclude_${fieldId}">Exclude</button>
        
        <button class="field-clear" id="clear_${fieldId}"  >Clear</button>
    </div>`;
}

export function addFieldContainerListeners(field, updateEvidenceResult, fieldUp, fieldDown) {
    /*
    Add listeners to buttons and input components in field container for given fieldId
    Requires: field container and elements to already be loaded in document
     */
    const fieldId = field["fieldId"];

    // TODO: update to get color from theme

    // Add background-color listener to container
    const container = document.getElementById(`container_${fieldId}`);
    container.addEventListener('mouseenter', () => {
        container.style.backgroundColor = '#f5f5f5';
    });
    container.addEventListener('mouseleave', () => {
        container.style.backgroundColor = 'white';
    });
    container.style.backgroundColor = 'white';

    // Add order change button containers
    const up = document.getElementById(`up_${fieldId}`);
    const down = document.getElementById(`down_${fieldId}`);
    up.addEventListener('click', () => {
        fieldUp(fieldId);
    })
    down.addEventListener('click', () => {
        fieldDown(fieldId);
    })

    // Add strip-formatting-on-paste to value component
    const value = document.getElementById(`value_${fieldId}`);
    value.addEventListener("paste", function (event) {
        event.preventDefault();
        const text = (event.clipboardData || window.clipboardData).getData("text");
        document.execCommand("insertText", false, text);
    });

    // Add save-values-on-input to input components
    const pre = document.getElementById(`pre_${fieldId}`);
    const suf = document.getElementById(`suf_${fieldId}`);
    value.addEventListener('input', () => {
        field["v"] = value.textContent;
        updateEvidenceResult();
    })
    pre.addEventListener('input', () => {
        field["p"] = pre.textContent;
        updateEvidenceResult();
    })
    suf.addEventListener('input', () => {
        field["s"] = suf.textContent;
        updateEvidenceResult();
    })

    // Add focus-on-hover listener to input components
    value.addEventListener('mouseenter', () => {
        if (value.style.backgroundColor === 'white' || !value.style.backgroundColor) {
            value.focus();
            value.style.boxShadow = '2px 2px 3px gray';
        }
    })
    value.addEventListener('mouseleave', () => {
        value.blur();
        value.style.boxShadow = '';
    })
    pre.addEventListener('mouseenter', () => {
        if (pre.style.backgroundColor === 'white' || !pre.style.backgroundColor) {
            pre.focus();
            pre.style.boxShadow = '2px 2px 3px gray';
        }
    })
    pre.addEventListener('mouseleave', () => {
        pre.blur();
        pre.style.boxShadow = '';
    })
    suf.addEventListener('mouseenter', () => {
        if (suf.style.backgroundColor === 'white' || !suf.style.backgroundColor) {
            suf.focus();
            suf.style.boxShadow = '2px 2px 3px gray';
        }
    })
    suf.addEventListener('mouseleave', () => {
        suf.blur();
        suf.style.boxShadow = '';
    })

    // Add style listeners
    const size10pt = document.getElementById(`size10pt_${fieldId}`);
    const size12pt = document.getElementById(`size12pt_${fieldId}`);
    size10pt.onclick = (skipUpdate) => {
        if (skipUpdate !== null) {
            field["z"] = 10;
        }
        size10pt.style.backgroundColor = (field["z"] === 10) ? 'gray' : 'white';
        size12pt.style.backgroundColor = (field["z"] === 10) ? 'white' : 'gray';
        if (skipUpdate !== null) {
            updateEvidenceResult();
        }
    }
    size12pt.onclick = (skipUpdate) => {
        if (skipUpdate !== null) {
            field["z"] = 12;
        }
        size10pt.style.backgroundColor = (field["z"] === 10) ? 'gray' : 'white';
        size12pt.style.backgroundColor = (field["z"] === 10) ? 'white' : 'gray';
        if (skipUpdate !== null) {
            updateEvidenceResult();
        }
    }

    const underline = document.getElementById(`underline_${fieldId}`);
    underline.onclick = (skipUpdate) => {
        if (skipUpdate !== null) {
            field["u"] = !field["u"];
        }
        underline.style.backgroundColor = (field["u"]) ? 'gray' : 'white';
        if (skipUpdate !== null) {
            updateEvidenceResult();
        }
    }

    const italic = document.getElementById(`italicize_${fieldId}`);
    italic.onclick = (skipUpdate) => {
        if (skipUpdate !== null) {
            field["i"] = !field["i"];
        }
        italic.style.backgroundColor = (field["i"]) ? 'gray' : 'white';
        if (skipUpdate !== null) {
            updateEvidenceResult();
        }
    }

    const bold = document.getElementById(`bold_${fieldId}`);
    bold.onclick = (skipUpdate) => {
        if (skipUpdate !== null) {
            field["b"] = !field["b"];
        }
        bold.style.backgroundColor = (field["b"]) ? 'gray' : 'white';
        if (skipUpdate !== null) {
            updateEvidenceResult();
        }
    }

    // Add exclude to exclude button
    const comps = [value, pre, suf];
    const exclude = document.getElementById(`exclude_${fieldId}`)
    exclude.onclick = (skipUpdate) => {
        if (skipUpdate !== null) {
            field["e"] = !field["e"];
        }
        if (field["e"]) {
            exclude.innerHTML = 'Include';
            for (const c of comps) {
                c.contentEditable = 'false';
                c.style.textDecoration = 'line-through';
                c.style.backgroundColor = '#ffe9e9';
            }
        } else {
            exclude.innerHTML = 'Exclude';
            for (const c of comps) {
                c.contentEditable = 'true'
                c.style.textDecoration = '';
                c.style.backgroundColor = 'white';
            }
        }
        if (skipUpdate !== null) {
            updateEvidenceResult();
        }
    }

    // Add clear-field to clear button
    const clear = document.getElementById(`clear_${fieldId}`)
    clear.addEventListener('click', () => {
        value.innerHTML = '';
        pre.innerHTML = JSON.parse('{"a":"' + FieldIdToDefPre[fieldId] + '"}').a;
        suf.innerHTML = JSON.parse('{"a":"' + FieldIdToDefSuf[fieldId] + '"}').a;
        field['v'] = '';
        field['p'] = JSON.parse('{"a":"' + FieldIdToDefPre[fieldId] + '"}').a;
        field['s'] = JSON.parse('{"a":"' + FieldIdToDefSuf[fieldId] + '"}').a;
        updateEvidenceResult();
    })
}

export function updateFieldContainer(field) {
    /*
    Exclude, mark text size styles from data for field container of given field
    Requires: field container to already be loaded in document & listeners for this container already added
     */
    const fieldId = field['fieldId'];

    const size10pt = document.getElementById(`size10pt_${fieldId}`);
    const size12pt = document.getElementById(`size12pt_${fieldId}`);
    const underline = document.getElementById(`underline_${fieldId}`);
    const italicize = document.getElementById(`italicize_${fieldId}`);
    const bold = document.getElementById(`bold_${fieldId}`);
    const exclude = document.getElementById(`exclude_${fieldId}`);

    if (field["z"] === 10) { size10pt.onclick(null); } else {  size12pt.onclick(null); }
    if (field["u"]) { underline.onclick(null); }
    if (field["i"]) { italicize.onclick(null); }
    if (field["b"]) { bold.onclick(null); }
    if (field["e"]) { exclude.onclick(null); }
}
