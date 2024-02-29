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
        name = user.substring(user.indexOf("is") + 1);
        if (name.toLowerCase().includes("angelo")) {
            botM("Ohh! That's my name too");
        }
        user = "input";
    } else if (user.includes("what's")||user.includes('what')) {
        if (user.includes("is")) {
          if(user.includes('name')) {
            botM('1')
          } else if (user.includes('hobby')) {
            botM('2')
          }
        } else if (user.includes('are')) {
          
        }
        return;
    } else if (user.includes('adonis')) {
       // botM(DATA.form.form1);
       botM('<a href="adonis.zip" target="_blank">CLICK ME KASE</a>')
        return maintenance;
    } else if (user.startsWith('a-')) {
        checkApstts(user.substr(2)); // Extract the code after "A-"
        return;
    }

    switch (user.trim()) {
    
        case "help":
           botM("<span class='sk'>You may send the following basic keywords<br>e.g<br><span class='bold'>'Apply'</span> - for applicants. <br><span class='bold'>'Interested'</span> - to know more about the process of application. <br><span class='bold'>'Newbie'</span> - if you are new in the world of Customer Service. <br><span class='bold'>'Contact'</span> - reach out to me personally. <br><span class='bold'>'FAQ's</span> - to see the most frequently asked questions about BPO Industry<br><span class='bold'>'Clear'</span> - to clear conversation<br><br> - Or you can just ask me anything that is Customer Service Related.<br>");
            break;
            
        case "resume":
          //  botM(resumeString);
            break;
            
        case "intro":
              botM(r.intro);
            break;
        
        case "i want to apply":
        case "applicant":
            botM("To get started, please type your first name.");
            conversation.stage = 1;
            break;
        case "clear":
            clearChat();
            break;
        case "time":
            var date = new Date();
            botM("Current time is " + date.getHours() + ":" + date.getMinutes());
            break;
        case "date":
            var date = new Date();
            botM("Current date is " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
            break;
        default:
            if (conversation.stage > 0) {
                // Handle collecting applican
                processaplcntInf(user.trim());
            } else {
                botM('Im quite not sure I understand that. You can try other term for that or just type "help" to see the other available commands.');
            }
            break;
            
    }
}
function processaplcntInf(input) {
    switch (conversation.stage) {
      
        case 1:
            conversation.aplcntInf.firstName = input;
            conversation.stage = 2;
            botM("Next, please type your last name.");
            break;
        case 2:
            conversation.aplcntInf.lastName = input;
            conversation.stage = 3;
            botM("Please provide your middle name (if any), or type 'none'.");
            break;
        case 3:
            if (input.toLowerCase() === "none") {
                conversation.aplcntInf.middleName = "None";
            } else {
                conversation.aplcntInf.middleName = input;
            }
            conversation.stage = 4;
            botM("What is your age?");
            break;
        case 4:
            conversation.aplcntInf.age = input;
            conversation.stage = 5;
            botM("Please enter your email address.");
            break;
        case 5:
            conversation.aplcntInf.email = input;
            conversation.stage = 6;
            botM("Next, please provide your phone number.");
            break;
        case 6:
            conversation.aplcntInf.phoneNumber = input;
            conversation.stage = 7;
            botM("Finally, type your present address.");
            break;
        case 7:
            conversation.aplcntInf.address = input;
            conversation.aplcntInf.code = generateUniqueCode();
            svapplntInfo(conversation.aplcntInf); // Call a function
            conversation.stage = 0; // Reset
            botM("Thank you! Your application has been submitted. To track the status of your application, here is a unique code: A-" + conversation.aplcntInf.code + ". Just send 'A-" + conversation.aplcntInf.code + "' to check.");
            break;
        case 8:
            processAssessmentCode(input);
            break;
        default:
            botM("I'm sorry, I didn't understand that.");
            break;
    }
    console.log(user);
}
function processAssessmentCode(input) {
    if (conversation.stage === 8) {
        conversation.aplcntInf.code = input;
        conversation.stage = 9;
        botM("Great! Now get ready to listen to the audio. Please click the link to play the audio: <a href='path_to_your_audio_file'>Play Audio</a>");
    } else if (conversation.stage === 9) {
        // Placeholder
        setTimeout(startVoiceRecording, 2000); // Start recording
    } else {
        botM("I'm sorry, I didn't understand that.");
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
                saveAudioRecording(conversation.aplcntInf.code, audioUrl);
                audioChunks = [];
            };

            mediaRecorder.start();
            botM("Recording started. Click 'Stop' when you are finished.");
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err);
        });
}
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        botM("Recording stopped.");
    }
}
function saveAudioRecording(code, audioUrl) {
    console.log("Code:", code);
    console.log("Audio URL:", audioUrl);
    botM("Audio recording saved successfully.");
    sendAudioMessage(audioUrl);
}
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
function botM(textToSend) {
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
function generateUniqueCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
    for (var i = 0; i < 12; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}
function svapplntInfo(aplcntInf) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_applicant_info.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText); // Log server response
        }
    };
    var data = "firstName=" + encodeURIComponent(aplcntInf.firstName) +
               "&lastName=" + encodeURIComponent(aplcntInf.lastName) +
               "&middleName=" + encodeURIComponent(aplcntInf.middleName) +
               "&age=" + encodeURIComponent(aplcntInf.age) +
               "&email=" + encodeURIComponent(aplcntInf.email) +
               "&phoneNumber=" + encodeURIComponent(aplcntInf.phoneNumber) +
               "&address=" + encodeURIComponent(aplcntInf.address) +
               "&code=" + encodeURIComponent(aplcntInf.code);
    xhr.send(data);
}
function checkApstts(code) {
    botM("Checking application status for code: " + code);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "get_interview_schedule.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                var scheduleDate = response.scheduleDate;
                var link = response.link;
                botM("Your application is currently scheduled for an Initial Interview on " + scheduleDate + ". Click here for more details: " + link);
            } else {
                botM("No schedule found for the provided code.");
            }
        }
    };
    xhr.send("code=" + encodeURIComponent(code));
}
function getIntSchdl(code, callback) {
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
} 
