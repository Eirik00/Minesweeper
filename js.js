let gridPlace = document.getElementById("gamewindow");
let gridH = document.getElementById("gHeight");
let gridW = document.getElementById("gWidth");
let gridBomb = document.getElementById("gbombs");

function gameInit() {
    let gridAmmount = gridH.value*gridW.value;
    let gridAuto = "";
    for(let i=0;i<gridW.value;i++){
        gridAuto = "auto "+gridAuto;
    }
    gridPlace.style = "grid-template-columns: "+gridAuto;
    let curColum = 1;
    let curLine = 1;
    for(let i=0;i<gridAmmount;i++){
        let nw = document.createElement("div");
        nw.innerHTML = curLine+","+curColum;
        nw.setAttribute("id", curLine+","+curColum);
        nw.setAttribute("class", "grid-item");
        gridPlace.appendChild(nw);
        curColum++;
        if((i+1) == gridW.value*(curLine)){
            curLine = curLine + 1;
            curColum = 1;
        }
        console.log(gridW.value)
    }
    console.log("hey");
    
    let bombAmmount = gridBomb.value/100;
    let totalsq = gridW.value*gridH.value;
    for(let i=0;i<bombAmmount*totalsq;i++){
        let x = Math.round(Math.random()*gridH.value);
        let y = Math.round(Math.random()*gridW.value)+1;
        let divClass = x+","+y;
        let usedClass = [];
        console.log(divClass);
        if(!usedClass.includes(divClass)){
            document.getElementById(divClass).setAttribute("class", "bomb");
            console.log(document.getElementById(divClass));
        }
    }
}
document.getElementById("startGen").onclick = gameInit;