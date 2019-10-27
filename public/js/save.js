//Fill out the fields in the Save form
function prepareDataForSave(){
	//Get last tone data result
	var tone = toneChart.getValues();
	if (tone) {
		$("#toneTypeToSave").val(toneChart.getType());
		$("#toneLevelToSave").val(toneChart.getLevel());
		$("#toneValueToSave").val(JSON.stringify(toneChart.getValues()[toneChart.getLevel()][toneChart.getType()], null, ' '));
	}

	//Get text
	$("#textToSave").val($("#resultsText").val());
}

//Send the data to the API.
function saveData(){
	//Get data from Save form

		var to= $("#nameToSave").val();
		var subject= $("#toneTypeToSave").val();
		var body= $("#toneValueToSave").val();


/* 	//POST request to API
	$.post( "http://nodejsloopbackapi.mybluemix.net/api/items", dataToSend,function( data ) {
	  console.log("Save result:", data );
	}).fail(function() {
    alert( "Error saving data" );
  	}); */
	 $.get("/sendEmails",{to:to,subject:subject,body:body},function(data){
           console.log("Email send service called");
		   console.log("Parameters sent :" + " To:" + to + " Subject:" + subject + " Body:" + body);
}).done(function(data) {
    console.log( "Inside callback of send email..." );
	sendResultsToBPM();
  	}).fail(function() {
    console.log( "Error calling send emails function" );
  	});

    //Close the Save window
    $('#myModal').modal('hide');
}


function sendResultsToBPM(){
  var emotionJSON = $("#toneValueToSave").val();	
  var bpm_url = "https://cognizant-ipm.bpm.ibmcloud.com/bpm/dev/teamworks/executeServiceByName?" + "processApp=CMS&serviceName=StartProcess_310678&branchID=2063.ab5e91f2-996f-4c7f-bb3e-ca98d2de1b6a"+
  "&tw.local.dataStr=" + emotionJSON;
  $.get(bpm_url,function(data){
           console.log("Request sent to bpm to create instance");
}).done(function(data) {
    console.log( "sendResultsToBPM call successful !" );
  	}).fail(function() {
    console.log( "Error calling sendResultsToBPM " );
  	});

}