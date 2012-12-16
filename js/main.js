var schedule = [{
	url : "http://www.cagp-acpdp.org/uploads/pdnet_cga.jpg",
	mediaType : "image/jpeg",
	duration : 5
}, {
	url : "http://www.instantplaces.org/",
	mediaType : "text/html",
	duration : 5
}, {
	url : "http://video-js.zencoder.com/oceans-clip.mp4",
	mediaType : "video/mp4",
	duration : 5
}, {
	url : "http://www.wallpaper-valley.com/animal/animal_101.jpg",
	mediaType : "image/jpeg",
	duration : 5
}];

function insert(array, i) {
	var el = array[i];

	var content = $("#content");

	content.children().hide();
	//content.empty();
	if(el.initialized) {
		
		$('#content' + i).fadeIn(1000);
	}
	else if (el.mediaType.indexOf("image") != -1) {
		var objImage = new Image();
		
		objImage.onload = function(){
			console.log("abc");
			var w = this.width;
			var h = this.height;
			if(w/h < 1)
				content.append('<img id="content' + i +'" src="' + el.url + '" style="width: 100%;display:block;margin:0 auto;" />');
			else
				content.append('<img id="content' + i +'" src="' + el.url + '" style="height: 100%;display:block;margin:0 auto;" />');
				
			el.initialized = true;
		};
		objImage.src = el.url;
		
		
	} else if (el.mediaType.indexOf("video") != -1) {
		content.append('<video id="content' + i +'" src="' + el.url + '" autoplay="autoplay"/>');
		el.initialized = true;
	} else if (el.mediaType.indexOf("text/html") != -1) {
		content.append('<iframe id="content' + i +'" src="' + el.url + '" style="width: 100%;height:100%;"/>');
		el.initialized = true;
	}

	setTimeout(function() {
		insert(array, (i + 1) % array.length);
	}, array[i].duration * 1000);

}


$(function() {

	var content = $("#content");

	insert(schedule, 0);
});
