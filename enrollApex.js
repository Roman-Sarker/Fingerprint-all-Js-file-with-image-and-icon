var fpHTTSrvOpEP = "http://127.0.0.1:15170/fpoperation";
var resultLink;
var fingerFrame;
var lastInitOp;
var nameOfDOM;
var inputDOM, domMsgString;
var serial = "01000410";
var insertFlag, insertMsg;
var LThumbValue = "",
        LIndexValue = "",
        RThumbValue = "",
        RIndexValue = "",
        LMiddleValue = "",
        LRingValue = "",
        LLittleValue = "",
        RMiddleValue = "",
        RRingValue = "",
        RLittleValue = "";
var name;
var app_user;
var ai_logid;
var cust_type,onlineChkStatus;
var data;

function takeFingerData(index) {
    //document.getElementById("FPImage1").src = "../../assets/images/hands/" + index + ".png";
    document.getElementById("FPImage1").style.backgroundColor = "#FFFF99";
    makeStatusMSgHidden("status_alert");
    captureFP();
}

function captureFP() {

}

function showModal() {
    $('#myModal').modal('exampleModalCenter');
    //document.getElementById("FPImage1").src = "../../images/hands/1.png";
    makeStatusMSgHidden("status_alert");
}

function doProcessing(buttonId, inputDOM, statusMes, fingerData, quality) {
    document.getElementById(inputDOM).value = fingerData;
    makeStatusMSgVisible("status_alert", statusMes + " is successfully captured . Quality is " + quality);
    changeClassOfDomElement("status_alert", "success_alert", "danger_alert");
}

function changeClassOfDomElement(element, addClass, removeClass) {
    document.getElementById(element).classList.remove(addClass);
    document.getElementById(element).classList.remove(removeClass);
    document.getElementById(element).classList.add(addClass);
}

function makeStatusMSgVisible(dom, statusMsg) {
    var x = document.getElementById(dom);
    x.innerHTML = statusMsg;
    x.style.visibility = 'visible';
}

function insertStatus(dom, statusMsg, txtColor) {
    var x = document.getElementById(dom);
    x.innerHTML = statusMsg;
    x.style = "color:" + txtColor + "; padding: 5px; text-align: center;";
    x.style.visibility = 'visible';
}

function makeStatusMSgHidden(dom) {
    var x = document.getElementById(dom);
    x.style.visibility = 'hidden';
}

// Start process after submit button click
function processData(pAppUser, pLogId, pOnlineChkStatus, pCustNo) { //pOnlineChkStatus

    if (LThumbValue == null || LThumbValue == "") {
        changeClassOfDomElement("status_alert", "danger_alert", "success_alert");
        makeStatusMSgVisible("status_alert", "Please provide left thumb finger");
        //alert("Please provide left thumb finger");
    } else if (LIndexValue == null || LIndexValue == "") {
        changeClassOfDomElement("status_alert", "danger_alert", "success_alert");
        makeStatusMSgVisible("status_alert", "Please provide left index finger");
        //alert("Please provide left index finger");
    } else if (RThumbValue == null || RThumbValue == "") {
        changeClassOfDomElement("status_alert", "danger_alert", "success_alert");
        makeStatusMSgVisible("status_alert", "Please provide right thumb finger");
        //alert("Please provide right thumb finger");
    } else if (RIndexValue == null || RIndexValue == "") {
        changeClassOfDomElement("status_alert", "danger_alert", "success_alert");
        makeStatusMSgVisible("status_alert", "Please provide right index finger");
        //alert("Please provide right index finger");
    } else if (pCustNo == null || pCustNo == "") {
        changeClassOfDomElement("status_alert", "danger_alert", "success_alert");
        makeStatusMSgVisible("status_alert", "Customer no not found.");
    } else {

        //http request to matching server(FFinger)   
        name = apex.item("P48_CUST_NO").getValue(); //'&P48_CUST_NO.' ; //"257351" ; //&P71_CUST_NO.;
        app_user = pAppUser; //'&APP_USER.';//"ROMAN98";
        ai_logid = pLogId;
        onlineChkStatus = pOnlineChkStatus; //apex.item( "P48_CUST_TYPE").getValue(); //"bo";


        // var Url = "http://10.11.200.20:8087/FFingerBaNew/FingerEnrollment"; P48_PATH
        

        
        //var data = JSON.stringify({"name":"71653","app_user":"ROMAN98","ai_logid":"'73284'","cust_type":"CUS","serial":"01000410","lmiddle":"","lring":"","lthumb":"Rk1SACAyMAAAAAFKAAABQAHgAMUAxQEAAAA8MoBQATurAECCARWGAIC5ANtoAEBRAZPHAECVAa95AIBhANSLAIA1AQiVAIBdAXnDAIDAAWjDAIBxAQmNAICTAKpuAIA6AbDAAEB3AZtLAIClASxmAIBjAS8LAIDYAKxhAICjATxaAIDEAa+wAEDhANtkAIDrAWnHAIByASaHAICXAMPpAEBxAbIAAIBnAKiAAICPASxuAEB9AVyyAEDXAL3hAECJAWPGAIBNAJd6AICgAZ4zAIBBASoaAED7APrbAEBcABWOAIB6AbZuAIB+AapSAEAvATSpAIBdAcNQAECGAI5wAICTAU1pAECkAWpLAEDxABZ5AID1AOrcAEDyASnbAIA1AWK1AEDsAMPkAECqABp1AEDnALTkAIC0AZm1AEDtACXvAEAPAU6rAAAA","lindex":"Rk1SACAyMAAAAAEsAAABQAHgAMUAxQEAAAA8LYDHAVC3AECvAQVSAECdAVBDAEB3AWjpAICZAKrkAICTAUtJAEDoAOdUAID5ASVQAEBuAMwVAECpAMFpAIDmAQXQAECVAI6AAIDoAUDAAEBvAPISAIBgAQS3AIBHAQy3AECqAZ8mAEBcABWQAECZAG19AEB4AMaJAIBYAX/bAEB4ASXGAIDBAOdXAEBgAXfLAIB8AIGOAECIAOiSAECpABqAAICdAHBzAEBIAPwrAECOAVZLAEDsACXwAICOAI53AECIAaoKAIBxAL2cAIByAZthAIBdAJ4SAEB+ASVBAECJAMHkAED/AR/OAECqAX6bAIBuAZXpAEBoALGcAICEAaBpAECGAH53AEB4ACqLAAAA","llittle":"","rthumb":"Rk1SACAyMAAAAAGGAAABQAHgAMUAxQEAAAA8PEBPAUGuAICZAWTHAEA0ATevAEClARCcAIDbAZOeAECQAX/JAECPAJaHAEC3AQCJAECfAP6VAIC6AKr1AICMAMaUAICGAS2uAEBYALwSAEDeAQ9rAIBhAPyhAICzAYNOAICMAJCAAIAvATquAICQAJuHAIBpAIGAAEBoASavAECvAcFkAICkAPqVAEDXAZKkAIByAVO3AIC+ART2AECbAR8QAIDXAR/uAEDbAZyQAEAbAYS9AEBcABWQAEDeAXRDAEDdALRzAEDsACXvAIDFARZyAIB6AZjNAICgAR+kAEC3ASXmAEAqAVe1AICrAJB3AEB9AaDVAEBLAMGVAIClAB99AICxAXvXAICpAZtHAEDQAaIVAIBvAOGYAED4ARXmAIDBASDzAEB8AH+JAIBcAO+lAIDNAW/GAICqAavvAEB+AHAEAIDKAaCGAICdACJmAECdAITvAEAwAPorAEDXAYRJAID1ACJ6AAAA","rindex":"Rk1SACAyMAAAAADwAAABQAHgAMUAxQEAAAA8I4CxAUJHAICKAUiwAICMASapAEBWAYSQAIB4ANefAIBKATuvAEBBAW0kAEBvALiaAECpAOLlAIBtAS0kAICTARCbAICkATXAAICtALT1AIC+ALGGAICzAOp3AEBEAU43AIA1AZASAEAsAX4VAIBYATewAIApAWkuAEBRATImAEC8AJFyAEBcABWQAICzAZCkAICQAaUcAICfAHQUAIClAB98AICIAaqcAEAyAUewAEDxABZ5AICbACGJAICZAaabAEC8ABGAAEAsAYqQAEBgAIOaAAAA","rmiddle":"","rring":"","rlittle":""})
        data = JSON.stringify({
            "name": name,
            "app_user": app_user,
            "ai_logid": ai_logid,
            "cust_type": onlineChkStatus,
            "serial": "01000410",
            "lmiddle": LMiddleValue,
            "lring": LRingValue,
            "lthumb": LThumbValue,
            "lindex": LIndexValue,
            "llittle": LLittleValue,
            "rthumb": RThumbValue,
            "rindex": RIndexValue,
            "rmiddle": RMiddleValue,
            "rring": RRingValue,
            "rlittle": RLittleValue
        });
        var Url = apex.item('P48_PATH').getValue();          
        //alert("URL"+ Url);    
		
					///********* API Calling
            /*        var xhr1 = new XMLHttpRequest();
			
                    xhr1.open('POST', Url, true);
                    xhr1.send(data);
                    xhr1.onreadystatechange = processRequest;
                    //xhr1.setRequestHeader("Content-Type", "application/json");
                    function processRequest(e) {
                        if (xhr1.readyState == 4 && xhr1.status == 200) {
                            
                            var jsonData = JSON.parse(xhr1.responseText);
                            for (var i = 0; i < jsonData.enrollNodes.length; i++) {
                                var counter = jsonData.enrollNodes[i];
                                //console.log(counter.counter_name);
                                insertFlag = counter.errorFlag;
                                insertMsg = counter.errorMessage;

                            }
                            //refresh(); // Page reload
                            if (insertFlag == "N") {

                                apex.navigation.dialog.close(true);

                            } else {
                                //alert("Finger print does not insert. Error is - "+counter.errorMessage);
                                insertStatus("insert_alert", "Finger print does not insert. Error is - " + insertMsg + ".", "#B22222");
                            }


                            //document.getElementById("origin").innerHTML = response1.origin; document.getElementById("url").innerHTML = response1.url;
                        }

                    }
					*/
					
		// Ajax process calling
			var lSpinner$ = apex.util.showSpinner();
			apex.server.process(
			  'Enrollment',
			  {
				x01:data,
				x02:Url
			  },
			  {
				success: function(pData) {
				if (pData.success === true) {
					 apex.navigation.dialog.close(true,["P48_CUST_NO"]);
					 apex.message.showPageSuccess('Finger Print Enroll Successfully. Test')
					 apex.message.showPageSuccess(pData.message);
				} else {
				   apex.message.clearErrors();
					apex.message.showErrors([{
						type: "error",
						location: "page",
						message:pData.message,
						unsafe: false
					}]);
				}
			   
			}       
		  }
		  );
		lSpinner$.remove();
		// Ajax process calling end.
    }

}

// Function to fixed error.
function fixError(statusText, errorText) {
    textResult.style = "color:blue";
    changeClassOfDomElement("status_alert", "danger_alert");

    if (errorText != "") {
        if (statusText != "") {
            textResult.innerHTML = errorText + "(" + statusText + ")";
        } else {
            textResult.innerHTML = errorText;
        }
    } else {
        textResult.innerHTML = statusText;
    }
}

function setAskTest(textMes) {
    textResult.style = "color:blue";
    textResult.innerHTML = textMes;
}

function setOperationResult(textMes) {
    textResult.style = "color:blue";
    textResult.innerHTML = textMes;
}

// Store finger data
function beginOperation(nameOfDOM, msgString, opName, libName, sendSampleNum) {
    inputDOM = nameOfDOM;
    domMsgString = msgString;



    // ISO template
    var json = JSON.stringify({operation: opName,username: "",usedlib: libName,isoconv: "1",samplenum: "1"});

    // ANSI template
    //var json = JSON.stringify({operation: opName, username: "", usedlib: libName, isoconv: "0", samplenum: "1"});
    changeClassOfDomElement("status_alert", "success_alert");

    var req = new XMLHttpRequest();
    req.open("POST", fpHTTSrvOpEP);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    req.onload = function () {
        if (req.status == 200) {
            setAskTest("Operation begin");
            parseOperationDsc(JSON.parse(req.response));

        } else
            fixError(req.statusText, "Server response");
    };
    req.onerror = function () {
        changeClassOfDomElement("status_alert", "danger_alert");
        makeStatusMSgVisible("status_alert", "You have to install futronic sdk");
    };
    req.send(json);
}

function cancelOperation() {
    var url = fpHTTSrvOpEP + '/' + lastInitOp + '/cancel';
    put(url);
}

function getOperationState(opId) {
    var url = fpHTTSrvOpEP + '/' + opId;
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
        if (req.status == 200) {
            if (req.readyState == 4) {
                parseOperationDsc(JSON.parse(req.response));
            }
        } else {
            fixError(req.statusText, "Server response");

        }
    };
    req.onerror = function () {
        fixError("", "You have to install Futronic SDK");

    };
    req.send();
}

function getOperationImg(opId, frameWidth, frameHeight) {
    var url = fpHTTSrvOpEP + '/' + opId + '/image';
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.responseType = "arraybuffer";
    req.onload = function () {
        if (req.status == 200) {
            drawFingerFrame(new Uint8Array(req.response), opId, frameWidth, frameHeight);
        } else {
            changeClassOfDomElement("status_alert", "danger_alert");
            makeStatusMSgVisible("status_alert", "fingerprint image is not got");
        }
    };
    req.onerror = function () {
        enableControlsForOp(false);
    };

    req.send();
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = buffer;
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    var base64String = window.btoa(binary);
    // window.alert(base64String);
    return base64String;
}

function getOperationTemplate(urlOfTemplate) {
    try {
        var url = urlOfTemplate;
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.responseType = "arraybuffer";

        req.onload = function () {
            if (req.status == 200) {
                //--
                var byteArray = new Uint8Array(req.response);
                //alert("Finger Quality ISO[26]: "+byteArray[26]);// Image quality
                if (byteArray[26] < 60) {
                    alert("Finger quality is poor. Quality : " + byteArray[26]);
                } else {
                    var b64Encoded = arrayBufferToBase64(byteArray);

                    if (inputDOM == "LThumb")
                        LThumbValue = b64Encoded;
                    if (inputDOM == "LIndex")
                        LIndexValue = b64Encoded;
                    if (inputDOM == "LMiddle")
                        LMiddleValue = b64Encoded;
                    if (inputDOM == "LRing")
                        LRingValue = b64Encoded;
                    if (inputDOM == "LLittle")
                        LLittleValue = b64Encoded;
                    if (inputDOM == "RThumb")
                        RThumbValue = b64Encoded;
                    if (inputDOM == "RIndex")
                        RIndexValue = b64Encoded;
                    if (inputDOM == "RMiddle")
                        RMiddleValue = b64Encoded;
                    if (inputDOM == "RRing")
                        RRingValue = b64Encoded;
                    if (inputDOM == "RLittle")
                        RLittleValue = b64Encoded;
                    //document.getElementById(inputDOM).value = b64Encoded;

                    changeClassOfDomElement("status_alert", "success_alert");
                    makeStatusMSgVisible("status_alert", domMsgString + " is successfully captured. Standard " + byteArray[26]);

                    // Fixed icon on finger             
                    var thumbsVal = 1;
                    document.getElementById('x').value = thumbsVal;
                    if (thumbsVal = 1) {
                        document.getElementById(inputDOM).style.backgroundImage = "url('/i/emob/Finger/right1.png')";
                    }
                }
            } else {
                changeClassOfDomElement("status_alert", "danger_alert");
                makeStatusMSgVisible("status_alert", "fingerprint template is not got by the system");
            }
        };
        req.onerror = function () {
            changeClassOfDomElement("status_alert", "danger_alert");
            makeStatusMSgVisible("status_alert", "fingerprint template is not got by the system");
        };

        req.send();
    } catch (e) {
        alert(e.message);
    }
}



function linkOperationTemplate(opId, operationName) {
    var target = "/template";
    var url = fpHTTSrvOpEP + '/' + opId + target;
    getOperationTemplate(url);

    /* var saveAs = "template.bin";
     var resultText = "Result template";
     resultLink.href = url;
     
     resultLink.download = saveAs;
     resultLink.innerHTML = resultText;
     resultLink.click();  */
}

function deleteOperation(opId) {
    var url = fpHTTSrvOpEP + '/' + opId;
    deleteVerb(url);
}

function parseOperationDsc(opDsc) {
    var res = true;

    if (opDsc.state == 'done') {
        enableControlsForOp(false);

        if (opDsc.status == 'success') {
            setOperationResult(opDsc.message);
            linkOperationTemplate(opDsc.id, opDsc.operation)
        }

        if (opDsc.status == 'fail') {
            fixError("", opDsc.errorstr)
            res = false;

            if (parseInt(opDsc.errornum) != -1) {
                deleteOperation(opDsc.id);
            }
        }
    } else if (opDsc.state == 'init') {
        lastInitOp = opDsc.id;
        try {
            deviceSN = opDsc.sn;
            serial = deviceSN;
            //document.getElementById('serial').value=deviceSN;
        } catch (e) {
            serial = "";
            //document.getElementById('serial').value="";
        }
        setTimeout(getOperationState, 1000, opDsc.id);
        setTimeout(getOperationImg, 1000, opDsc.id, parseInt(opDsc.devwidth), parseInt(opDsc.devheight));
    } else if (opDsc.state == 'inprogress') {
        if (opDsc.fingercmd == 'puton') {
            setAskTest("Put finger on scanner");
        }

        if (opDsc.fingercmd == 'takeoff') {
            setAskTest("Take off finger from scanner");
        }

        setTimeout(getOperationState, 1000, opDsc.id);
        setTimeout(getOperationImg, 1000, opDsc.id, parseInt(opDsc.devwidth), parseInt(opDsc.devheight));
    }

    return res;
}

function drawFingerFrame(frameBytes, opId, frameWidth, frameHeight) {
    var ctx = fingerFrame.getContext('2d');
    var tempCanvas = document.createElement("canvas");
    tempCanvas.width = frameWidth;
    tempCanvas.height = frameHeight;
    var tempCtx = tempCanvas.getContext("2d");
    var imgData = tempCtx.createImageData(frameWidth, frameHeight);
    for (var i = 0; i < frameBytes.length; i++) {
        // red
        imgData.data[4 * i] = frameBytes[i];
        // green
        imgData.data[4 * i + 1] = frameBytes[i];
        // blue
        imgData.data[4 * i + 2] = frameBytes[i];
        //alpha
        imgData.data[4 * i + 3] = 255;
    }
    tempCtx.putImageData(imgData, 0, 0, 0, 0, frameWidth, frameHeight);
    ctx.drawImage(tempCanvas, 0, 0, frameWidth, frameHeight, 0, 0, fingerFrame.width, fingerFrame.height);
}

function deleteVerb(url) {
    var req = new XMLHttpRequest();
    req.open("DELETE", url);
    req.onload = function () {
        if (req.status == 200) {
        } else {
            fixError(req.statusText, "Server response");
        }
    };
    req.onerror = function () {
        fixError("", "You have to install futronic sdk");
    };
    req.send();
}

function put(url) {
    var req = new XMLHttpRequest();
    req.open('PUT', url);
    req.onload = function () {
        if (req.status != 200) {
            fixError(req.statusText, "Server response");
        }
    };
    req.onerror = function () {
        fixError("", "FPHttpServer not available");
    };
    req.send();
}

function enableControls() {}

function enableControlsForOp(opBegin) {}

function CheckFPHttpSrvConnection() {
    var req = new XMLHttpRequest();
    req.open('GET', fpHTTSrvOpEP);
    req.onload = function () {
        if (req.status == 200) {
            enableControls();
            setAskTest("Press operation button");
        } else {
            fixError(req.statusText, "Server response")
        }
    };
    req.onerror = function () {
        fixError("", "You have to install Futronic sdk.");
        setTimeout(CheckFPHttpSrvConnection, 1000);
    };
    req.send();
}

function onBodyLoad() {
    textResult = document.getElementById("status_alert");

    fingerFrame = document.getElementById("fingerframe");
    resultLink = document.getElementById("resultLink");


    var defImg = new Image();

    defImg.onload = function () {
        var context = fingerFrame.getContext('2d');
        context.drawImage(defImg, 0, 0);
    };
    //defImg.src = "../../assets/images/hands/1.png";

    CheckFPHttpSrvConnection();
}

// Page refresh
function refresh() {
    setTimeout(function () {
        location.reload()
    }, );
}