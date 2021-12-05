var playing = false;
var score; 
var action;
var timeRemaining;
var correctAnswer;
//if we click on the start/reset button
document.getElementById("startReset").onclick = function(){
    //if we are playing
    if(playing == true){ 
        location.reload(); //reloading page
    }else{ //if we are not playing
        
        playing = true; //change mode to playing

        score = 0; //set score to 0
        document.getElementById("scoreValue").innerHTML = score;
        
        //show countdown box
        show("timeRemaining");
            timeRemaining = 60;
            document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

            //hide game over message box
            hide("gameOver");
        
        //change button to reset
        document.getElementById("startReset").innerHTML = "Reset Game";

        //start countdown
        startCountdown();

        //generate new Q&A
        generateQA();
    }
}
 
// when we click on asnwer box   
 for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    
        //check if we are playing
        if(playing == true){ //yes
            if(this.innerHTML == correctAnswer){ //correct answer
                
                //increase the score by 1
                score++;
                document.getElementById("scoreValue").innerHTML = score;
    
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
    
                //Generate new question
                generateQA();
                
            }else{ //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
     }       
 }
    
  //FUNCTIONS 
  
  //start countdown
  function startCountdown(){
      action = setInterval(function(){
        timeRemaining -= 1; // reduce time by 1 sec in loops
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
            if(timeRemaining == 0){ //check if there is time remaining
                stopCountdown();
                //show game over message
                show("gameOver");
                document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + "</p>";
                    hide("timeRemaining");
                    hide("correct");
                    hide("wrong");
                    playing = false;
                    document.getElementById("startReset").innerHTML = "Start Game!";
            }
      }, 1000); 
  }      

  // stop countdown
  function stopCountdown(){
    clearInterval(action);
  }

  //hides certain elements
  function hide(Id){
      document.getElementById(Id).style.display = "none";
  }

  //show certain elements
  function show(Id){
      document.getElementById(Id).style.display = "block";
  }

  //generate new questions and multiple answers
  function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    
    //populates the questions
    document.getElementById("questions").innerHTML = x + "x" + y;
        var correctPosition = 1+ Math.round(3*Math.random());
        
        //fills one box with the correct answer
        document.getElementById("box"+correctPosition).innerHTML = correctAnswer; 

       
        //fill other box with wrong answers
        var answers = [correctAnswer];

        for(i=1; i<5; i++){
            if(i != correctPosition) {
                var wrongAnswer 
                do{wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random())); //wrong answer
                
                }while(answers.indexOf(wrongAnswer)>-1)
                    
                 document.getElementById("box"+i).innerHTML = wrongAnswer;
                    answers.push(wrongAnswer);
            }
        }
  }
        
        



//if we click on an answer box
    //if we are playing
        //check if the answer is correct
            //if yes ->
                //increase score by 1
                //show the correct box for 1 second
                //generate new question and answers
            //if no ->
                //show try again box for 1 second