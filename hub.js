const letters ="qwertyuiopasdfghjklzxcvbnm";
const title=document.querySelectorAll(".maintitle");

title.forEach(el=>{ el.onmouseover=event=>{
	//on every mouse event
	//get target word and loop
	//in each loop if the letter's indewx is lesser than the number of loops ran that that letter is random else its the target words letters
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
			iterations+=1/3;   
		},30);}		
	
});
//lerp
function easeinout(varr, initial, p1, p2, final){
	//yes i did copy it. it looked too nice to pass up
	//https://morethandev.hashnode.dev/demystifying-the-cubic-bezier-function-ft-javascript <=interesting
		let y= (1 - varr) * (1 - varr) * (1 - varr) * initial +
    3 * (1 - varr) * (1 - varr) * varr * p1 +
    3 * (1 - varr) * varr * varr * p2 +
    varr * varr * varr * final
		return y;
}
const scrollers = document.querySelectorAll(".spacer");
const memo = document.querySelectorAll(".memo");

const opt={root:null,threshold:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0]};
//updtes every N timess
const observer = new IntersectionObserver((e)=>{
		e.forEach((entry)=>{
			//so there are actually invisible elements and its just checking how much of them is seen
			for(let i=0;i<scrollers.length;i++){
				//im too lazy to maually add more number to this stupid thing	
				if(entry.isIntersecting){
					if(entry.target==scrollers[i]){
						memo[i].classList.add("seen");
						memo[i].style.setProperty("--doneness",easeinout(entry.intersectionRatio,0,0,0,1));
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

