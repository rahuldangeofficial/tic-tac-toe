"use strict"; //to prevent unpredictable behavior


let executionSwitch=true; //to prevent unnecessary execution

//"gameBoard" module using IIFE

var gameBoard=(function(){
    let state=['-','-','-','-','-','-','-','-','-'];
    function showState(){
        console.clear();
        console.log("=====");
        console.log(`${state[0]} ${state[1]} ${state[2]}`);
        console.log(`${state[3]} ${state[4]} ${state[5]}`);
        console.log(`${state[6]} ${state[7]} ${state[8]}`);
        console.log("=====");
    }
    function modifyState(index,value){
        if(state[index]==='-'){
            state[index]=value;
        }

        showState();
        endStatus();
        winTracker();
    }
    function endStatus(){
        let flag=true;
        for(let i=0;i<state.length;i++){
            if(state[i]==='-'){
                flag=false;
            }
        }
        if(flag){
            console.log("ended!");
        }
        
    }
    function winTracker(){
        let charWon;
        let winCoordinates=[];
        
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

        if(state[winCoordinates[0]]==='-'){ 
            return;
        }
        if(row1||row2||row3||col1||col2||col3||dia1||dia2){  
            executionSwitch=false;
            console.log(`${charWon} won! at index - ${ winCoordinates}`);

            if(charWon==='O'){
                playerOne.incrementScore();
            }else{
                playerTwo.incrementScore();
            }
        }
    }
    function clearState(){
        for(let i=0;i<state.length;i++){
            state[i]='-';
        }
        console.log("state cleared!");
        showState();
    }

    return {
        showState,
        modifyState,
        winTracker,
        endStatus,
        clearState
    }
})();

//"player" as factory function

function player(x){
    let moveCount=0;
    let score=0;
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



function localPlay(){
    for(let i=0;i<9;i++){
        if(executionSwitch){
            if(i%2==0){
                let index=prompt("playerOne choice: ","");
                playerOne.move(index);
            }else{
                let index=prompt("playerTwo choice: ","");
                playerTwo.move(index);
            }
        }
    }
}
function localReset(){
    
    executionSwitch=true;

    gameBoard.clearState();
    
    playerOne.clearMoveCount();
    playerTwo.clearMoveCount();
}
function globalReset(){
    executionSwitch=true;

    gameBoard.clearState();
    
    playerOne.clearScore();
    playerOne.clearMoveCount();
    
    playerTwo.clearScore();
    playerTwo.clearMoveCount();
}
function globalPlay(n){
    for(let i=0;i<n;i++){
        localPlay();
        localReset();
    }
    console.log("playerOne score - "+playerOne.showScore());
    console.log("playerTwo score - "+playerTwo.showScore());
}

globalPlay(0);




