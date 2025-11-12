export const AboutContent = `
<div style="margin: 0; width: 100%; max-width: 100%; justify-content: center; align-items: center; text-align: center; 
color: white;
height: 100%;
overflow: hidden;">         
    <br><br><br>
 
    <h2 style="font-size: 37px; margin: 0">The Autoevidencer</h2>
    <h4 style="margin: 7px; font-size: 27px;">Version 4.0</h4><br>
    <p style="font-size: 20px">
        Paste evidence straight into the Autoevidencer for immediate clean and consistent cards.
        
        <br><br>
        
        <div style="font-size: 17px">
        Click "New Tab" in the bottom left to get started.
        </div>
    </p> 
    
    <br>
    
    <div style="font-size: 70px">†</div>
    
    <br>
    
    <p style="font-size: 13px; margin-bottom: 0">🍪 We use cookies to save Tabs across sessions.  Blocking cookies retains tool functionality but blocks this feature.</p>
    
    <br><br>
    
    <div style="display: flex; justify-content: center">
    <div style="display: grid; grid-template-columns: 1fr 2fr; width: 70%">
    
        <div style="font-size: 12px;">
            <h3 style="margin-bottom: 0">About the Builder</h3><br>
            <div>
                Personal website: <a style="color: white;" href="https://alxv07.github.io/AboutMe/">https://alxv07.github.io/AboutMe/</a>
                <br><br>
                Contact: <a style="color: white" href="mailto:alexander.kai.chen@gmail.com">alexander.kai.chen@gmail.com</a> 
            </div>
            
            <br>
            
            <div style="font-weight: bold"">Debate History</div>
            NCFCA Team Policy - Sts. Peter & Paul Speech & Debate<br>
                <li>Chen/Kuykendall, R11, 23-24</li>
                <li>Chen/O'Connors, R11, 24-25</li>
            Coolidge 1v1 Debate - Independent Competitor<br>
                <li>Alexander Chen, 25-26</li>
            <br>
            
            <h3 style="margin-bottom: 0">Settings</h3><br>
            <div style="">
            <div style="display: flex; justify-content: center; align-items: center">
                <div style="display: flex; justify-content: center; flex-direction: row; align-items: center">
                    <div style="margin-right: 10px; font-size: 12px">Color Theme</div><div style="border: 1px solid white" class="color-circle" id="circle"></div><input type="color" id="colorPicker">
                </div>
            </div>
            </div>
       </div>
        
       <div style="font-size: 12px;">
            <h3 style="margin-bottom: 0">Change Log</h3>
            <ul style="text-align: left; display: inline-block;">
                <p><strong>11/12/2025 | 4.0:</strong> added quick-exclude buttons; randomized-init color theme replaced with default grey; home page update; fixed auto-publisher-from-link not setting content</p>
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
    </div>
</div>
`;

