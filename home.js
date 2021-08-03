const slides = document.querySelectorAll('#slideFrame > p');
const bubble = document.querySelectorAll('.bubbleDescription');
const radioButtons = document.querySelectorAll('.radioButton');
const radioDarkens = document.querySelectorAll('.radioDarken');
const slideHeight = 142;
let counter = 1;

//sizing
if(document.documentElement.clientHeight<670){
    document.getElementById('bottom').style.top = '570px';
}

//automatically sliding every 5.5 seconds
let slideTimer = setInterval(function(){slide(slideHeight*counter)}, 6500);
radioDarkens[0].style.visibility = 'visible';

//=============== EVENT LISTENERS ===========//
//loop slides when done with cycle
for(var i=0; i<slides.length; i++){
    slides[i].addEventListener('transitionend', loopSlide);
}
//restart loop if browser tab is changed (to avoid bugs due to tab inactivity)
document.addEventListener('visibilitychange', function(){
    if(counter>=4){ //reload page if counter is bugged due to tab inactivity
        location.reload();
    }
    for(var i=0; i<slides.length; i++){
        slides[i].style.transition = 'none';
        slides[i].style.transform = 'translateY(0px)';
        if(i<3){
            radioDarkens[i].style.visibility = 'hidden';
        }
    }
    radioDarkens[0].style.visibility = 'visible';
    clearInterval(slideTimer);
    slideTimer = setInterval(function(){slide(slideHeight)}, 6500);
    counter=1;
});
//slide to corresponding text when radio button is clicked
for(var i=0; i<radioButtons.length; i++){
    radioButtons[i].addEventListener('click', function(){ //this = radioButton index
        //restart timer and fix index variable
        counter = this;
        clearInterval(slideTimer);
        slide(this*slideHeight);
        slideTimer = setInterval(function(){slide(slideHeight*(counter))}, 6500);
    }.bind(i)
    );      
}

//================== FUNCTIONS =================//
function slide(amount){ //moves slides by specified amount
    //sliding text
    for(var i=0; i<slides.length; i++){
        slides[i].style.transition = 'transform 1.5s ease-in-out';
        slides[i].style.transform = 'translateY(' + (-amount) + 'px)';
    }
    //sliding radio buttons
    for(var j=0; j<radioDarkens.length; j++){
        radioDarkens[j].style.visibility = 'hidden';
    }
    console.log(counter);
    if(counter<3){
        radioDarkens[counter].style.visibility = "visible";
    }
    else{
        radioDarkens[0].style.visibility = 'visible';
    }
    counter++;
}
function loopSlide(){ //resets slides if on last one
    if(counter>=4){
        for(var i=0; i<slides.length; i++){
            slides[i].style.transition = 'none';
            slides[i].style.transform = 'translateY(0px)';
        }
        counter=1;
    }
}
function copyEmail(){ //copies email to clipboard and displays message
    navigator.clipboard.writeText('erickgonzalez@ufl.edu').then(function() {
        var tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = 'Copied: erickgonzalez@ufl.edu';
    });
}
function revertTooltip(){ //reverts tooltip back to normal message
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copy Email To Clipboard";
}

