export const SettingsContent = `
<div style="max-width: 100%; justify-content: center; align-items: center; text-align: center;">

<h2>Settings</h2> <br>

<strong>Auto-Citation Controls: (To be implemented soon.)</strong><br><br>
Will include:<br>
<ul style="text-align: left; display: inline-block;">
    -Customize prefixes e.g. "According to...", "Written by...", etc.<br>
    -Choose what you want bolded, underlined, and italicized.<br>
    -Select font sizes (10 or 12 pt) for personalized citations.<br>
    -Potentially: Log in with your Google Account to save preferences & citations.<br>
</ul>
<br>

<strong>Select Color Theme:</strong><br><br>
More advanced configurations coming later; for now, here are some default themes:<br><br>
<div style="display: flex; justify-content: center; gap: 10px;">
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #444444;"></div>
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #d00000;"></div>
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #d38400;"></div>
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #ffff72;"></div>
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #00a800;"></div>
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #0000a1;"></div>
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #390060;"></div>
    <div class="color-circle" style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background-color: #ffc6ff;"></div>
</div><br>

</div>
`;

export const AboutContent = `
<div style="max-width: 100%; justify-content: center; align-items: center; text-align: center;">
    <br>
    
    <h2>NCFCAAutoEvidencer | Version: 3.14</h2>
    <strong>a.k.a. "The Auto Evidencer"</strong><br><br>
    <p style="font-size: 20px">
        A tool for fast evidence formatting - copy-and-paste straight from sources into the Auto Evidencer to:
        <ul style="text-align: left; display: inline-block; font-size: 16px; margin-top: 0">
            <li>automatically clean up irregular, colorful text from sources into plain Times New Roman.</li>
            <li>automatically format citations with proper (parentheses), [“]quotes[”], and font size.</li>
            <li>automatically fix all your weird spacing problems :)</li>
            <li>automatically provide credentials for well known sources.</li>
            <li>automatically work on and save multiple pieces of evidence in separate tabs.</li>
            <li>automatically do your work in a fancy little student-made application :D</li>
        </ul><br>
    </p>

    <p style="font-size: 16px">
        🍪 NCFCAAutoEvidencer uses cookies to, and only to, save evidence in-browser across sessions. Blocking cookies blocks this feature.<br><br>
    </p>

    <p>
    <strong style="font-size: 20px">Any suggestions, comments, or feedback is appreciated!</strong><br><br>
    Contact: <a href="mailto:alexander.kai.chen@gmail.com">alexander.kai.chen@gmail.com |  <a href="https://alxv07.github.io/AboutMe/">https://alxv07.github.io/AboutMe/</a><br>
    Chen/Kuykendall | Region 11, 2023-2024 | Sts. Peter & Paul Speech & Debate<br>
    Chen/O'Connors | Region 11, 2024-2025 | Sts. Peter & Paul Speech & Debate<br>
    </strong><br>

    <h3 style="margin-bottom: 0">Change Log</h3>
    <ul style="text-align: left; display: inline-block">
        <p><strong>03/07/2025 | 3.14:</strong> *Aesthetic Update* - "About" page style updated, basic color themes implemented: control panel in Settings</p>
        <p><strong>03/06/2025 | 3.1.4.1:</strong> added public change log to "About" page; added "Team" input field to auto-evidencer (thanks Lewis/Singh for suggestion).</p>
    </ul>
</div>
`;

