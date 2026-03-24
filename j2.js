//TO ANYONE VIEWING THIS:
//I didnt use ai and tried to make this in less than a day whilst learning html and js and didnt actually plan anything
//my apologise for the spaggeti code ;)/

let debugmode=false;

//total mines
//NOTE seems like the current mines is WIEGHTED toward totalmines num 
let totalmines = 2;
let gamemines = 3;
//the mine field
let mindfeild=[0,0,0,0,0,0,0,0,0];

//players current score
let score = 1;

//amount of bet. increase difficulty the bigger the bet
let bet=5;
let difficulty=2;
//get the items
const scoretext = document.getElementById("score");
const statustext = document.getElementById("status");
const minesbtn = document.getElementById("startbtn");
//get sliders
const betslider = document.getElementById("bet");
//updates the sliders
betslider.addEventListener("input",function changebet(){bet=betslider.value; document.querySelector('label[for="bet"]').innerHTML="<strong> Bet Amount:"+bet+"</strong>";});

const fail = document.getElementById("fail");
const succ = document.getElementById("succes");
const win1 = document.getElementById("win1");
const win2 = document.getElementById("win2");
const clicks = document.getElementById("clicks");
//starts or generates a new fielsd
function startmines(isfrombtn){
	sfx(4);
	debug(difficulty);
	statustext.innerHTML="IN PROGRESS";
	//finds all checkboxs
	const boxess = document.querySelectorAll(".game input[type='checkbox']");
	
		//resets the checkbox
		for(const box of boxess){
			box.disabled =false;	
			box.checked =false;
			box.dataset.triggr ="false";
			box.dataset.startup ="false";
		}
		const boxesss=document.querySelectorAll(".dif_btn_manager");
		if(!isfrombtn){
			for(const box of boxesss){
			box.dataset.started=false;
			box.disabled =false;
			}
		}else{
			for(const box of boxesss){
			box.dataset.started=true;
			box.disabled =false;
			}
		}
		boxes(".difficulty_buttons Button",false);
		document.querySelector(".debuger input[type='checkbox']").checked=debugmode;;

		
	
	let currentmines=totalmines;
	//calculate current mines
	let f = Math.round((totalmines*difficulty)+bet/2.5);
	if(f<8&&f>0){currentmines=f;}else{
		if(f>8){ currentmines=8;}
		if(f<0){ currentmines=0;}
	}
	gamemines=currentmines;
	document.getElementById("bombstxt").innerHTML="bombs:"+currentmines;
//generating the mindfeild
	debug(currentmines);
	let i=0;
	mindfeild.fill("0");
	while(currentmines>0){		
		if(i>8){i=0;}
			if(mindfeild[i]!="1"){
				let randomnum=Math.floor(Math.random()*(9));
				if(randomnum==i){	
					mindfeild[i]="1";
					currentmines--;	
				}
			}
			i++;
		// 1,1,1
		// 1,0,0
		// 1,0,U
		}
	debug(mindfeild);
	minesbtn.innerHTML="Reroll<i><b>?</b></i>"
}
function checkmines(i,name){
	
	//disables clicked mine
	document.getElementById(name).disabled = true;
	debug(name);
	
	//lose
	if(mindfeild[i]==1){
			
		boxes(".difficulty_buttons Button",false);
		sfx(1);
		const boxesss=document.querySelectorAll(".dif_btn_manager");
			for(const box of boxesss){
			box.dataset.started=true;
			}
		document.getElementById(name).dataset.triggr = true;
		statustext.innerHTML="You Lose<strong><i>!</i></strong>";
		debug("game over");
		score=score-(bet*difficulty);
		//unchecks all boxs
		boxes(".mindfield input[type='checkbox']",true);	
		minesbtn.innerHTML="Retry<i><b>?</b></i>";
	}else{
		let i=0;
		//why did blud use desmos for this >_<
		score=score+0.3*Math.round((difficulty*difficulty)*bet);
		minesbtn.innerHTML="End Game<i><b>?</b></i>";
		const boxess = document.querySelectorAll(".mindfield input[type='checkbox']");
		for(const box of boxess	){
			if(!box.disabled){i++;}
		}	
		//win
		if(i==gamemines){
			sfx(3);
			boxes(".difficulty_buttons Button",false);
				const boxesss=document.querySelectorAll(".dif_btn_manager");
					for(const box of boxesss){
					box.dataset.started=true;
					}
			debug("win");
			minesbtn.innerHTML="Reroll<i><b>?</b></i>"
			statustext.innerHTML="You win <strong><i>!</i></strong>";
			minesbtn.innerHTML="Try again<i><b>?</b></i>";
			boxes(".mindfield input[type='checkbox']",true);	
		}else{
			sfx(2);
		}
	}
	//add win logic!
	scoretext.innerHTML="Score:"+score.toFixed(1);
	document.querySelector(".debuger input[type='checkbox']").checked=debugmode;;
	//add a intermediarie score so that score var only updates when game lost or win
}
function ChangeColor(){
	document.body.classList.toggle("black");
	sfx(4);
}
//for difficulty buttons
function changedif(id,num){
	boxes(".difficulty_buttons Button",true);
					const boxesss=document.querySelectorAll(".dif_btn_manager");
					for(const box of boxesss){
					box.dataset.started=false;
					}
	difficulty=num;
	startmines(false);
}
function boxes(name,disable){
	const boxes=document.querySelectorAll(name);
	for(const box of boxes){
		box.disabled=disable;
	}
}

function debug(message){
	if(debugmode){
		console.log(message);
	}
}
function sfx(i){
	switch(i){
		case 1:
		fail.currentTime=0;
		fail.play();
			break;
		case 2:
		succ.currentTime=0;
		succ.play();
			break;
		case 3:
		win1.currentTime=1.5;
		win2.currentTime=1.5;
		win1.play;win2.play();
			break;
		case 4:
		clicks.playbackRate=0.7+Math.random()*0.3;
		clicks.currentTime=0;
		clicks.play();
			break;
		default:
			debug("something is calling sfx incorrectly make it shut up");
	}
}
