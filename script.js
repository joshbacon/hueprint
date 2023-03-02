
let canvasWidth = 750;
let canvasHeight = 375;
let canvasSection = canvasWidth / 5;

let clr1 = [62 , 133, 154];
let clr2 = [67 , 181, 159];
let clr3 = [244, 200, 128];
let clr4 = [229, 121, 61 ];
let clr5 = [227, 89 , 72 ];


// Grab color palette and draw on canvas
let generateModel = function() {

    // Request a palette
    let url = "http://colormind.io/api/";
    let data = { model : "default" }
    
    let http = new XMLHttpRequest();
    
    http.open("POST", url, true);
    http.send(JSON.stringify(data));

    http.onreadystatechange = function() {
        // When we get a palette
        if( http.readyState == 4 && http.status == 200 ) {
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


            // // Display it in the canvas
            // let ctx = grabCanvasContext();

            // // Draw the color rectangles
            // ctx.fillStyle = `rgb(${clr1[0]}, ${clr1[1]}, ${clr1[2]})`;
            // ctx.fillRect(canvasSection * 0, 0, canvasSection * 1, canvasHeight);
            // ctx.fillStyle = `rgb(${clr2[0]}, ${clr2[1]}, ${clr2[2]})`;
            // ctx.fillRect(canvasSection * 1, 0, canvasSection * 2, canvasHeight);
            // ctx.fillStyle = `rgb(${clr3[0]}, ${clr3[1]}, ${clr3[2]})`;
            // ctx.fillRect(canvasSection * 2, 0, canvasSection * 3, canvasHeight);
            // ctx.fillStyle = `rgb(${clr4[0]}, ${clr4[1]}, ${clr4[2]})`;
            // ctx.fillRect(canvasSection * 3, 0, canvasSection * 4, canvasHeight);
            // ctx.fillStyle = `rgb(${clr5[0]}, ${clr5[1]}, ${clr5[2]})`;
            // ctx.fillRect(canvasSection * 4, 0, canvasSection * 5, canvasHeight);
            
            // // Write in the rgb values
            // ctx.fillStyle = "black";
            // ctx.textAlign = "center";
            // ctx.font = "13px Comic Sans MS";
            // ctx.fillText(`rgb(${clr1[0]},${clr1[1]},${clr1[2]})`, (canvasSection *0) + canvasSection/2, canvasHeight - 20);
            // ctx.fillText(`rgb(${clr2[0]},${clr2[1]},${clr2[2]})`, (canvasSection *1) + canvasSection/2, canvasHeight - 20);
            // ctx.fillText(`rgb(${clr3[0]},${clr3[1]},${clr3[2]})`, (canvasSection *2) + canvasSection/2, canvasHeight - 20);
            // ctx.fillText(`rgb(${clr4[0]},${clr4[1]},${clr4[2]})`, (canvasSection *3) + canvasSection/2, canvasHeight - 20);
            // ctx.fillText(`rgb(${clr5[0]},${clr5[1]},${clr5[2]})`, (canvasSection *4) + canvasSection/2, canvasHeight - 20);

            // document.body.appendChild(canvas);

            // let exampleText = document.createElement('p');
            // exampleText.innerHTML = "Example Text";
            // exampleText.classList.add('exampleText');
            // document.body.appendChild(exampleText);
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


// make a section that gets regenerated,
// then you don't have to check each template/example element

// it will have the palette canvas
// example text
// some example buttons
// idk think of some other stuff

// maybe just the palette and a moc window with example stuff?