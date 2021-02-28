               var fpHTTSrvOpEP = "http://127.0.0.1:15170/fpoperation";
               var resultLink;
               var fingerFrame;
               var lastInitOp;
               var nameOfDOM;
               var inputDOM, domMsgString;
               var serial;
               var verifyFlag, verifyMsg;
	
               var appuser,amount,custno;
               var fingerData;
               var operationType,cust_type,deviceId,name;
			   var vSessionId,vLogId,vAppUser;
			   
		function takeFingerData(index) {
                   //document.getElementById("FPImage1").src = "../../assets/images/hands/" + index + ".png";
                   document.getElementById("FPImage1").style.backgroundColor = "#FFFF99";
                   makeStatusMSgHidden("status_alert");
                   captureFP();
               }

               function captureFP() {

               }
/*
               function showModal() {
                   $('#myModal').modal('exampleModalCenter');
                   //document.getElementById("FPImage1").src = "../../images/hands/1.png";
                   makeStatusMSgHidden("status_alert");
               }
*/
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
               function insertStatus(dom, statusMsg,txtColor) {
                   var x = document.getElementById(dom);
                   x.innerHTML = statusMsg;
                   x.style = "color:"+txtColor+"; padding: 5px; text-align: center;";
                   x.style.visibility = 'visible';
               }

               function makeStatusMSgHidden(dom) {
                   var x = document.getElementById(dom);
                   x.style.visibility = 'hidden';
               }

// Start process after submit button click
               function processData(fingerTemplate) {                 
					  var  appuser = vAppUser; //:APP_USER; //'&APP_USER.'; //apex.item("APP_USER").getValue(); 
                      var  amount = "0"; //'&P51_AMOUNT.';
                      var  custno = apex.item("P101_CUST_NO").getValue(); //'&P51_CUST_NO.';
                      var  fingerData = fingerTemplate;
                     // var  operationType = operationType; //"LOGON"; // It will be change
                      var  cust_type = 'SAG';//"&P51_USER_TYPE.";
                      var  deviceId = "01000410";
                      var  name = apex.item("P101_CUST_NO").getValue(); //'&P51_CUST_NO.';
                      var  sessionId = vSessionId; //:APP_SESSION; //'&APP_SESSION.'; //apex.item("APP_SESSION").getValue(); 
                      var  logId = vLogId; //:AI_LOG_ID; //'&AI_LOG_ID.'; //apex.item("AI_LOG_ID").getValue();
                      var data = JSON.stringify({"amount":amount,"name":name,"appuser":appuser,"custno":custno,"temp":fingerData,
                            "pOperationType":operationType,"pLogId":logId,"pSessionId":sessionId,"cust_type":cust_type,"pDeviceId":deviceId});
                      var Url = apex.item('P101_FINGER_SERVER_URL').getValue();
                   //alert("data : "+data);
                  //alert("operationType: "+operationType+",logId: "+logId+",sessionId : "+sessionId+", cust_type: "+cust_type+", deviceId: "+deviceId);
                      
					  
						
						/*
                        var xhr = new XMLHttpRequest();
                        //var data = JSON.stringify({"appuser":"appuser","amount":"amount","custno":"custno","temp":"fingerData","pOperationType":"operationType","cust_type":"cust_type","pDeviceId":"deviceId","name":"name","pSessionId":"sessionId","pLogId":"logId"});
                        //var data = JSON.stringify({"amount":"","name":"257351","appuser":"ROMAN98","custno":"257351","temp":"Rk1SACAyMAAAAAE+AAABQAHgAMUAxQEAAAA8MIDgAT2wAIByAUqsAICQAW+3AIEMAOckAED7ATIoAIBxAVgsAIEFALyhAIDBAaBaAIAuAcEhAICbARapAIDdAQ6oAIBPARurAIEmAUu5AIDbAKQcAICXAVSsAIDrANghAIApAZglAIBXAasYAIDNAKyfAIBKAVcmAIEUAXs9AEC+AblmAICpAZlcAIBCAbYhAIEHAZNLAIA7ASckAEBbABWSAED7AVguAEBlARqkAIEfARakAECMAH2fAICGALgaAIBIAS0sAIEfAJCYAIBWANekAEEHAIGXAEBBAcwLAEEpAPU5AEAvAPikAIEBAcZsAID/AWPGAICTACKGAEEiAWi9AIDbAaXlAEDlAZxNAIElAW7GAEAyAdERAICeAVS5AAAA","pOperationType":"LOGON","pLogId":"4179","pSessionId":"6567339480502","cust_type":"agent","pDeviceId":"01000410"});
                        
                        xhr.open('POST', Url, true);
                        xhr.send(data);
                        xhr.onreadystatechange = processRequest;
                       // xhr.setRequestHeader("Content-Type", "application/json");
                        function processRequest(e) {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                              // alert(xhr.responseText);
                                var jsonData = JSON.parse(xhr.responseText);
                                for (var i = 0; i < jsonData.verifyNodes.length; i++) {
                                    var counter = jsonData.verifyNodes[i];
                                    //console.log(counter.counter_name);
                                    insertFlag = counter.outCode;
                                    insertMsg = counter.outMessage;
                                    
                                }
                                //refresh(); // Page reload
                                if(insertFlag == "N"){
                                    apex.message.showPageSuccess('Finger Print Matched.')
                                    //insertStatus("insert_alert", "Finger print successfully matched. "+name+".","green");
                                    //apex.navigation.dialog.close(true);
                                    javascript:closeModal('P1_NOTIFICATIONS')
                                }
                                else if(insertFlag == "Y"){
                                    //insertStatus("insert_alert", "Finger print does not matched. "+name+".","red");
                                    apex.message.showErrors([
										{
											type:       "error",
											location:   "page",
											message:    "Finger Print Not Matched.",
											unsafe:     false
										}
									]);
                                }
                                else{
                                    alert("Finger print varification failed. Error is - "+insertMsg+".");
                                    //insertStatus("insert_alert", "Finger print varification failed. Error is - "+insertMsg+".","#B22222");
                                }
                                    

                                //document.getElementById("origin").innerHTML = response1.origin;
                                //document.getElementById("url").innerHTML = response1.url;
                            }
                            
                        }// End API calling 
                      */  
            // Ajax process calling
			var lSpinner$ = apex.util.showSpinner();
			apex.server.process(
			  'Verification',
			  {
				x01:data,
				x02:Url
			  },
			  {
				success: function(pData) {
				if (pData.success === true) {
					 //apex.navigation.dialog.close(true,["P101_USERNAME"]);
					 apex.message.showPageSuccess('Finger Print Matched.')
					 javascript:closeModal('P1_NOTIFICATIONS')
				} else {
				   apex.message.clearErrors();
					apex.message.showErrors([{
						type: "error",
						location: "page",
						message:'Finger Print Not Matched',
						unsafe: false
					}]);
				}
			   
			}       
		  }
		  );
		 lSpinner$.remove();
		// Ajax process calling end.
                   
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
                       textResult.innerHTML = statusText
                   }
               }

               function setAskTest(textMes) {
                   textResult.style = "color:blue"
                   textResult.innerHTML = textMes;
               }

               function setOperationResult(textMes) {
                   textResult.style = "color:blue"
                   textResult.innerHTML = textMes;
               }

               function beginOperation(nameOfDOM, msgString, opName, libName, sendSampleNum, pAppUser, pLogId, pSessionId,pOprType) {
				    //&APP_USER.,&AI_LOG_ID.
                   inputDOM = nameOfDOM;
                   domMsgString = msgString;
					vAppUser  = pAppUser;
					vLogId = pLogId;
					vSessionId = pSessionId;
					operationType = pOprType;
                   //ISO template
                   var json = JSON.stringify({operation: opName, username: "", usedlib: libName, isoconv: "1", samplenum: "1"}); 

                   // ANSI template
                   //var json = JSON.stringify({operation: opName, username: "", usedlib: libName, isoconv: "0", samplenum: "1"});
                   changeClassOfDomElement("status_alert", "success_alert");

                   var req = new XMLHttpRequest();
                   req.open("POST", fpHTTSrvOpEP);
                   req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                   req.onload = function () {
                       if (req.status == 200) {
                           //setAskTest("Operation begin");
                           parseOperationDsc(JSON.parse(req.response));
                       } else
                           fixError(req.statusText, "Server response");
                   };
                   req.onerror = function () {
                       changeClassOfDomElement("status_alert", "danger_alert");
                       makeStatusMSgVisible("status_alert", "Yu have to install futronic sdk");
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
                       binary += String.fromCharCode(bytes[ i ]);
                   }

                   var base64String = window.btoa(binary);
                   // window.alert(base64String);
                   return base64String;
               }

               function getOperationTemplate(urlOfTemplate) {
                   try {
					   
					   //alert("Inside getOperationTemplate function");
                       var url = urlOfTemplate;
                       var req = new XMLHttpRequest();
                       req.open('GET', url);
                       req.responseType = "arraybuffer";

                       req.onload = function () {
                           if (req.status == 200) {
                               //--
                               var byteArray = new Uint8Array(req.response); 
                                   //alert("Finger Quality ISO[26]: "+byteArray[26]);// Image quality
                               if(byteArray[28]<60){ //For ISO byteArray[26]						// ISO = byteArray[26], ANSI = byteArray[28]
                                   alert("Finger quality is poor. Quality : "+byteArray[28]);
                               }else{
                                   var b64Encoded = arrayBufferToBase64(byteArray);
								   //alert("b64Encoded :"+b64Encoded);
                                   processData(b64Encoded);
                                   
                                  //document.getElementById(inputDOM).value = b64Encoded;
                                   
                                  // changeClassOfDomElement("status_alert", "success_alert");
                                  // makeStatusMSgVisible("status_alert", domMsgString + " is successfully captured. Standard "+byteArray[26]);
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
                           //setOperationResult(opDsc.message);
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
                       lastInitOp = opDsc.id ;
                       try{
                           deviceSN = opDsc.sn;
                           serial = deviceSN;
                           //document.getElementById('serial').value=deviceSN;
                       }catch(e){
                           serial = "";
                           //document.getElementById('serial').value="";
                       }
                       setTimeout(getOperationState, 1000, opDsc.id);
                       setTimeout(getOperationImg, 1000, opDsc.id, parseInt(opDsc.devwidth), parseInt(opDsc.devheight));
                   } else if (opDsc.state == 'inprogress')
                   {
                       if (opDsc.fingercmd == 'puton') {
                           //setAskTest("Put finger on scanner");
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

               function enableControls() {
               }

               function enableControlsForOp(opBegin) {
               }

               function CheckFPHttpSrvConnection()
               {
                   var req = new XMLHttpRequest();
                   req.open('GET', fpHTTSrvOpEP);
                   req.onload = function () {
                       if (req.status == 200) {
                           enableControls();
                           //setAskTest("Press operation button");
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
               

               function onBodyLoad()
               {
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