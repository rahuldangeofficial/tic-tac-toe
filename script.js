"use strict"; //to prevent unpredictable behavior
//--------------------------//

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

//--------------------------//

let executionSwitch=true;       //to prevent unnecessary execution
let winCoordinates=['','',''];  //to show win coordinates

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
        endStatus();
        winTracker();
    }
    function endStatus(){             //not used but kept for future updates
        let flag=true;
        for(let i=0;i<state.length;i++){
            if(state[i]===''){
                flag=false;
            }
        }
        if(flag){
            console.log("ended!");
        }
        
    }
    function winTracker(){
        let charWon;
        
        let row1=state[0]===state[1]&&state[1]==state[2];
        if(row1){
            charWon=state[0];
            winCoordinates[0]=0;
            winCoordinates[1]=1;
            winCoordinates[2]=2;
        };
        
        let row2=state[3]===state[4]&&state[4]==state[5];
        if(row2){
            charWon=state[3];
            winCoordinates[0]=3;
            winCoordinates[1]=4;
            winCoordinates[2]=5;
        };
        
        let row3=state[6]===state[7]&&state[7]==state[8];
        if(row3){
            charWon=state[6];
            winCoordinates[0]=6;
            winCoordinates[1]=7;
            winCoordinates[2]=8;
        };
        
        let col1=state[0]===state[3]&&state[3]==state[6];
        if(col1){
            charWon=state[0];
            winCoordinates[0]=0;
            winCoordinates[1]=3;
            winCoordinates[2]=6;
        };
        
        let col2=state[1]===state[4]&&state[4]==state[7];
        if(col2){
            charWon=state[1];
            winCoordinates[0]=1;
            winCoordinates[1]=4;
            winCoordinates[2]=7;
        };
        
        let col3=state[2]===state[5]&&state[5]===state[8];
        if(col3){
            charWon=state[2];
            winCoordinates[0]=2;
            winCoordinates[1]=5;
            winCoordinates[2]=8;
        };
        
        let dia1=state[0]===state[4]&&state[4]==state[8];
        if(dia1){
            charWon=state[0];
            winCoordinates[0]=0;
            winCoordinates[1]=4;
            winCoordinates[2]=8;
        };
        
        let dia2=state[2]===state[4]&&state[4]==state[6];
        if(dia2){
            charWon=state[2];
            winCoordinates[0]=2;
            winCoordinates[1]=4;
            winCoordinates[2]=6;
        };

        if(state[winCoordinates[0]]===''){ 
            return;
        }

        if(row1||row2||row3||col1||col2||col3||dia1||dia2){  
            executionSwitch=false;
            
            eval(`ele${winCoordinates[0]}.style.color="chartreuse";`);
            eval(`ele${winCoordinates[1]}.style.color="chartreuse";`);
            eval(`ele${winCoordinates[2]}.style.color="chartreuse";`);
            
            displayStatus.innerHTML=`Player ${charWon} has won!`;
            
            if(charWon==='O'){
                playerOne.incrementScore();
            }else{
                playerTwo.incrementScore();
            }
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
        endStatus,
        clearState
    }
})();

//"player" as factory function

function player(x){
    let moveCount=0;
    let score=0;    //not used but kept for future updates
    let value=x;
    function move(index){
        gameBoard.modifyState(index,value);
        moveCount++;
    }
    function clearMoveCount(){
        moveCount=0;
    }
    function showMoveCount(){    
        return moveCount;
    }
    function showScore(){
        return score;
    }
    function incrementScore(){
        score++;
    }
    function clearScore(){
        score=0;
    }
    return {
        move,
        showMoveCount,
        clearMoveCount,
        showScore,
        incrementScore,
        clearScore
    };
}

//instances of factory function

let playerOne=player('O');   
let playerTwo=player('X');


let moveTracker=0;
function play(index){
    if(executionSwitch){
        if(moveTracker%2===0){
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
    eval(`ele${winCoordinates[0]}.style.color="rgba(255, 255, 255, 0.959)";`);
    eval(`ele${winCoordinates[1]}.style.color="rgba(255, 255, 255, 0.959)";`);
    eval(`ele${winCoordinates[2]}.style.color="rgba(255, 255, 255, 0.959)";`);
    winCoordinates=['','',''];
}

function resetGame(){
    executionSwitch=true;
    gameBoard.clearState();
    playerOne.clearScore();
    playerOne.clearMoveCount();
    playerTwo.clearScore();
    playerTwo.clearMoveCount();
    clearWin();
    displayStatus.innerHTML="Player O's Turn";
    gameBoard.renderState();
}




