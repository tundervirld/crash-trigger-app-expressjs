//Counter Crash
var iter=0;

//Client ID from https://app.launchdarkly.com/settings/projects
const LD_FF_KEY = document.getElementById('ld-ffkey').value;
const LD_CLIENT_ID = document.getElementById('ld-client-id').value;
// The user object
const lduser = JSON.parse(document.getElementById('ld-user').value);

// LDClient loads from a script tag in index.pug.
// Initialize it with the client ID we defined above and the user object
const ldclient = LDClient.initialize(LD_CLIENT_ID, lduser);

// Locate the  elements in the document by their ID
// You can see these elements defined in index.pug
const throwError = document.getElementById("btn-crash-trigger");
const clockTimer = document.getElementById("btn-clock-trigger");

const divMsmSection = document.getElementById('msm-section');
const logSection = document.getElementById('log-section');

function customSetup() {
console.log(LD_FF_KEY);
console.log(ldclient.variation(LD_FF_KEY, false));
    // Before to start the app, let's confirm our flag value
    if (ldclient.variation(LD_FF_KEY, false)) {

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

    // Before to start the app, let's confirm our flag value
    if (ldclient.variation(LD_FF_KEY, false)) {
        textContent = 'Crash 💥 '+ iter++;
        //Writer text in div
        appendDivText(textContent);
        
        //Calling ThrowError 
        ThrowError();
    }
    else {
        textContent = 'Hello 👋 '+ iter++;
        //Writer text in div
        appendDivText(textContent);
        
        //Calling SayHello 
        SayHello();
    }
});

//Listener
clockTimer.addEventListener('click', () => {  
    ClockTimer();
});

//Like windows OnLoad
ldclient.on('ready', customSetup);
//Like windows OnChange
ldclient.on("change", customSetup)

//Functions
function ThrowError(){
  throw new Error(`Error Button Thrown 💥 Nº ${iter}`);
}
function SayHello(){
    console.log(`Hello Nº ${iter}` );
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
