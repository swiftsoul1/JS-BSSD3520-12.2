  /////////////////////////////////////
 //           Javascript 12.2       //
/////////////////////////////////////
//////////////////////////////////////
// Drag and drop Credit to : Max1mmus
// code taken from :
//  https://github.com/Max1mmus/draggable-image-on-canvas/blob/master/draggable.js
// code accessed: 04/15/21
//
//  First I want to learn how to draw an image onto my canvas using this tutorial
// We can just steal the scream image from the tutorial
//
// https://www.w3schools.com/tags/canvas_drawimage.asp
//
//  Second, I want to see how to detect where the mouse is on the canvas.
// https://riptutorial.com/html5-canvas/example/11659/detecting-mouse-position-on-the-canvas
//
//  Third, I want to learn how to drag and drop a canvas image with the mouse.
// For that, I need to download or view the .js file from this repository.
// 
// https://github.com/Max1mmus/draggable-image-on-canvas
//
//  Maybe if there is time, I also want to figure out how to move things
// with the keyboard keys
// https://javascript.info/keyboard-events

//Homework 12.2 due Wednesday before 10PM
// 1. Take your smily face that is animating from homework 12.1, and let the user drag it around the screen and drop it somewhere.
// 2. Do not animate the eyes while the user is dragging the smiley face. You have to figure out how to stop the animation if the face is being dragged.
/////////////////////////////////////

"use strict";
let dragging = false;    
let eyes = 1;
//store last mouse position
let mouseX;
let mouseY;
const iw = 30;
const ih = 20;

const draw = () =>{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    
    let cirX = mouseX;
    let cirY = mouseY;
    
    ctx.beginPath();
    ctx.arc(cirX, cirY, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.fillStyle = 'rgba(255,255,0)';
    ctx.fill();
    
    ctx.moveTo(cirX+35, cirY);
    ctx.arc(cirX, cirY, 35, 0, Math.PI, false);  // Mouth (clockwise) 
    
    if(eyes == 1 || dragging == true){
        ctx.moveTo(cirX-10, cirY-10);
        ctx.arc(cirX-15, cirY-10, 5, 0, Math.PI * 2, true);  // Left eye
        ctx.moveTo(cirX+20, cirY-10);
        ctx.arc(cirX+15, cirY-10, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.stroke();
        eyes = 0;
        window.requestAnimationFrame(draw);
        
    } else if(dragging == false) {
        ctx.moveTo(cirX-8, cirY-10);
        ctx.lineTo(cirX-22, cirY-10);//left
        ctx.moveTo(cirX+22, cirY-10);
        ctx.lineTo(cirX+8, cirY-10);//right
        ctx.stroke(); 
        eyes = 1;
        window.requestAnimationFrame(draw);
    }
    
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

document.addEventListener('DOMContentLoaded', ()=> {
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    let x = canvas.width/2;
    let y = canvas.height/2;
    mouseX = x;
    mouseY = y;
  
    
    //strt dragging if necessary on mouse down
    canvas.addEventListener("mousedown", (e) => {
        let cRect  = canvas.getBoundingClientRect();
        mouseX = Math.round(e.clientX - cRect.left);  
        mouseY = Math.round(e.clientY - cRect.top); 
        
        const minX = x;
        const minY = y;
        const maxX = x + iw;
        const maxY = y + ih;
        
        //check if mouse position in canvas is within bounds of the image.
        if(mouseX >= minX && mouseX <= maxX &&
           mouseY >= minY && mouseY <= maxY) {
                 dragging = true;
        }
    });
    
    //stop dragging when mouse let go
    canvas.addEventListener("mouseup", (e) => {
        //when mouse released, stop dragging
        dragging = false;
    });
    
    //test to drag and move image if mouse moving.
    canvas.addEventListener("mousemove", (e) => { 
        //if not dragging, leave function
        if(!dragging) return;
        
        let cRect  = canvas.getBoundingClientRect();
        const currMouseX = Math.round(e.clientX - cRect.left);  
        const currMouseY = Math.round(e.clientY - cRect.top);   
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        //change in x and y of the mouse since last movement
        const dx = currMouseX - mouseX;
        const dy = currMouseY - mouseY;
        
        //move image same amount mouse moved
        x += dx;
        y += dy;
        
        //update mouse global coordinate
        mouseX = currMouseX;
        mouseY = currMouseY;
        window.requestAnimationFrame(draw);
    
      
    });
    
    window.requestAnimationFrame(draw);
});


