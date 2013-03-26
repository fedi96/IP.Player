var Player = function(options) {
	this.schedule = options.schedule;
	this.el = options.el;
	this.left = options.left || 0;
	this.top = options.top || 0;
	this.width = options.width || 1;
	this.height = options.height || 1;
	
	this.regions = new Array();
	
	$(this.el).css({
		top: (this.top*100)+'%',
		left : (this.left*100)+'%',
		width : (this.width*100)+'%',
		height: (this.height*100)+'%'
	});
	
	this.addRegions(this.schedule.schedule.regions);
	
};

Player.prototype.addRegions = function(lstRegions) {

	lstRegions = lstRegions instanceof Array ? lstRegions : [lstRegions];

	for (var i=0; i<lstRegions.length; i++) {

		$(this.el).append('<div id="'+lstRegions[i].layout+'"></div>');
		var r = new Region(lstRegions[i]);
		this.regions.push(r);
	}

};

Player.prototype.play = function(){
	this.regions.forEach(function(region){
		region.play();
	});
};

Player.prototype.pause = function(){
	this.regions.forEach(function(region){
		region.pause();
	});
};

/*
 * Region class
 * Class that bla bla bla
 */
var Region = function(options){
	//init
	// dimensions
	this.left = options.left || 0;
	this.top = options.top || 0;
	this.width = options.width || 1;
	this.height = options.height || 1;
	this.el = '#'+options.layout;
	
	$(this.el).css({
		top: (this.top*100)+'%',
		left : (this.left*100)+'%',
		width : (this.width*100)+'%',
		height: (this.height*100)+'%',
		position: 'absolute'
	});
	
	this.stylecss = "";
	
	this.applications = new Array();
	
	this.currentApp = -1;
	this.isPaused = false;
	this.started = false;
	
	this.addApps(options.seq.ref);
};

Region.prototype.addApps = function(apps) {
	apps = apps instanceof Array ? apps : [apps];
	
	for (var i=0; i<apps.length; i++) {
		this.applications.push(apps[i]);
	}
};

Region.prototype.play = function() {
	console.log('init play');
	this.isPaused = false;
	this.next();
	
};

Region.prototype.pause = function() {
	console.log('entered pause; paused at: ' + this.currentApp);
	this.isPaused = true;
	//console.log('curduration: '+this.curDuration);
	clearTimeout(this.currTimeout);
	//clearTimeout(this.curFadeout);
	
};


Region.prototype.insertApp = function(app) {
	
	var el = $('<iframe id="app" src="' + app.src + '" scrolling="no" />');
	
	$(this.el).append(el);
	
	var self = this;
	
	
	app.chan = Channel.build({
		window : el[0].contentWindow,
		origin : "*",
		scope : "testScope",
		onReady : function() {
			console.log('ligacao feita');
		}
	});
	
	app.chan.bind("stop", function() {
  		console.log('application ' + app.src + ' executed stop');
  		self.pause();
	});
	
	app.chan.bind("delay", function(trans, t) {
  		console.log('application ' + app.src + ' with delay ' + t);
  		clearTimeout(self.currTimeout);
  		self.currTimeout = setTimeout(function () {
  			console.log('delay over');
			self.next();
		}, t);
	
	});
	
	app.chan.bind("video", function(trans, vdur) {
  		console.log('application ' + app.src + ' has a video');
  		clearTimeout(self.currTimeout);
  		self.currTimeout = setTimeout(function () {
  			console.log('video over');
			self.next();
		}, vdur * 1000);
	});
	
};

/*
 *  Primeiro next; add/del iframe
 */

Region.prototype.next = function() {
	clearTimeout(this.currTimeout);
	
	var elapp = $('#app');

	console.log('next app');
	$(this.el).empty();
	
	//getNextApp
	this.currentApp = Math.abs((this.currentApp + 1) % this.applications.length);
	console.log('this is app number: ' + this.currentApp);
	var app = this.applications[this.currentApp];
	this.insertApp(app);
	
	
	
	if(!this.isPaused) {
		var self = this;
		console.log('timeout: '+ app.dur);
		this.currTimeout = setTimeout(function () {
			self.next();
		},app.dur * 1000);
	}
};

/*
 *  switchiframe para current/previous/next
 */

function loadIframe(iframeName, url, callback) {
    var $iframe = $('#' + iframeName);
    
    if ( $iframe.length ) {
        $iframe.attr('src',url);
        if (callback && typeof(callback) === 'function')
			callback(); 
        
        return false;
    }
    return true;
}

/*
 * switchiframe para app0/1/2, e com classe current next e previous
 */

function loadIframe2(iframeName, iframeClass, callback) {
    var $iframe = $('#' + iframeName);
	//$(".myclass.otherclass")
    if ( $iframe.length ) {
        $iframe.attr('class',iframeClass);
        console.log('mudei o attr');
        if (callback && typeof(callback) === 'function') {
        	console.log('callback time');  
			callback();
		}
        
        return false;
    }
    return true;
}

Region.prototype.next_ = function() {
	clearTimeout(this.currTimeout);
	
	var elapp = $(this.el);

	console.log('next app');
	//$(this.el).empty();
	
	//elapp.fadeIn(4000);
	//getNextApp
	this.currentApp = Math.abs((this.currentApp + 1) % this.applications.length);
	console.log('this is app number: ' + this.currentApp);
	var app = this.applications[this.currentApp];
	if(!app.initialized) {
		/*
		 * para teste
		 */
		var nextApp = Math.abs((this.currentApp + 1) % this.applications.length);
		var Napp = this.applications[nextApp];
		/*
		 * fim teste
		 */
		console.log('ainda nao inicializei e sou a app: '+ this.currentApp);
		//$(this.el).append('<link rel="prefetch" href="' + Napp.src + '" />');
		$(this.el).append('<iframe id="app' + this.currentApp +'"  src="' + app.src + '" scrolling="no" />');		
		$("#app"+this.currentApp).hide();
		app.initialized = true;
	}
	
	$("#app"+this.currentApp).fadeIn(1000);


	if (!this.isPaused) {
		var self = this;
		console.log('timeout: ' + app.dur);

		setTimeout(function() {
			//elapp.fadeOut(1000);
			$("#app"+self.currentApp).fadeOut(1000);
			this.currTimeout = setTimeout(function() {
				self.next();
			}, 1000);
		}, app.dur * 1000);
	}

};

/*
 *  novo teste do play, funciona, mas a troca de ids parece nao funcionar correctamente
 */
Region.prototype.next2 = function() {
	clearTimeout(this.currTimeout);
	
	var elapp = $(this.el);

	console.log('next app');
	//$(this.el).empty();
	
	//elapp.fadeIn(4000);
	//getNextApp
	this.currentApp = Math.abs((this.currentApp + 1) % this.applications.length);
	console.log('this is app number: ' + this.currentApp);
	var app = this.applications[this.currentApp];

	/*
	 * para teste
	 */
	var nextApp = Math.abs((this.currentApp + 1) % this.applications.length);
	var previousApp = (this.currentApp - 1) % this.applications.length;
	if(previousApp < 0) {
		previousApp = this.applications.length - 1; // pq vai de 0 -> length
	}
	var Napp = this.applications[nextApp];
	var Papp = this.applications[previousApp];
	/*
	 * fim teste
	 */

	if(!this.started) {

		console.log('ainda nao inicializei e sou a app: '+ this.currentApp);
		//$(this.el).append('<link rel="prefetch" href="' + Napp.src + '" />');
		$(this.el).append('<iframe id="currentapp" class="current" src="' + app.src + '" scrolling="no" />');
		$("#currentapp").width(this.width + "%");
		$("#currentapp").height(this.height + "%");
		$("#currentapp").hide().fadeIn(1000);
		
		$(this.el).append('<iframe id="nextapp" class="next" src="' + Napp.src + '" scrolling="no" />');
		$("#nextapp").width(this.width + "%");
		$("#nextapp").height(this.height + "%");
		$("#nextapp").hide();
		
		$(this.el).append('<iframe id="previousapp" class="previous" src="' + Papp.src + '" scrolling="no" />');						
		$("#previousapp").width(this.width + "%");
		$("#previousapp").height(this.height + "%");
		$("#previousapp").hide();
		
		this.started = true;
	}
	else {
		loadIframe("previousapp", Papp.src, function() {
			//$("#currentapp").fadeIn(1000);
		});
		loadIframe("nextapp", Napp.src, function() {
			//$("#currentapp").fadeIn(1000);
		});
		loadIframe("currentapp", app.src, function() {		
			$("#currentapp").fadeIn(1000);
		});	
		//loadIframe("nextapp", Napp.src);
		
		//$("#currentapp").hide().fadeIn(1000);
				
	}
	

	//$("#currentapp").fadeIn(1000)
	
	if (!this.isPaused) {
		var self = this;
		console.log('timeout: ' + app.dur);

		setTimeout(function() {
			//elapp.fadeOut(1000);
			$("#currentapp").fadeOut(1000);
			this.currTimeout = setTimeout(function() {
				self.next2();				
			}, 1000);
		}, app.dur * 1000);
	}

};


/*
 * Outro Next (desta vez acede às classes) - funciona correctamente
 */

Region.prototype.next3 = function() {
	clearTimeout(this.curDuration);
	
	var elapp = $(this.el);

	//console.log('next app');
	//$(this.el).empty();
	
	//elapp.fadeIn(4000);
	//getNextApp
	console.log('total apps: ' + this.applications.length);
	
	this.currentApp = Math.abs((this.currentApp + 1) % this.applications.length);
	console.log('this is app number: ' + this.currentApp);
	var app = this.applications[this.currentApp];

	/*
	 * para teste
	 */
	var nextApp = Math.abs((this.currentApp + 1) % this.applications.length);
	console.log('next app will be: ' + nextApp);
	var previousApp = (this.currentApp - 1) % this.applications.length;
	if(previousApp < 0) {
		previousApp = this.applications.length - 1; // pq vai de 0 -> length
	}
	console.log('previous app is: ' + previousApp);
	//var delApp = Math.abs((this.currentApp - 2) % this.applications.length);
	var Napp = this.applications[nextApp];
	var Papp = this.applications[previousApp];
	/*
	 * fim teste
	 */

	if(!this.started) {

		console.log('ainda nao inicializei e sou a app: '+ this.currentApp);
		//$(this.el).append('<link rel="prefetch" href="' + Napp.src + '" />');
		$(this.el).append('<iframe id="app' + this.currentApp + '" class="current" src="' + app.src + '" scrolling="no" />');
		$(this.el).append('<iframe id="app' + nextApp + '" class="next" src="' + Napp.src + '" scrolling="no" />');
		$(this.el).append('<iframe id="app' + previousApp + '" class="previous" src="' + Papp.src + '" scrolling="no" />');		
		$('#app' + this.currentApp).hide().fadeIn(1000);
		$('#app' + nextApp).hide();
		$('#app' + previousApp).hide();
		this.started = true;
	}
	else {
		//$(this.el).removeChild($('#app' + delApp));
		var curApp = this.currentApp;
		
		$(this.el).append('<iframe id="app' + nextApp + '" class="next" src="' + Napp.src + '" scrolling="no" />');
		$('#app' + nextApp).hide();
		
		loadIframe2("app"+previousApp, "previous", function() {
			//$("#currentapp").fadeIn(1000);
		});
		
		loadIframe2("app"+this.currentApp, "current", function() {
			var self = this;
			var ifr = document.getElementById("app"+curApp);
			//or window.frames[x].
			var doc = ifr.contentDocument || ifr.contentWindow.document;
			//alert(doc);
			var teste1 = doc.getElementById("video");
			var teste2 = doc.getElementById("lixo");
			var oxil = $("#app"+curApp).contents().find('video');

			//alert(teste);
			if(teste1 != null) {
				console.log('duracao video: ' + teste1.duration);
				app.dur = teste1.duration/2;
				console.log('nova duracao: ' + app.dur);
			}
			if(teste2 != null) {
				if(app.dur == 0) {
					console.log('e uma imagem! vamos usar tempo pre-definido para imagens -> 10');
					app.dur = 10;
				}
			}
			console.log('fadein app: ' + curApp);
			$('#app' + curApp).fadeIn(1000);
		});		
				
	}
	
	var fadeout = 1000;
	this.duration = app.dur * 1000;
	//$("#currentapp").fadeIn(1000)
	
	if (!this.isPaused) {
		var self = this;
		console.log('timeout: ' + app.dur * 1000);
		
		$('#app'+this.currentApp).contents().find('button').click(function() {
			console.log('clicked');
    		//alert('click');
    		parent.Player.prototype.pause();
		});
		
		console.log('cur duration: ' + this.curDuration);

		this.curDuration = setTimeout(function() {
			//elapp.fadeOut(1000);
			$('#app'+self.currentApp).fadeOut(1000);
			this.curFadeout = setTimeout(function() {
				$('#app' + previousApp).remove();
				//$(this.el).removeChild($('#app' + delApp));
				self.next3();				
			}, fadeout);
		}, this.duration);
	}

};

Region.prototype.previous = function() {
	clearTimeout(this.currTimeout);

	console.log('previous app');
	$(this.el).empty();	
	
	//getPreviousApp
	this.currentApp = Math.abs((this.currentApp - 1) % this.applications.length);
	var app = this.applications[this.currentApp];
	$(this.el).append('<iframe src="' + app.src + '" scrolling="no" />');
	
	if(!this.isPaused) {
		var self = this;
		console.log('timeout: '+ app.dur);
		this.currTimeout = setTimeout(function () {
			self.next();
		},app.dur * 1000);
	}
};

/*
 * Schedule
 */
var Schedule = function(options){
	this.url = options.url;
	this.id = "";
	this.name = "";
	this.lastUpdate = "";
};

// update ficheiro json e respectiva callback a efectuar depois de lido
Schedule.prototype.update = function(callback){
	var self = this;
	$.getJSON(this.url,function(data){
		self.schedule = data.schedule;
		self.id = data.schedule.id;
		self.name = data.schedule.name;
		self.lastUpdate = data.schedule.updatedOn;
		if (callback && typeof(callback) === 'function')
			callback(data.schedule); 
  	});
};

//obtem todo o conteudo schedule
Schedule.prototype.getSchedule = function() {
	if(this.schedule) return this.schedule;
};

//devolve ao Player a lista de apps
Schedule.prototype.getApps = function() {
	if(this.schedule) return this.schedule.seq.ref;
};



/*
 *  Main
 */
var p;
$(function() {

	var s = new Schedule({url:'appslayout.json'});
	
	
	s.update(function(){
		p = new Player({el:'#content', schedule:s});
		p.play();
	});
	
	/**
	setInterval(function () {
		if(navigator.onLine) {
			console.log('connected...');
		}
		else {
			console.log('disconnected!');
		}
	}, 10000);**/
	
	$('#stop').click( function() {
		p.pause();
	});
	
	$('#play').click( function() {
		p.play();
	});
	
	$('#fwd').click( function() {
		p.next();
	});
	
	$('#back').click( function() {
		p.previous();
	});
	
});