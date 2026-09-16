export const AboutContent = `
<div class="home-page" style="margin: 0; width: 100%; max-width: 100%; justify-content: center; align-items: center; text-align: center;
color: #f8fafc;
height: 100%;
overflow: hidden;">         
    <div class="home-hero">
 
    <h2 style="font-size: 37px; margin: 0">The Autoevidencer</h2>
    <h4 style="margin: 7px; font-size: 27px;">Version 5.0</h4><br>
    <p class="home-lead">
        Paste evidence straight into the Autoevidencer for immediate clean and consistent cards.
        
        <br><br>
        
        <div style="font-size: 17px">
        Click "New Tab" in the bottom left to get started.
        </div>
    </p>
    <div class="home-cross" aria-hidden="true">†</div>
    <section class="verse-of-the-day" aria-live="polite">
        <div class="verse-reference"></div>
        <p class="verse-text"></p>
    </section>
    </div>
    
    <div class="home-grid">
    
        <div class="home-panel builder-panel">
            <h3>About the Builder</h3>

						<h4 class="builder-label">Connect with me! :D</h4>
            <div class="builder-contact">
                <a href="https://alxv07.github.io/">https://alxv07.github.io</a>
								<a href="mailto:alexander.kai.chen@gmail.com">alexander.kai.chen@gmail.com</a>
            </div>

            <div class="builder-history">
                <h4>My Debate History:</h4>
                <div class="builder-entry">
                    <strong>NCFCA Team Policy</strong>
                    <span>Sts. Peter &amp; Paul Speech &amp; Debate</span>
                    <ul>
                        <li>Chen/Kuykendall <em>R11, 23–24</em></li>
                        <li>Chen/O'Connors <em>R11, 24–25</em></li>
                    </ul>
                </div>
                <div class="builder-entry">
                    <strong>Calvin Coolidge Presidential Foundation</strong>
                    <span>Coolidge Cup qualifying debater</span>
                    <ul>
                        <li>Alexander Chen <em>25–26</em></li>
                    </ul>
                </div>
            </div>

						<br>

						<div style="font-size: 11px;">
							Why use random numbers for tab naming? Honestly no clue why I did years ago when I first built this thing lol (psst, back then we didn't have AI... I know, crazy right? Coding by hand... good ol' days :_) ). Well, want me to change it?  Maybe if you ask, I might ;)
						</div>
       </div>
        
       <div class="home-panel" style="font-size: 12px;">
            <h3 style="margin-bottom: 0">Change Log</h3>
            <ul style="text-align: left; display: inline-block;">
                <p><strong><span style="color: #60a5fa;">09/15/2026</span> | 5.0:</strong> added Tags to evidence cards; cleaner home, label clarifications, smoother buttons; Bible verse cycle; solarized interface themes, dark/light mode toggle button in top right (learn about Solarized! <a href="https://en.wikipedia.org/wiki/Solarized">https://en.wikipedia.org/wiki/Solarized</a>)</p>
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
    <div class="home-meta">🍪 Cookies save your tabs and theme preference. By using this site, you agree to the <a href="/privacypolicy.txt" class="footer-link">Privacy Policy</a>.</div>
</div>
`;
