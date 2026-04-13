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
//ok idea lets say we space out smt called spacersN-spacersN+1
//find the number of the current spacer visible and then using it make the associated memo visble
const scrollers = document.querySelectorAll(".spacer");
const memo = document.querySelectorAll(".memo");
const opt={root:null,threshold:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0]};
const observer = new IntersectionObserver((e)=>{
		e.forEach((entry)=>{
			console.log("Current Visibility Ratio:", entry.intersectionRatio);
			
		
			for(let i=0;i<scrollers.length;i++){
				//im too lazy to maually add more number to this stupid thing	
				if(entry.isIntersecting /* && entry.intersectionRatio>0.597*/){
					if(entry.target==scrollers[i]){
						memo[i].classList.add("seen");
						memo[i].style.setProperty("--doneness",entry.intersectionRatio);
					}
				}else{
					console.log(i);					
					if(entry.target==scrollers[i]){
						memo[i].classList.remove("seen");
					}
				}
			}
			
			
			
		})
},opt);
scrollers.forEach(obj =>observer.observe(obj));

