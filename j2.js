//TO ANYONE VIEWING THIS:
//I didnt use ai and tried to make this in less than a day whilst learning html and js and didnt actually plan anything
//my apologise for the spaggeti code ;)/

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
betslider.addEventListener("input",function changebet(){bet=betslider.value; document.querySelector('label[for="bet"]').innerHTML="bet amount:"+bet;});


//starts or generates a new fielsd
function startmines(isfrombtn){
	console.log(difficulty);
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


		
	
	let currentmines=totalmines;
	//calculate current mines
	let f = Math.round((totalmines*difficulty)+bet/10);
	if(f<8&&f>0){currentmines=f;}else{
		if(f>8){ currentmines=8;}
		if(f<0){ currentmines=0;}
	}
	gamemines=currentmines;
	document.getElementById("bombstxt").innerHTML="bombs:"+currentmines;
//generating the mindfeild
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
	
	//disables clicked mine
	document.getElementById(name).disabled = true;
	console.log(name);
	
	//lose
	if(mindfeild[i]==1){
			
		boxes(".difficulty_buttons Button",false);
		const boxesss=document.querySelectorAll(".dif_btn_manager");
			for(const box of boxesss){
			box.dataset.started=true;
			}
		document.getElementById(name).dataset.triggr = true;
		statustext.innerHTML="You Lose<strong><i>!</i></strong>";
		console.log("game over");
		score=score+(-0.2*difficulty)-bet;
		//unchecks all boxs
		boxes(".game input[type='checkbox']",true);	
		minesbtn.innerHTML="Retry<i><b>?</b></i>";
	}else{
		let i=0;
		score=score+0.2*Math.round(totalmines*difficulty+bet);minesbtn.innerHTML="End Game<i><b>?</b></i>";
		const boxess = document.querySelectorAll(".game input[type='checkbox']");
		for(const box of boxess	){
			if(!box.disabled){i++;}
		}	
		//win
		if(i==gamemines){
			boxes(".difficulty_buttons Button",false);
				const boxesss=document.querySelectorAll(".dif_btn_manager");
					for(const box of boxesss){
					box.dataset.started=true;
					}
			console.log("win");
			minesbtn.innerHTML="Reroll<i><b>?</b></i>"
			statustext.innerHTML="You win <strong><i>!</i></strong>";
			minesbtn.innerHTML="Try again<i><b>?</b></i>";
			boxes(".game input[type='checkbox']",true);	
		}
	}
	//add win logic!
	scoretext.innerHTML="Score:"+score.toFixed(1);
	//add a intermediarie score so that score var only updates when game lost or win
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