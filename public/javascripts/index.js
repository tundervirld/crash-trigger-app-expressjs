//Counter Crash
var iter=0;

// Locate the  elements in the document by their ID
// You can see these elements defined in index.pug
const throwError = document.getElementById("btn-crash-trigger");
const clockTimer = document.getElementById("btn-clock-trigger");

const divMsmSection = document.getElementById('msm-section');
const logSection = document.getElementById('log-section');

function customSetup() {

    // Before to start the app, let's confirm our flag value
    if (ldclient.variation("generar-errores-js", false)) {

        throwError.parentNode.classList.add('btn-bug');
        throwError.parentNode.classList.remove('btn-hello');

        // Change the text 
        throwError.innerText = "Throw a bug💥";
    }
    else {
        throwError.parentNode.classList.add('btn-hello');
        throwError.parentNode.classList.remove('btn-bug');

        // Change the text 
        throwError.innerText = "Say hello👋";
    }

}

//Listeners
throwError.addEventListener('click', () => {  
    
    var textContent = "";    
        textContent = 'Crash 💥 '+ iter++;
        //Writer text in div
        appendDivText(textContent);
        
        //Calling ThrowError 
        ThrowError();    
});

//Listener
clockTimer.addEventListener('click', () => {  
    ClockTimer();
});

//Functions
function ThrowError(){
  throw new Error(`Error Button Thrown 💥 Nº ${iter}`);
}
function appendDivText(textContent){
    logSection.value  += `${textContent}, `;
    divMsmSection.innerHTML= textContent;
    return;
}

function ClockTimer(){
    clockTimer.disabled = true;
    setInterval(function () {
        throwError.click();
    }, 1000);
    return;
}