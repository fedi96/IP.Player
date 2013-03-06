/*
 * Region class
 * Class that defines a region of the player
 */

var Region = function() {
	//init
	// dimensions
	this.id = -1;
	this.layout = "";
	this.region = -1;
	this.left = -1;
	this.top = -1;
	this.width = -1;
	this.height = -1;
	this.stylecss = "";
	this.applications = new Array();
	this.currentApp = -1;
	this.isPaused = false;
	this.started = false;
	this.parent = "#content"
};


Region.prototype.addSize = function(dimensions) {
	this.left = dimensions.left * 100;
	this.top = dimensions.top * 100;
	this.width = dimensions.width * 100;
	this.height = dimensions.height * 100;
	this.layout = dimensions.layout;
	
	var el = $('<div id="' + this.layout + '" />');
		
	$(this.parent).append(el);
	
	var escaxe = "#"+this.layout;
	//$(escaxe).left(this.left + "%");
	//$(escaxe).top(this.top + "%");
	
	// VEM DO JSON EM DOUBLE, O QUE FAZER EM JS? MANTER DOUBLE? FAZER PX? %?
	$(escaxe).css('left', this.left + "%");
	$(escaxe).css('top', this.top);
	$(escaxe).css('width', this.width + "%");
	$(escaxe).css('height', this.height + "%");	
	
};

Region.prototype.addApps = function() {
	this.applications = p.getApps(this.region);
	//if(this.schedule) return this.schedule.seq.ref;
};

Region.prototype.addApps = function() {
	
	lstRegions = lstRegions instanceof Array ? lstRegions : [lstRegions];
	
	for (var i=0; i<lstRegions.length; i++) {
		this.regions.push(lstRegions[i]);
		//var s = new Region({layout:this.regions.layout});
		//var r[i] (algo dinamico q crie r0, r1 e por ai fora)
		//Region r[i] = new Region({el:'#region' + i});
	}
		
	console.log('regiao 0: ' + JSON.stringify(this.regions[0]));
	console.log('regiao 1: ' + JSON.stringify(this.regions[1]));
	
	this.getApps();
};



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
	this.regions = new Array();
	this.el = options.el;
	this.currentApp = -1;
	this.isPaused = false;
	this.started = false;
	//this.region = new Array(new Region());
	//Region r = new Object();
	
};

Player.prototype.addRegions = function(lstRegions) {
	
	console.log('addRegions() em JSON: ' + lstRegions);
	
	lstRegions = lstRegions instanceof Array ? lstRegions : [lstRegions];
	
	for (var i=0; i<lstRegions.length; i++) {
		this.regions.push(lstRegions[i]);
		//var s = new Region({layout:this.regions.layout});
		//var r[i] (algo dinamico q crie r0, r1 e por ai fora)
		//Region r[i] = new Region({el:'#region' + i});
		//var s = new Schedule({url:'appslayout.json'});
		
		//var data = "testVariable";
		//eval("var r_" + i + " = new Region({id:'i'})");
		//alert(r_i);
		var regiao = this.regions[i].layout;
		
		var cenas = "r"+i;
		console.log('nome da variavel: ' + cenas);
		
		//var data = "testVariable";
		var val = i+100;
		var objr = "new Region();";
		eval("var r" + i + "= "+ objr);
		//alert(rcenas);
				
		//this.getRegion(i);
	}
		
	console.log('regiao 0: ' + JSON.stringify(this.regions[0]));
	console.log('regiao 1: ' + JSON.stringify(this.regions[1]));
	
	console.log('variavel r0: ' + r0);
	console.log('variavel r1: ' + r1);
	//this.getApps();
	
	for (var i=0; i<this.regions.length; i++) {
		console.log("ANTES EVAL - left: " + r0.left + " top: " + r0.top + " width: " + r0.width + " height: " + r0.height);
		console.log("ANTES EVAL - left: " + r1.left + " top: " + r1.top + " width: " + r1.width + " height: " + r1.height);
		eval("r"+i+".addSize(this.regions[i])");
		//this.regions.push(lstRegions[i]);
		console.log("APOS EVAL - left: " + r0.left + " top: " + r0.top + " width: " + r0.width + " height: " + r0.height);
	}
	
};

Player.prototype.getRegion = function(nr) {

	if(this.regions[nr]) return this.regions[nr];
	//console.log('getregion number: ' + nr);
	//console.log('lstregion: ' + JSON.stringify(this.regions[nr]) + 'apps desta regions sao: ' + JSON.stringify(this.regions[nr].seq.ref));
	
};

Player.prototype.getApps = function(region) {
	
	//console.log('addRegions() em JSON: ' + lstRegions);
	
	//lstRegions = lstRegions instanceof Array ? lstRegions : [lstRegions];
	
	return this.regions[region].seq.ref;
	
	for (var i=0; i<this.regions.length; i++) {
		//para cada regiao criar a lista de apps
		this.applications.push(this.regions[i].seq.ref);
		//var s = new Region({layout:this.regions.layout});
		//var r[i] (algo dinamico q crie r0, r1 e por ai fora)
		//Region r[i] = new Region({el:'#region' + i});
	}
	
	console.log('apps da regiao 0: ' + JSON.stringify(this.applications[0]));
	console.log('apps da regiao 1: ' + JSON.stringify(this.applications[1]));
};


Player.prototype.addSize = function(dimensions) {
	this.left = dimensions.left * 100;
	this.top = dimensions.top * 100;
	this.width = dimensions.width * 100;
	this.height = dimensions.height * 100;
	//console.log('left: ' + this.left);
	//console.log('top: ' + this.top);
	//console.log('width: ' + this.width);
	//console.log('height: ' + this.height);
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
	this.next();
	
};

Player.prototype.pause = function() {
	console.log('entered pause; paused at: ' + this.currentApp);
	this.isPaused = true;
	//console.log('curduration: '+this.curDuration);
	clearTimeout(this.currTimeout);
	//clearTimeout(this.curFadeout);
	
};


Player.prototype.insertApp = function(app) {
	
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

Player.prototype.next = function() {
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

Player.prototype.next_ = function() {
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
 * Outro Next (desta vez acede às classes) - funciona correctamente
 */

Player.prototype.next3 = function() {
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
Schedule.prototype.getRegions = function() {
	if(this.schedule) return this.schedule.regions;
};

//devolve ao Player a lista de apps
Schedule.prototype.getApps = function() {
	if(this.schedule) return this.schedule.seq.ref;
};

// guarda id, name e lastupdate
Schedule.prototype.getInfo = function() {
	if(this.schedule) {
		this.id = this.schedule.id;
		this.name = this.schedule.name;
		this.lastUpdate = this.schedule.updatedOn;
	}
};

/*
 *  Main
 */
var p;
$(function() {

	var s = new Schedule({url:'appslayout.json'});
	p = new Player({el:'#content'});
	
	s.update(function(){
		s.getInfo(); // get id, name, updatedOn
		p.addSize(s.getSchedule()); // set dimensions of player (get dimensions of schedule)
		p.addRegions(s.getRegions());   // set regions of player (get lst regions)
		//p.addApps(s.getApps());
		//p.play();
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