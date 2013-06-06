/*
 * Player class
 * Class that bla bla bla
 */
var Player = function(options) {
	//init
	// dimensions
	this.left = -1;
	this.top = -1;
	this.width = -1;
	this.height = -1;
	this.stylecss = "";
	this.applications = new Array();
	this.el = options.el;
	this.currentApp = -1;
	this.isPaused = false;
	this.started = false;
};

Player.prototype.addSize = function(dimensions) {
	this.left = dimensions.left * 100;
	this.top = dimensions.top * 100;
	this.width = dimensions.width * 100;
	this.height = dimensions.height * 100;
	console.log('left: ' + this.left);
	console.log('top: ' + this.top);
	console.log('width: ' + this.width);
	console.log('height: ' + this.height);


};

Player.prototype.addApps = function(apps) {
	apps = apps instanceof Array ? apps : [apps];
	
	for (var i=0; i<apps.length; i++) {
		this.applications.push(apps[i]);
	}
};

Player.prototype.play = function() {
	console.log('init play');
	this.isPaused = false;
	this.next2();
	
};

Player.prototype.pause = function() {
	console.log('paused');
	this.isPaused = true;
	clearTimeout(this.currTimeout);
	
};
/**
Player.prototype.next = function() {
	clearTimeout(this.currTimeout);
	
	var elapp = $('#app');

	console.log('next app');
	$(this.el).empty();
	
	//getNextApp
	this.currentApp = Math.abs((this.currentApp + 1) % this.applications.length);
	console.log('this is app number: ' + this.currentApp);
	var app = this.applications[this.currentApp];
	$(this.el).append('<iframe id="app" src="' + app.src + '" scrolling="no" />');
	
	if(!this.isPaused) {
		var self = this;
		console.log('timeout: '+ app.dur);
		this.currTimeout = setTimeout(function () {
			self.next();
		},app.dur * 1000);
	}
};**/

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

Player.prototype.next = function() {
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
	
	//loadIframe("app0", "http://www.fcporto.pt");
	
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
 *  novo teste do play
 */
Player.prototype.next2 = function() {
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
 * Outro Next (desta vez acede às classes)
 */

Player.prototype.next3 = function() {
	clearTimeout(this.currTimeout);
	
	var elapp = $(this.el);

	console.log('next app');
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
			console.log('fadein app: ' + curApp);
			$('#app' + curApp).fadeIn(1000);
		});		
				
	}
	
	
	
	//$("#currentapp").fadeIn(1000)
	
	if (!this.isPaused) {
		var self = this;
		console.log('timeout: ' + app.dur);

		setTimeout(function() {
			//elapp.fadeOut(1000);
			$('#app'+self.currentApp).fadeOut(1000);
			this.currTimeout = setTimeout(function() {
				$('#app' + previousApp).remove();
				//$(this.el).removeChild($('#app' + delApp));
				self.next3();				
			}, 1000);
		}, app.dur * 1000);
	}

};

Player.prototype.previous = function() {
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

// guarda id, name e lastupdate
Schedule.prototype.getInfo = function() {
	if(this.schedule) {
		localStorage.setItem("schedule", JSON.stringify(this.schedule));
		var json_string = localStorage.getItem("schedule");
		console.log(json_string);
		this.schedule = JSON.parse(json_string);
		this.id = this.schedule.id;
		this.name = this.schedule.name;
		this.lastUpdate = this.schedule.updatedOn;
	}
};

/*
 *  Main
 */

$(function() {

	var s = new Schedule({url:'json/schedulerv1_1.json'});
	var p = new Player({el:'#content'});
	
	if(navigator.onLine) {
		console.log('connected...');
	}
	else {
		console.log('disconnected!');
		s.getInfo();
		p.addSize(s.getSchedule());
		p.addApps(s.getApps());
		p.play();
	}
	
	
	s.update(function(){
		s.getInfo();
		p.addSize(s.getSchedule());
		p.addApps(s.getApps());
		p.play();
	});
	
	setInterval(function () {
		if(navigator.onLine) {
			console.log('connected...');
		}
		else {
			console.log('disconnected!');
		}
	}, 10000);
	
	
	if (typeof(localStorage) == 'undefined' ) {
		console.log('Your browser does not support HTML5 localStorage. Try upgrading.');
	}
	else {
		try {
			console.log('Your browser support HTML5 localStorage.');
			//localStorage.setItem("name", "Hello World!"); //saves to the database, "key", "value"
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
				}
		}
	}
	
	$('#stop').click( function() {
		p.pause();
	} );
	
	$('#play').click( function() {
		p.play();
	} );
	
	$('#fwd').click( function() {
		p.next();
	} );
	
	$('#back').click( function() {
		p.previous();
	} );

});