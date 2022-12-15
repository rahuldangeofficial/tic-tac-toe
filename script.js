"use strict"; 

const ele0=document.getElementById('ele0');
const ele1=document.getElementById('ele1');
const ele2=document.getElementById('ele2');
const ele3=document.getElementById('ele3');
const ele4=document.getElementById('ele4');
const ele5=document.getElementById('ele5');
const ele6=document.getElementById('ele6');
const ele7=document.getElementById('ele7');
const ele8=document.getElementById('ele8');
const displayStatus=document.getElementById('display-status');

let executionSwitch=true;       
let winCoordinates=['','','']; 
let charWon;
let moveTracker=0;

//"gameBoard" module using IIFE

const gameBoard=(function(){
    let state=['','','','','','','','',''];
    function renderState(){
        ele0.innerHTML=state[0];
        ele1.innerHTML=state[1];
        ele2.innerHTML=state[2];
        ele3.innerHTML=state[3];
        ele4.innerHTML=state[4];
        ele5.innerHTML=state[5];
        ele6.innerHTML=state[6];
        ele7.innerHTML=state[7];
        ele8.innerHTML=state[8];
    }
    function modifyState(index,value){
        if(state[index]===''){
            state[index]=value;
        }
        renderState();
        winTracker();
    }
    function patternIdentifier(x,y,z){
        if(state[x]===''){}else{ 
            if(state[x]===state[y]&&state[y]===state[z]){
                charWon=state[x];
                winCoordinates[0]=x;
                winCoordinates[1]=y;
                winCoordinates[2]=z;
            }
        }
    }
    function winTracker(){
        let arr=[0,1,2,3,4,5,6,7,8,0,3,6,1,4,7,2,5,8,0,4,8,2,4,6];
        let x=0;
        for(let i=0;i<8;i++){
            patternIdentifier(arr[x],arr[x+1],arr[x+2]);
            x+=3;
        }
        if(charWon==='O'||charWon==='X'){  
            executionSwitch=false;
            eval(`ele${winCoordinates[0]}.style.color="chartreuse";`);
            eval(`ele${winCoordinates[1]}.style.color="chartreuse";`);
            eval(`ele${winCoordinates[2]}.style.color="chartreuse";`);
            displayStatus.innerHTML=`Player ${charWon} has won!`;
        }
    }
    function clearState(){
        for(let i=0;i<state.length;i++){
            state[i]='';
        }
    }
    return {
        renderState,
        modifyState,
        winTracker,
        clearState
    }
})();

//"player" as factory function

function player(x){
    let value=x;
    function move(index){
        gameBoard.modifyState(index,value);
    }
    return {move};
}

//instances of factory function

let playerOne=player('O');   
let playerTwo=player('X');

function play(index){
    if(executionSwitch){
        if(moveTracker%2==0){
            playerOne.move(index);
            if(executionSwitch){
                displayStatus.innerHTML="Player X's Turn";
            }
        }else{
            playerTwo.move(index);
            if(executionSwitch){
                displayStatus.innerHTML="Player O's Turn";
            }
        }
        moveTracker++;
    }
}
function clearWin(){
    if(charWon===undefined){}else{
        eval(`ele${winCoordinates[0]}.style.color="rgba(255, 255, 255, 0.959)";`);
        eval(`ele${winCoordinates[1]}.style.color="rgba(255, 255, 255, 0.959)";`);
        eval(`ele${winCoordinates[2]}.style.color="rgba(255, 255, 255, 0.959)";`);
        winCoordinates=['','',''];
        charWon=undefined;
    }
}
function resetGame(){
    executionSwitch=true;
    moveTracker=0;
    displayStatus.innerHTML="Player O's Turn";
    clearWin();
    gameBoard.clearState();
    gameBoard.renderState();
}




