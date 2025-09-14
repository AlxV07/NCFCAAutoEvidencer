export const AboutContent = `
<div style="margin: 0; width: 100%; max-width: 100%; justify-content: center; align-items: center; text-align: center; 
color: white;
height: 100%;
overflow: hidden;
 ">
    <p style="font-size: 13px; margin-bottom: 0">
        🍪 The Autoevidencer uses cookies only to save evidence locally across sessions.  Blocking cookies blocks this feature but does not break overall functionality.  Do not rely on this feature to store important evidence.<br><br>
    </p>
    <div style="display: flex; justify-content: center; align-items: center">
        <div style="display: flex; justify-content: center; flex-direction: row; align-items: center">
            <div style="margin-right: 10px; font-size: 12px">Set Color Theme (opens color picker, enter / esc to close):</div>
            <div class="color-circle" id="circle"></div>
            <input type="color" id="colorPicker">
        </div>
    </div>
    <br> 
    <br>
    <br>
    
    <h2 style="font-size: 37px; margin: 0">The Autoevidencer</h2>
    <div style="font-size: 10px; margin: 7px 7px 0;">(previously known as "NCFCAAutoEvidencer")</div>
    <h4 style="margin: 7px; font-size: 27px;">Version 3.3</h4><br>
    <p style="font-size: 20px">
        A tool for efficient evidence formatting.
        
        <br><br>
        
        Paste from sources right into the Autoevidencer to build clean, consistent cards.
        
        <br><br>
        
        Shine with polished and professional display.
    </p>
   

    
    <div style="font-size: 70px">
    †
    </div>

    <p>
    <div style="font-size: 12px">
     <div>Suggestions, comments, or feedback of any kind is appreciated!</div><br>
     <div>
        Built By: <a href="mailto:alexander.kai.chen@gmail.com">alexander.kai.chen@gmail.com</a> | About Me: <a href="https://alxv07.github.io/AboutMe/">https://alxv07.github.io/AboutMe/</a><br>
     </div>
     <br>
     Chen/Kuykendall | Region 11, 2023-2024 | Sts. Peter & Paul Speech & Debate<br>
     Chen/O'Connors | Region 11, 2024-2025 | Sts. Peter & Paul Speech & Debate<br>
     <br>
    </div>
    <div style="font-size: 10px">
        <h3 style="margin-bottom: 0">Change Log</h3>
        <ul style="text-align: left; display: inline-block; width: 50%">
            <p><strong>09/13/2025 | 3.3:</strong> removed unused "Settings" tab, discontinued unused color themes; updated overall theme to sleeker gradient; cleaned home page</p>
            <p><strong>03/31/2025 | 3.2:</strong> added collapsible window for field customization to make UI less cluttered (thanks Liam O'Connors & Therese Pammit for pointing out *ahem*); renamed "Auto Evidencer" to "Autoevidencer"</p>
            <p><strong>03/16/2025 | 3.14159:</strong> 
               major update: 
               formatting from source stripped first before displaying text content in input fields;
               field-up/down buttons enable customizable field ordering;
               10/12pt font size & bold+underline+italic options for fields;
               pre/suf-fix customization implemented;
               cookies actually fixed now and transition to JSON completed
             </p>
            <p><strong>03/09/2025 | 3.1415:</strong> bug fix: fixed cookie operations to not conflict and override analytics; evidencer data should no longer be periodically deleted</p>
            <p><strong>03/07/2025 | 3.141:</strong> bug fix: fixed field-exclude button breaking tab; organized citation completion data</p>
            <p><strong>03/07/2025 | 3.14:</strong> *Aesthetic Update* - "About" page style updated; basic color themes implemented: control panel in Settings</p>
            <p><strong>03/06/2025 | 3.1.4.1:</strong> added public change log to "About" page; added "Team" input field to auto-evidencer (thanks Lewis/Singh for suggestion).</p>
        </ul>
    </div>
</div>
`;

