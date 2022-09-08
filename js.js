let gridPlace = document.getElementById("gamewindow");
let gridH = document.getElementById("gHeight");
let gridW = document.getElementById("gWidth");
let gridBomb = document.getElementById("gbombs");
let makeBombQ = 0;
let usedClass = [];
let howManyBombs = 0;
let numbmb = 0;
let cantplay = 0;
let gridSize = 0;
let gridAuto = "";

function gameInit() {
    if(gridW.value > 40){
        gridW.value = 40;
    }
    let gridAmmount = gridH.value*gridW.value;
    for(let i=0;i<gridW.value;i++){
        gridAuto = "36px "+gridAuto;
        gridSize = gridSize+36;
    }
    gridPlace.style = "grid-template-columns: "+gridAuto+";width: "+gridSize+"px";
    let curColum = 1;
    let curLine = 1;
    for(let i=0;i<gridAmmount;i++){
        let nw = document.createElement("div");
        nw.setAttribute("id", curLine+","+curColum);
        nw.setAttribute("class", "grid-item");
        nw.onclick = function() {
            if(makeBombQ == 0){genBombs(this.id);}
            if(cantplay == 1){return;}
            makeBombQ = 1;
            let Cnumbr = this.childNodes[0];
            if(Cnumbr.style.visibility != "visible"){
                makeVisible(Cnumbr, this);
                checkPlay();
                return;
            }
        }
        nw.oncontextmenu = function() {
            if(makeBombQ == 0){return false;}
            if(cantplay == 1){return false;}
            let Cnumbr = this.childNodes[0];
            if(Cnumbr.style.visibility != "visible"){
                if(howManyBombs <= 0){return false;}
                Cnumbr.style.visibility = "visible";
                let nw = document.createElement("img");
                nw.src = "img/flag.png";
                this.appendChild(nw);
                if(howManyBombs == 1){
                    let correctFlag = 0;
                    for(let i=0;i<usedClass.length;i++){
                        if(document.getElementById(usedClass[i]).childNodes.length == 2){    
                            let cx = document.getElementById(usedClass[i]).childNodes[1];
                            if(cx.src.endsWith("flag.png")){
                                correctFlag++;
                            }
                        }
                    }
                    if(correctFlag == usedClass.length){
                        document.getElementById("win").style.display = "block";
                        cantplay = 1;
                    }else{
                        howManyBombs--;
                        document.getElementById("leftBmbs").innerHTML = "Bombs Left: "+howManyBombs;
                        return;
                    }
                }
                howManyBombs--;
                document.getElementById("leftBmbs").innerHTML = "Bombs Left: "+howManyBombs;
            }else if(Cnumbr.style.visibility == "visible"){
                if(this.childNodes[1].src.endsWith("flag.png")){  
                    this.childNodes[1].remove();
                    Cnumbr.style.visibility = "hidden";
                    howManyBombs++;
                    document.getElementById("leftBmbs").innerHTML = "Bombs Left: "+howManyBombs;
                }else{
                    return false;
                }
            }
            return false;
        }
        gridPlace.appendChild(nw);
        nw = document.createElement("p");
        nw.className = "closeBomb";
        nw.innerHTML = 0;
        document.getElementById(curLine+","+curColum).appendChild(nw);
        curColum++;
        if((i+1) == gridW.value*(curLine)){
            curLine = curLine + 1;
            curColum = 1;
        }
    }
    let totalsq = gridW.value*gridH.value;
    let bombAmmount = gridBomb.value/100;
    numBmb = Math.floor(bombAmmount*totalsq);
    howManyBombs = numBmb;
    document.getElementById("leftBmbs").innerHTML = "Bombs Left: "+howManyBombs;
}

function genBombs(cBmb){
    usedClass.push(cBmb);
    let currbmb = 0;
    
    for(let i=0;i<numBmb;i++){
        let x = 1+Math.floor(Math.random()*(gridH.value));
        let y = 1+Math.floor(Math.random()*(gridW.value));
        let divClass = x+","+y;

        if(!usedClass.includes(divClass)){
            let bd = document.getElementById(divClass);
            bd.className = "bombers";
            document.getElementById(divClass).childNodes[0].innerHTML = "B";
            usedClass.push(divClass);
            currbmb++;
        }else{numBmb++;}
    }
    usedClass.shift();
    for(let i=0;i<currbmb;i++){
        let curVal = usedClass[i];
        let x = curVal.split(",")[0];
        let y = curVal.split(",")[1];
        
        let up = parseInt(x)-1;
        let vmid = parseInt(x);
        let down = parseInt(x)+1;
        let left = parseInt(y)-1;
        let hmid = parseInt(y);
        let right = parseInt(y)+1;
        //UL
        if(up>0 && left>0){
            let squAr = document.getElementById(up+","+left);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //UM
        if(up>0){
            let squAr = document.getElementById(up+","+y);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //UR
        if(up>0 && right<parseInt(gridW.value)+1){
            let squAr = document.getElementById(up+","+right);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //ML
        if(left>0){
            let squAr = document.getElementById(vmid+","+left);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //MR
        if(right<parseInt(gridW.value)+1){
            let squAr = document.getElementById(vmid+","+right);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //DL
        if(down<parseInt(gridH.value)+1 && left>0){
            let squAr = document.getElementById(down+","+left);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //DM
        if(down<parseInt(gridH.value)+1){
            let squAr = document.getElementById(down+","+y);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //DR
        if(down<parseInt(gridH.value)+1 && right<parseInt(gridW.value)+1){
            let squAr = document.getElementById(down+","+right);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
    }
}
function checkPlay(){
    if(cantplay == 1){
        document.getElementById("failed").style.display = "block";

    }else{
        document.getElementById("failed").style.display = "none";
    }
}
function removeGrids() {
    var gridItems = document.getElementById("gamewindow").childNodes;
    let gridLength = gridItems.length;
    for(let i=0;i<gridLength;i++){
        gridItems[0].remove();
    }
}
function makeVisible(Cnumbr, tile) {
    Cnumbr.style.visibility = "visible";
    tile.setAttribute("class", "shownSquare");
    let nw = document.createElement("img");
    if(Cnumbr.innerHTML == "B"){
        let bombs = document.getElementsByClassName("bombers");
        for(let i=0;i<bombs.length;i++){
            let nw = document.createElement("img");
            nw.src="img/explosion.png";
            bombs[i].appendChild(nw);
        }
        nw.src="img/explosion.png";
        cantplay = 1;
    }else if(Cnumbr.innerHTML == "0"){
        nw.src="img/0.png";
        emptyZero(Cnumbr);
    }else{
        nw.src="img/"+Cnumbr.innerHTML+".png";
    }
    tile.appendChild(nw);
}
function emptyZero(Cnumbr) {
    let curVal = Cnumbr.parentElement.id;
    let x = curVal.split(",")[0];
    let y = curVal.split(",")[1];
    
    let up = parseInt(x)-1;
    let vmid = parseInt(x);
    let down = parseInt(x)+1;
    let left = parseInt(y)-1;
    let hmid = parseInt(y);
    let right = parseInt(y)+1;
    //UL
    if(up>0 && left>0){
        let squAr = document.getElementById(up+","+left);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
    //UM
    if(up>0){
        let squAr = document.getElementById(up+","+y);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
    //UR
    if(up>0 && right<=gridW.value){
        let squAr = document.getElementById(up+","+right);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
    //ML
    if(left>0){
        let squAr = document.getElementById(vmid+","+left);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
    //MR
    if(right<=gridW.value){
        let squAr = document.getElementById(vmid+","+right);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
    //DL
    if(down<=gridH.value && left>0){
        let squAr = document.getElementById(down+","+left);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
    //DM
    if(down<=gridH.value){
        let squAr = document.getElementById(down+","+y);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
    //DR
    if(down<=gridH.value && right<=gridW.value){
        let squAr = document.getElementById(down+","+right);
        let squAre = squAr.childNodes[0];
        if(squAre.style.visibility != "visible"){
            makeVisible(squAre, squAr);
        }
    }
}

function Gamerestart(){
    removeGrids();
    cantplay = 0;
    howManyBombs = 0;
    gridPlace = document.getElementById("gamewindow");
    gridH = document.getElementById("gHeight");
    gridW = document.getElementById("gWidth");
    gridBomb = document.getElementById("gbombs");
    makeBombQ = 0;
    usedClass = [];
    howManyBombs = 0;
    numbmb = 0;
    cantplay = 0;
    gridAuto = "";
    gridSize = 0;
    gridPlace.style = "";
    
    document.getElementById("leftBmbs").innerHTML = "Bombs Left: "+howManyBombs;
    document.getElementById("startGen").style.display = "block";
    document.getElementById("failed").style.display = "none";
    document.getElementById("win").style.display = "none";
}
document.getElementById("startGen").onclick = function() {
    this.style.display = "none";
    cantplay = 0;
    gameInit();
}
function tuto(n) {
    if(n==1){
        document.getElementById("dark").style.display = "block";
        document.getElementById("tutorial").style.display = "block";
    }else{
        document.getElementById("dark").style.display = "none";
        document.getElementById("tutorial").style.display = "none";
    }
}