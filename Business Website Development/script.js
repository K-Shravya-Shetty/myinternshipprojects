const header=document.querySelector("header");
wiindow.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY>80);
})