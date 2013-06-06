var global = new Array();
var insertdone = 'false';

function insert_() {
  $.getJSON("json/data.json",function(data){
    global = data;
    dataReady();
  });
}


$("button").click(function(){
  $("p").hide("slow",function(){
    alert("The paragraph is now hidden");
  });
});

function dataReady() {
    //alert(global);
    var output = "<ul>";
    var total = global.length;
		
	for (var j in global) {
			output += "<li> SA: " + global[j].url + " " + global[j].mediaType + "--" + global[j].duration + "</li>";
		}
   insertdone = 'true';
   
   output += "</ul>";
   document.getElementById("content").innerHTML = output;
   
   showArray();
   
   
    
}


function insert() {

	$.getJSON('data.json', function(showArray) {
		var output = "<ul>";
		for (var i in data) {
			output += "<li>" + data[i].url + " " + data[i].mediaType + "--" + data[i].duration + "</li>";
			data_ = data;
		}

		for (var j in data_) {
			output += "<li>" + data_[j].url;
		}
		
		

		output += "</ul>";
		document.getElementById("content").innerHTML = output;
	});
}

function showArray(){
	
	var output = "<ul>";
	
	
	for (var j in global) {
			output += "<li> SA2: " + global[j].url + " " + global[j].mediaType + "--" + global[j].duration + "</li>";
		}
   
   output += "</ul>";
   document.getElementById("test").innerHTML = output;
  
   
}


function checklocalstorage() {
	if ( typeof (Storage) !== "undefined") {
		testjson.jslocalStorage.lastname = "Smith";
		document.getElementById("result").innerHTML = "Last name: " + localStorage.lastname;
	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
	}

}




$(function() {
	
	checklocalstorage();
	
	insert_();
	
	if(insertdone == 'true') {
	
		showArray();
	}
	else alert(insertdone);
	
	
	/**
	setTimeout(function() {
		showArray();	
	}, 10000);
	**/
	
	

	
	
});