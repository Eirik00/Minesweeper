let gridPlace = document.getElementById("gamewindow");
let gridH = document.getElementById("gHeight");
let gridW = document.getElementById("gWidth");
let gridBomb = document.getElementById("gbombs");
let lost = 1;

function gameInit() {
    console.log(gridPlace.childNodes.length);
    for(let i=0;i<gridPlace.childNodes.length;i++){
        gridPlace.childNodes[0].remove();
    }    
    let gridAmmount = gridH.value*gridW.value;
    let gridAuto = "";
    for(let i=0;i<gridW.value;i++){
        gridAuto = "32px "+gridAuto;
    }
    gridPlace.style = "grid-template-columns: "+gridAuto;
    let curColum = 1;
    let curLine = 1;
    for(let i=0;i<gridAmmount;i++){
        let nw = document.createElement("div");
        nw.setAttribute("id", curLine+","+curColum);
        nw.setAttribute("class", "grid-item");
        nw.onclick = function() {
            let Cnumbr = this.childNodes[0];
            if(Cnumbr.style.visibility != "visible"){
                Cnumbr.style.visibility = "visible";
                let nw = document.createElement("img");
                if(Cnumbr.innerHTML == "B"){
                    nw.src="img/explosion.png";
                    nw.style.display = "inline-block";
                    Cnumbr.style.display = "none";
                }
                this.appendChild(nw);
            }
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
    
    let bombAmmount = gridBomb.value/100;
    let totalsq = gridW.value*gridH.value;
    let usedClass = [];
    let numBmb = Math.floor(bombAmmount*totalsq);
    let currbmb = 0;
    for(let i=0;i<numBmb;i++){
        let x = 1+Math.floor(Math.random()*(gridH.value-1));
        let y = 1+Math.floor(Math.random()*(gridW.value-1));
        let divClass = x+","+y;

        if(!usedClass.includes(divClass)){
            let bd = document.getElementById(divClass);
            bd.className = "bombers";
            document.getElementById(divClass).childNodes[0].innerHTML = "B";
            usedClass.push(divClass);
            
            
            let nw = document.createElement("div");
            nw.innerHTML = x+" "+y;
            nw.style.display = "none";
            bd.appendChild(nw);
            currbmb++;
        }else{numBmb++;}
    }
    for(let i=0;i<currbmb;i++){
        let curVal = document.getElementsByClassName("bombers")[i].childNodes[1].innerHTML;
        let x = curVal.split(" ")[0];
        let y = curVal.split(" ")[1];
        console.log("x:"+x+"|y:"+y);
        
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
        if(up>0 && right<gridW.value+1){
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
        if(right<gridW.value+1){
            let squAr = document.getElementById(vmid+","+right);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //DL
        if(down<gridH.value+1 && left>0){
            let squAr = document.getElementById(down+","+left);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //DM
        if(down<gridH.value+1){
            let squAr = document.getElementById(down+","+y);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
        //DR
        if(down<gridH.value+1 && right<gridW.value+1){
            let squAr = document.getElementById(down+","+right);
            let squAre = squAr.childNodes[0];
            let namE = squAr.className;
            if(namE == "grid-item"){
                squAre.innerHTML = parseInt(squAre.innerHTML) + 1;
            }
        }
    }
    console.log(usedClass);
    console.log(bombAmmount*totalsq);
}
document.getElementById("startGen").onclick = gameInit;
gameInit();