const letters ="qwertyuiopasdfghjklzxcvbnm";
const maybe=document.querySelectorAll(".maybe");

maybe.forEach(el=>{
	el.onmouseover=event=>{
		let iterations=0;
		let word =event.target.dataset.value;
		const interval=setInterval(()=>{
			event.target.innerText=event.target.innerText.split("")
			.map((char,index)=>{
					if(index<iterations){
					return word[index];
					}else{
					return letters[Math.floor(Math.random()*26)];
					}
			}).join("");
			if(iterations>=word.length){clearInterval(interval)}
			iterations+=1/10;   
		},10);}		
	
});

