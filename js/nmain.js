var schedule = [{
	url : "http://www.cagp-acpdp.org/uploads/pdnet_cga.jpg",
	mediaType : "image/jpeg",
	duration : 5
}, {
	url : "http://www.wallpaper-valley.com/animal/animal_101.jpg",
	mediaType : "image/jpeg",
	duration : 5 
}, {
	url : "http://osprofanos.com/wp-content/uploads/2010/10/google.jpg",
	mediaType : "image/jpeg",
	duration : 5
}, {
	url : "http://www.wallpaper-valley.com/animal/animal_101.jpg",
	mediaType : "image/jpeg",
	duration : 5
}, {
	url : "http://www.instantplaces.org/",
	mediaType : "text/html",
	duration : 10	
}, {
	url : "http://video-js.zencoder.com/oceans-clip.mp4",
	mediaType : "video/mp4",
	duration : 30
}];


function insert(array, i) {
	
	var el = array[i];

	var content = $("#content");

	//content.children().hide();
	//content.empty();
	
	if (el.mediaType.indexOf("image") != -1) {
		var objImage = new Image();
		
		objImage.onload = function(){
			console.log("abc");
			var w = this.width;
			var h = this.height;
			if(w/h < 1) {
				content.append('<img id="content' + i +'" src="' + el.url + '" style="width: 100%;display:block;margin:0 auto;" />');
				$("#content"+i).hide();
			}
			else {
				content.append('<img id="content' + i +'" src="' + el.url + '" style="height: 100%;display:block;margin:0 auto;" />');
				$("#content"+i).hide();
			}
				
			el.initialized = true;
		};
		objImage.src = el.url;
		
		
	} else if (el.mediaType.indexOf("video") != -1) {
		content.append('<video id="content' + i +'" src="' + el.url + '"  />');
		$("#content"+i).hide();
		el.initialized = true;
	} else if (el.mediaType.indexOf("text/html") != -1) {
		content.append('<iframe id="content' + i +'" src="' + el.url + '" scrolling="no" style="width: 100%;height:100%;"/>');
		$("#content"+i).hide();
		el.initialized = true;
	}

}

function play(schedule, i, total) {
	
	console.log("fadein content "+i);
	$('#content'+i).fadeIn(1000);
	
	
	// se for video, fazer play
	if(schedule[i].mediaType.indexOf("video") != -1) {
		var myVideo=document.getElementById("content"+i);
		myVideo.play();
		var duration = myVideo.duration * 1000; // obtem duracao do video
	}
	else {
		var duration = schedule[i].duration * 1000; // obtem duracao pre-definida
	}
		
	/*
	setTimeout(function() {
		$('#content'+i).fadeOut(1000);
		play(schedule, (i + 1) % total, total);
	}, schedule[i].duration * 1000);
	*/
		
	setTimeout(function() {
		
		// apos duracao do slide, determinar o fadeout e efectuar o mesmo
		console.log("duracao content "+i+ "terminou");
		var fadeout = 1000;
		$('#content'+i).fadeOut(fadeout);
		
		setTimeout(function() {
			// apos o fadeout (tempo) passar executa o proximo slide
			console.log("fadeout content "+i);			
		    play(schedule, (i + 1) % total, total);
		    console.log("next slide "+i);
						
		}, fadeout);		
		
	}, duration);
	
	

}


$(function() {

	var content = $("#content");
	var test = $("#content1");
	var elems = 0;
	
	var total = schedule.length;
	
	$.each(schedule, function() {
		insert(schedule, elems);
		elems++;	
	});
	
	
	if(elems==total) {
		play(schedule,0,total);	
	}

	
	
});