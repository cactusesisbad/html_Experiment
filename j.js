const darkmode =  document.getElementById("darktoggle");
const navmenu =   document.getElementById("navmenu");
const hamburger = document.getElementById("hamburger");
const overlay = document.getElementById("overlay");


darkmode.addEventListener("click", ()=> {document.body.classList.toggle("black");});
hamburger.addEventListener("click",()=>{navmenu.classList.toggle("open");hamburger.classList.toggle("open");overlay.classList.toggle("open");});

overlay.addEventListener("click",()=>{hamburger.classList.toggle("open");navmenu.classList.toggle("open");overlay.classList.toggle("open");});