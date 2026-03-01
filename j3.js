//TO ANYONE VIEWING THIS:
//I didnt use ai and tried to make this in less than a day whilst learning html and js and didnt actually plan anything
//my apologise for the spaggeti code ;)/

//total mines
let totalmines = 4;

//the mine field
let mindfeild=[0,0,0,0,0,0,0,0,0];

//players current score
let score = 1;

//amount of bet. increase difficulty the bigger the bet
let bet = 2;
let difficulty=5;

const scoretext = document.getElementById("score");
const minesbtn = document.getElementById("startbtn");

//starts or generates a new fielsd
function startmines(){
	
	//finds all checkboxs
	const boxes = document.querySelectorAll(".game input[type='checkbox']");
	
		//resets the checkbox
		for(const box of boxes){
			box.disabled =false;	
			box.checked =false;
		}	
		

	let f = Math.round(totalmines*(bet/difficulty));

	if(f<7&&f>0){currentmines=f;}else{
		if(f>7){currentmines=7;}
		if(f<0){currentmines=0;}
	}
	/*
	totalmines X bet/difficulty
	and if it is within the num than thats the mines? <=clamping
	*/
	console.log(currentmines);
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
	console.log(mindfeild);
	minesbtn.innerHTML="Reroll<i><b>?</b></i>"
}
function checkmines(i,name){
	document.getElementById(name).disabled = true;
	console.log(name);
	if(mindfeild[i]==1){
		console.log("game over");
		score=score-0.5;
		const boxes = document.querySelectorAll(".game input[type='checkbox']");
		for(const box of boxes){
			box.disabled =true;	
		}	
		minesbtn.innerHTML="Retry<i><b>?</b></i>";
	}else{score=score+0.2*Math.round(totalmines*(bet/difficulty));minesbtn.innerHTML="End Game<i><b>?</b></i>";}
	
	scoretext.innerHTML=bet+"X"+score.toFixed(2)+"X"+difficulty;
}

/*
if num is >a then num=a
if num is <b then num=b

*/