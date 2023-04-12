
let canvasWidth = 750;
let canvasHeight = 375;
let canvasSection = canvasWidth / 5;

let clr1 = [62 , 133, 154];
let clr2 = [67 , 181, 159];
let clr3 = [244, 200, 128];
let clr4 = [229, 121, 61 ];
let clr5 = [227, 89 , 72 ];

let styles = [
    './templates/template1.html',
    './templates/template2.html',
    './templates/template3.html',
];

let paletteHTML = `<div class="palette">
    <div class="colors">
        <span id="clr1" onclick="copyValue('clr1')">rgb(62,133,154)</span>
        <span id="clr2" onclick="copyValue('clr2')">rgb(67,181,159)</span>
        <span id="clr3" onclick="copyValue('clr3')">rgb(244,200,128)</span>
        <span id="clr4" onclick="copyValue('clr4')">rgb(229,121,61)</span>
        <span id="clr5" onclick="copyValue('clr5')">rgb(227,89,72)</span>
    </div>
</div>`;


// Grab color palette and draw on canvas
let generateModel = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", styles[Math.floor(Math.random() * styles.length)], true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        document.getElementById("template").innerHTML = paletteHTML;
        document.getElementById("template").innerHTML += this.responseText;
    }

    // Request a palette
    let url = "http://colormind.io/api/";
    let data = { model : "default" }
    
    let http = new XMLHttpRequest();
    
    http.open("POST", url, true);
    http.send(JSON.stringify(data));

    // When we get a palette
    http.onreadystatechange = function() {
        if( http.readyState == 4 && http.status == 200 ) {
            if (document.getElementById('btnText').innerHTML !== "Regenerate") updateButton();
            
            palette = JSON.parse(http.responseText).result;
            clr1 = palette[0];
            clr2 = palette[1];
            clr3 = palette[2];
            clr4 = palette[3];
            clr5 = palette[4];

            let root = document.querySelector(':root');
            
            let value = `rgb(${clr1[0]},${clr1[1]},${clr1[2]})`;
            root.style.setProperty('--clr1', value);
            let clr = document.getElementById("clr1");
            clr.innerHTML = value;

            value = `rgb(${clr2[0]},${clr2[1]},${clr2[2]})`;
            root.style.setProperty('--clr2', value);
            clr = document.getElementById("clr2");
            clr.innerHTML = value;

            value = `rgb(${clr3[0]},${clr3[1]},${clr3[2]})`;
            root.style.setProperty('--clr3', value);
            clr = document.getElementById("clr3");
            clr.innerHTML = value;

            value = `rgb(${clr4[0]},${clr4[1]},${clr4[2]})`;
            root.style.setProperty('--clr4', value);
            clr = document.getElementById("clr4");
            clr.innerHTML = value;

            value = `rgb(${clr5[0]},${clr5[1]},${clr5[2]})`;
            root.style.setProperty('--clr5', value);
            clr = document.getElementById("clr5");
            clr.innerHTML = value;

        }
    }

}

// Return the existing canvas if one exists
// otherwise create a new one and return it
function grabCanvasContext() {
    try {
        return document.getElementById("palette").getContext("2d");
    } catch (e) {
        canvas = document.createElement("canvas");
        canvas.id = "palette";
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        return canvas.getContext("2d");
    }
}

function copyValue(clr) {
    // copy value to clipboard
    let copyText = document.getElementById(clr).textContent;
    navigator.clipboard.writeText(copyText);
    // run confirm animation
    let confirm = document.getElementById("confirmCopy");
    confirm.classList.add('confirm');
    setTimeout(function() {
        confirm.classList.remove('confirm');
    }, 1500);
}

function updateButton() {
    console.log('updating button');
    text = document.getElementById('btnText');
    text.innerHTML = "Regenerate";
    button = document.getElementById('generateBtn');
    button.style.setProperty('position', 'absolute');
    button.style.setProperty('top', '75px');
    button.style.setProperty('left', '50px');
}