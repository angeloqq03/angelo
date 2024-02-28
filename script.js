var audio = new Audio('sentmessage.mp3');
var audioContext;
var mediaRecorder;
var audioChunks = [];

const maintenance = "Maintenance ongoing, available by 02-29-2024, at 01:00AM PST";

/*
var contactAngelo = "<div class='social'> <a target='_blank' href='tel:+639670971677'> <div class='socialItem' id='call'><img class='socialItemI' src='phone.svg'/><label class='number'></label></label></div> </a> <a href='mailto:angeloqq03@gmail.com'> <div class='socialItem'><img class='socialItemI' src='gmail.svg' alt=''></div> </a> <a target='_blank' href='https://github.com/angeloqq03'> <div class='socialItem'><img class='socialItemI' src='github.svg' alt=''></div> </a> <a target='_blank' href='https://wa.me/639670971677'> <div class='socialItem'><img class='socialItemI' src='whatsapp.svg' alt=''>";

var addressString = "";

const DATA = {
  goverment:{
    psa:{
      a:["Click the link to proceed on <a href='psa.com'>Philippines Statistics Authority </a>"]
    }
  },
  
  social:{
    facebook:[],
  },
  
  form:{
    form1:[''],
  },
  
  selector:{
    selector1:['selector here with options']
  }
}

*/

const conversation = {
  stage: 0,
  applicantInfo: {
    firstName: "",
    lastName: "",
    middleName: "",
    age: "",
    email: "",
    phoneNumber: "",
    address: "",
    code: ""
  }
};



function startFunction() {
    setLastSeen();
    wNreply('intro');
}



function setLastSeen() {
    var date = new Date();
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "last seen today at " + date.getHours() + ":" + date.getMinutes()
}


function closeFullDP() {
    var x = document.getElementById("fullScreenDP");
    if (x.style.display === 'flex') {
        x.style.display = 'none';
    } else {
        x.style.display = 'flex';
    }
}

function openFullScreenDP() {
    var x = document.getElementById("fullScreenDP");
    if (x.style.display === 'flex') {
        x.style.display = 'none';
    } else {
        x.style.display = 'flex';
    }
}

function isEnter(event) {
    if (event.keyCode == 13) {
        sendMsg();
    }
}

function sendMsg() {
    var input = document.getElementById("inputMSG");
    var ti = input.value;
    if (input.value == "") {
        return;
    }
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var crDiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "sent");
    crDiv.setAttribute("class", "green");
    dateLabel.setAttribute("class", "dateLabel");
    crDiv.innerText = input.value;
    myDiv.appendChild(crDiv);
    myLI.appendChild(myDiv);
    crDiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    setTimeout(function () { wNreply(ti) }, 1500);
    input.value = "";
    playSound();
}



function wNreply(inputText) {
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "typing...";
    var name = "";

    let user = inputText.toLowerCase();

    if (user.includes("my name is")) {
        name = user.substring(user.indexOf("is") + 2);
        if (name.toLowerCase().includes("angelo")) {
            sendTextMessage("Ohh! That's my name too");
        }
        user = "input";
    } else if (user.includes(" ")) {
      
       // sendTextMessage("Im glad that you're interested for a Customer Service Representative Position. To get started, please enter your first name.");
       // conversation.stage = 8;
        return;
    } else if (user.includes('fb')) {
       // sendTextMessage(DATA.form.form1);
        return maintenance;
    } else if (user.startsWith('a-')) {
        checkApplicationStatus(user.substr(2)); // Extract the code after "A-"
        return;
    }

    switch (user.trim()) {
      /*
        case "help":
           sendTextMessage("<span class='sk'>You may send the following basic keywords<br>e.g<br><span class='bold'>'Apply'</span> - for applicants. <br><span class='bold'>'Interested'</span> - to know more about the process of application. <br><span class='bold'>'Newbie'</span> - if you are new in the world of Customer Service. <br><span class='bold'>'Contact'</span> - reach out to me personally. <br><span class='bold'>'FAQ's</span> - to see the most frequently asked questions about BPO Industry<br><span class='bold'>'Clear'</span> - to clear conversation<br><br> - Or you can just ask me anything that is Customer Service Related.<br>");
            break;
            
        case "resume":
          //  sendTextMessage(resumeString);
            break;
            */
        case "intro":
              sendTextMessage(maintenance);
            break;
        /*
        case "i want to apply":
        case "applicant":
            sendTextMessage("To get started, please type your first name.");
            conversation.stage = 1;
            break;
        case "clear":
            clearChat();
            break;
        case "time":
            var date = new Date();
            sendTextMessage("Current time is " + date.getHours() + ":" + date.getMinutes());
            break;
        case "date":
            var date = new Date();
            sendTextMessage("Current date is " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
            break;
        default:
            if (conversation.stage > 0) {
                // Handle collecting applican
                processApplicantInfo(user.trim());
            } else {
                sendTextMessage('Im quite not sure I understand that. You can try other term for that or just type "help" to see the other available commands.');
            }
            break;
            */
    }
}

/*
function processApplicantInfo(input) {
    switch (conversation.stage) {
      
        case 1:
            conversation.applicantInfo.firstName = input;
            conversation.stage = 2;
            sendTextMessage("Next, please type your last name.");
            break;
        case 2:
            conversation.applicantInfo.lastName = input;
            conversation.stage = 3;
            sendTextMessage("Please provide your middle name (if any), or type 'none'.");
            break;
        case 3:
            if (input.toLowerCase() === "none") {
                conversation.applicantInfo.middleName = "None";
            } else {
                conversation.applicantInfo.middleName = input;
            }
            conversation.stage = 4;
            sendTextMessage("What is your age?");
            break;
        case 4:
            conversation.applicantInfo.age = input;
            conversation.stage = 5;
            sendTextMessage("Please enter your email address.");
            break;
        case 5:
            conversation.applicantInfo.email = input;
            conversation.stage = 6;
            sendTextMessage("Next, please provide your phone number.");
            break;
        case 6:
            conversation.applicantInfo.phoneNumber = input;
            conversation.stage = 7;
            sendTextMessage("Finally, type your present address.");
            break;
        case 7:
            conversation.applicantInfo.address = input;
            conversation.applicantInfo.code = generateUniqueCode();
            saveApplicantInfo(conversation.applicantInfo); // Call a function
            conversation.stage = 0; // Reset
            sendTextMessage("Thank you! Your application has been submitted. To track the status of your application, here is a unique code: A-" + conversation.applicantInfo.code + ". Just send 'A-" + conversation.applicantInfo.code + "' to check.");
            break;
        case 8:
            processAssessmentCode(input);
            break;
        default:
            sendTextMessage("I'm sorry, I didn't understand that.");
            break;
    }
}
*/


/*
function processAssessmentCode(input) {
    if (conversation.stage === 8) {
        conversation.applicantInfo.code = input;
        conversation.stage = 9;
        sendTextMessage("Great! Now get ready to listen to the audio. Please click the link to play the audio: <a href='path_to_your_audio_file'>Play Audio</a>");
    } else if (conversation.stage === 9) {
        // Placeholder for voice recording
        setTimeout(startVoiceRecording, 2000); // Start recording after 2 seconds delay
    } else {
        sendTextMessage("I'm sorry, I didn't understand that.");
    }
}

function startVoiceRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            audioContext = new AudioContext();
            const audioInput = audioContext.createMediaStreamSource(stream);
            mediaRecorder = new MediaRecorder(audioContext.createMediaStreamDestination());
            
            mediaRecorder.ondataavailable = function(event) {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = function() {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                saveAudioRecording(conversation.applicantInfo.code, audioUrl);
                audioChunks = [];
            };

            mediaRecorder.start();
            sendTextMessage("Recording started. Click 'Stop' when you are finished.");
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err);
        });
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        sendTextMessage("Recording stopped.");
    }
}



function saveAudioRecording(code, audioUrl) {
    // Here you would handle saving the audio recording to your database
    // You can use XMLHttpRequest or fetch API to send the audio data to your server
    // For this example, we're just logging the code and audio URL
    console.log("Code:", code);
    console.log("Audio URL:", audioUrl);
    sendTextMessage("Audio recording saved successfully.");

    //send the audio URL 
    sendAudioMessage(audioUrl);
}
*/


/*
function sendAudioMessage(audioUrl) {
    const audioElement = document.createElement("audio");
    audioElement.controls = true;
    audioElement.src = audioUrl;

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("received");
    messageContainer.appendChild(audioElement);

    document.getElementById("listUL").appendChild(messageContainer);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
}

function clearChat() {
    document.getElementById("listUL").innerHTML = "";
    wNreply('intro');
}
*/

function sendTextMessage(textToSend) {
    setTimeout(setLastSeen, 1000);
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var crDiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.setAttribute("id", "sentlabel");
    dateLabel.id = "sentlabel";
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "received");
    crDiv.setAttribute("class", "grey");
    crDiv.innerHTML = textToSend;
    myDiv.appendChild(crDiv);
    myLI.appendChild(myDiv);
    crDiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    playSound();
}

function playSound() {
    audio.play();
}

/*

function generateUniqueCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
    for (var i = 0; i < 12; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

function saveApplicantInfo(applicantInfo) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_applicant_info.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText); // Log server response
        }
    };
    var data = "firstName=" + encodeURIComponent(applicantInfo.firstName) +
               "&lastName=" + encodeURIComponent(applicantInfo.lastName) +
               "&middleName=" + encodeURIComponent(applicantInfo.middleName) +
               "&age=" + encodeURIComponent(applicantInfo.age) +
               "&email=" + encodeURIComponent(applicantInfo.email) +
               "&phoneNumber=" + encodeURIComponent(applicantInfo.phoneNumber) +
               "&address=" + encodeURIComponent(applicantInfo.address) +
               "&code=" + encodeURIComponent(applicantInfo.code);
    xhr.send(data);
}

function checkApplicationStatus(code) {
    sendTextMessage("Checking application status for code: " + code);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "get_interview_schedule.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                var scheduleDate = response.scheduleDate;
                var link = response.link;
                sendTextMessage("Your application is currently scheduled for an Initial Interview on " + scheduleDate + ". Click here for more details: " + link);
            } else {
                sendTextMessage("No schedule found for the provided code.");
            }
        }
    };
    xhr.send("code=" + encodeURIComponent(code));
}


function getInterviewSchedule(code, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "get_schedule.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                callback(response.scheduleDate, response.link);
            } else {
                callback(null, null);
            }
        }
    };
    xhr.send("code=" + encodeURIComponent(code));
} */
