
import navBar from "../component/getNavbar.js";



let locationHref = JSON.parse(localStorage.getItem("locationHref")) || [];
let loactionAt = locationHref.length - 1;


let forwardAt = JSON.parse(localStorage.getItem("forwardAt"));

if(locationHref[forwardAt] == window.location.href ){

}else{
    locationHref.push(window.location.href);
}
let backAt = JSON.parse(localStorage.getItem("backAt")) || locationHref.length - 1;


localStorage.setItem("locationHref", JSON.stringify(locationHref));

document.getElementById("leftArrow").addEventListener("click", goBack);

document.getElementById("rightArrow").addEventListener("click", goForward);

console.log(1)

let profile_name=localStorage.getItem("user_name")

        
let button_text=document.getElementById("user_name")
button_text.innerText=profile_name
function goBack() {
  
    if(backAt >= 1){
       
        backAt--;
    location.href = locationHref[backAt];
    
    forwardAt = backAt + 1;
    }


    localStorage.setItem("forwardAt", JSON.stringify(forwardAt));
    localStorage.setItem("backAt", JSON.stringify(backAt));
}

function goForward() {

    if (forwardAt && locationHref[forwardAt]) {
        location.href = locationHref[forwardAt];
        if (locationHref[forwardAt++]) {
            forwardAt++;
            backAt++;
        }
        localStorage.setItem("forwardAt", JSON.stringify(forwardAt));
        localStorage.setItem("backAt", JSON.stringify(backAt))
    }

}