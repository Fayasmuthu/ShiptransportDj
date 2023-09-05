var cursor1 = document.querySelector(".cursor1");
var cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove",function(e){
  cursor1.style.cssText =cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px; "; 
});
