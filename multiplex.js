var playing = false;
var score;
var action;
var timeleft;
var correctAnswer;
var wrongAnswer;

document.getElementById("startReset").onclick = function (){
	
	document.getElementById("startReset").style.left = "40px";
	changeContent("startReset", "Restart");
	document.getElementById("startReset").style.backgroundColor = "#fd3f3f";
	document.getElementById("timeCounter").style.left = "420px";
	document.getElementById("timeCounter").style.visibility = "visible";
	document.getElementById("timeCounter").style.backgroundColor = "#fd3f3f";
	
	if(playing == true) {
		location.reload();
	}
	
	else {
		document.getElementById("gameOver").style.visibility = "hidden";
		
		playing = true;
		
		score = 0;
		changeContent("scoreValue", score);
		
		timeleft = 60;
		changeContent("timeCount", timeleft);
		startCountDown();
		
		changeContent("info","Choose the correct option!");
		generateQA();
	}
	
}

function startCountDown() {
		action = setInterval(function (){
			timeleft--;
			document.getElementById("timeCount").innerHTML = timeleft;
			if(timeleft == 0) {
				stopCounter();	
				document.getElementById("gameOver").style.visibility = "visible";
				document.getElementById("gameOver").style.width = "550px";
				document.getElementById("gameOver").style.height = "280px";
				document.getElementById("gameOver").innerHTML = "Game Over!<br />Your score is : " + score;
				
				document.getElementById("startReset").style.left = "220px";
				document.getElementById("startReset").innerHTML = "Reset!";
				document.getElementById("startReset").style.backgroundColor = "#00e56b";
				document.getElementById("timeCounter").style.left = "220px";
				document.getElementById("timeCounter").style.backgroundColor = "#00e56b";
				document.getElementById("timeCounter").style.visibility = "hidden";
				
				playing = false;
			}
		},1000);
	}
	
function stopCounter(){
	clearInterval(action);
}

function generateQA(){
	var x = 1 + Math.round(9*Math.random());
	var y = 1 + Math.round(9*Math.random());
	correctAnswer = x*y;
	var correctPos = 1 + Math.round(3*Math.random());
	
	document.getElementById("quesBox").innerHTML = x + "x" + y;
	document.getElementById("box"+correctPos).innerHTML = correctAnswer;
	var answers = [correctAnswer];
	for(i = 1; i < 5; i++){
		do{
			wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
		} while(answers.indexOf(wrongAnswer)>-1)
		if(i != correctPos){
			document.getElementById("box"+i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}

for(i = 1; i < 5; i++){
	document.getElementById("box"+i).onclick = function (){
		if(playing == true){
			if(this.innerHTML == correctAnswer){
				score++;
				changeContent("scoreValue", score);
				showCorrect();
				generateQA();
			}
			else{
				showWrong();
			}
		}
	}
}

function showCorrect(){
	document.getElementById("info").style.display = "none";
	document.getElementById("correct").style.display = "block";
	document.getElementById("wrong").style.display = "none";
	setTimeout(function (){	
		document.getElementById("info").style.display = "block";
		document.getElementById("correct").style.display = "none";
		document.getElementById("wrong").style.display = "none";
	},700);
}

function showWrong(){
	document.getElementById("info").style.display = "none";
	document.getElementById("correct").style.display = "none";
	document.getElementById("wrong").style.display = "block";
	setTimeout(function (){	
		document.getElementById("info").style.display = "block";
		document.getElementById("correct").style.display = "none";
		document.getElementById("wrong").style.display = "none";
	},700);
}

function changeContent(Id, content){
	document.getElementById(Id).innerHTML = content;
}