/*
 * 	Player InstantPlaces
 * 	MEI 12/13 - Universidade do Minho
 */

Array.prototype.randomize = function() {
	var i = this.length, j, temp;
	while ( --i )
	{
		j = Math.floor(Math.random() * (i-1));
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
};


/*******************************************************************************************************************
 *************************************************** LOGS **********************************************************
 *******************************************************************************************************************/

var Logs = function(options) {
	
	console.log('A gerar o objecto Logs..')
	this.playerLog = this.getPlayerLog();

};

Logs.prototype.getPlayerLog = function() {
	
	var Slog = localStorage.getItem('playerLog');
	
	if(Slog == null) {
		var x = new Object();
		x.actions = new Array();
		return x;
	}
		
	var Olog = JSON.parse(Slog);
	
	return Olog;
};

Logs.prototype.setLog = function(logEntry) {
	
	//console.log('objecto: ' + JSON.stringify(this.playerLog));
	
	//console.log('recebi: ' + logEntry)
	var d = new Date();
	var str1 = d.toLocaleString();
	var ms = d.getMilliseconds();
	var Sdata = str1.concat(":",ms);
	//console.log('data 1: ' + Sdata)
	//console.log('ms: ' + ms)
	//var str2 = d.toLocaleTimeString();
	//console.log('data 2: ' + str2)
	//console.log('data: ' + Sdata)
	var id = this.playerLog.actions.length + 1;
	this.playerLog.actions.push({id:id,date:Sdata,log:logEntry});
	var Slog = JSON.stringify(this.playerLog); 
	localStorage.setItem('playerLog',Slog);
	
	//console.log('objecto: ' + JSON.stringify(this.playerLog));	
};

Logs.prototype.resetLog = function() {
	localStorage.removeItem('playerLog');
	console.log('log has been reseted...')
}


/*******************************************************************************************************************
 ************************************************** REGION *********************************************************
 *******************************************************************************************************************/

var Region = function(options) {
	
	console.log('A gerar o objecto Region...')
	
	this.scheduleType = localStorage.playerScheduleType;
	//init
	// dimensions
	
	this.region_id = null;
	this.region_name = null;
	
	this.left = null;
	this.top = null;
	this.width = null;
	this.height = null;
	this.minWidth = null;
	this.minHeight = null;
	
	this.scheduleItem = null;
	this.limitCycle = null;
	this.selector = null;
	
	this.el = null;
		
	this.containerList = new Array();
	
	this.currentApp = null;
	this.currentAppel = null;
	this.isPaused = false;
	this.started = false;
	
	this.currentCycle = 0;
	this.cycleExpired = false;
	this.overallExpired = false;
	
	this.checkScheduleType(options);
	
};

Region.prototype.showContent = function() {
	
	if(this.containerList) {
		for(var i=0; i<this.containerList.length; i++) {
			var cl = this.containerList[i];
			var src = cm.getAppSrc(cl.cid);
			playerLog.setLog("Region :: Content id:: " + cl.cid + " | src: " + src + " | dur: " + cl.dur);
			//console.log('showContent :: id: '+ cl.cid + ' | src: ' + src + ' | dur: ' + cl.dur)
		}
	}	
};

Region.prototype.addContent = function(elems) {
	
	elems = elems instanceof Array ? elems : [elems];
	
	playerLog.setLog("Region :: Adding content...");
	
	if (this.selector == "seq") {
		for (var i=0; i<elems.length; i++) {
			this.containerList.push(elems[i]);
		}
	}
	
	if(this.selector == "rnd") {
		for (var i=0; i<elems.length; i++) {
			this.containerList.push(elems[i]);
		}	
		this.containerList.randomize();
		console.log('cont list: ' + this.containerList);
	}
	this.insertFrame();
	this.showContent();
};

Region.prototype.resetCycle = function(){

	console.log('-- RESET CYCLE REGION --');
	console.log('reseting cycle of region: ' + this.region_id);
	//$(this.el).empty();
	var self = this;
	self.currentAppel = null;
		
	self.currentCycle = 0;
	self.cycleExpired = false;
	self.overallExpired = false;
	self.isPaused = false;
		
};

Region.prototype.insertFrame = function() {
	
	for(i=0; i<this.containerList.length; i++) {
		var app = this.containerList[i];
		console.log('-- INSERTING APP ' + app.cid + ' --')	
		var src = cm.getAppSrc(app.cid);
		
		//playerLog.setLog("Region :: Showing application: " + app.cid + " for " + app.dur + " seconds...");
		var id = this.region_id+'_'+app.cid;
		
		var el = $('<iframe sandbox="allow-same-origin allow-scripts" id="'+id+'" src="' + src + '" scrolling="no" />');
		//var el = $('<iframe id="app" src="' + src + '" scrolling="no" />');
		
		$(this.el).append(el);
		var elid = '#'+id;
		$(elid).hide();	
	}
	// sandbox="allow-same-origin allow-scripts"
	
};

Region.prototype.showApp = function(app) {
	
	// sandbox="allow-same-origin allow-scripts"
	//console.log('-- INSERTING APP ' + app.cid + ' --')	
	//var src = cm.getAppSrc(app.cid);
	var id = this.region_id+'_'+app.cid;
	this.currentAppel = '#'+id;
	$(this.currentAppel).show();
	
	//playerLog.setLog("Region :: Showing application: " + app.cid + " for " + app.dur + " seconds...");
	
	//var el = $('<iframe sandbox="allow-same-origin allow-scripts" id="app" src="' + src + '" scrolling="no" />');
	//var el = $('<iframe id="app" src="' + src + '" scrolling="no" />');
	
	//$(this.el).append(el);
};

Region.prototype.insertApp = function(app) {
	
	// sandbox="allow-same-origin allow-scripts"
	console.log('-- INSERTING APP ' + app.cid + ' --')	
	var src = cm.getAppSrc(app.cid);
	
	playerLog.setLog("Region :: Showing application: " + app.cid + " for " + app.dur + " seconds...");
	
	var el = $('<iframe sandbox="allow-same-origin allow-scripts" id="app" src="' + src + '" scrolling="no" />');
	//var el = $('<iframe id="app" src="' + src + '" scrolling="no" />');
	
	$(this.el).append(el);
};

Region.prototype.updateCurrentApp = function() {
	playerLog.setLog("Region :: Updating application...");
	if(this.currentApp==null) {
		//console.log('primeira vez!');
		this.currentApp = Math.abs((this.currentApp) % this.containerList.length);
	}
	else {
		//console.log('ja tenho numero');
		this.currentApp = Math.abs(((this.currentApp)+1) % this.containerList.length);
	}
};

Region.prototype.updateContentCycle = function() {
	playerLog.setLog("Region :: Updating cycle...");
	if((this.currentApp+1) >= this.containerList.length) {
		this.currentCycle++;
	}
	if(this.currentCycle >= this.limitCycle && this.cycleExpired == false) {
		this.cycleExpired = true;
		this.overallExpired = cm.notify(this.region_id);
	}
};

Region.prototype.next = function() {
	
	console.log('-- PLAYING REGION --');
	
	clearTimeout(this.currTimeout);
	console.log('reset timeout');
	
	var elapp = $('#app');

	console.log('------------- next app ---------------');
	console.log('ELEMENTO REGION: ' + this.el);
	//$(this.el).empty();
	
	if(this.currentAppel != null) {
		console.log('esconde: ' + this.currentAppel)
		$(this.currentAppel).hide();
	}
	
	//getNextApp
	console.log('previous app number: ' + this.currentApp + ' lenght lista: ' + this.containerList.length);
	console.log('region: ' + this.el + ' | limitCycle: ' + this.limitCycle + ' | currentCycle: ' + this.currentCycle);
	
	this.updateCurrentApp();

	this.updateContentCycle();
	
	//this.currentApp = ((Math.abs((this.currentApp) % this.containerList.length) + 1) % this.containerList.length);
	console.log('this is app number: ' + this.currentApp);
	var app = this.containerList[this.currentApp];
	this.showApp(app);	
	
	if(!this.isPaused) {
		var self = this;
		console.log('timeout: '+ app.dur);
		this.currTimeout = setTimeout(function () {
			playerLog.setLog("Region :: Time is up for application " + app.cid);
			if(self.overallExpired == true) {
				console.log('ALL REGIONS FINISHED THEIR OWN CYCLES');
				playerLog.setLog("Region :: Cycle completed");
				//self.pause();
				cm.resetCycle();
				cm.next();
			}
			else {
				console.log('SOME REGIONS ARE NOT DONE');
				self.next();
			}
		},app.dur * 1000);
	}
	
};

Region.prototype.play = function() {
	console.log('-- STARTING REGION PLAY --');
	playerLog.setLog("Region :: Showing Region: " + this.el);
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


Region.prototype.checkScheduleType = function(options) {
	
	//console.log('starting regions...')
	//console.log('checking schedule type...')
	
	if(this.scheduleType == "IP Schedule") {
		this.region_id = options.region_id;
		this.region_name = options.region_name;
		
		this.left = options.left;
		this.top = options.top;
		this.width = options.width;
		this.height = options.height;
		this.minWidth = options.minWidth;
		this.minHeight = options.minHeight;
		
		this.scheduleItem = options.scheduleItem;
		this.limitCycle = options.limitCycle;
		this.selector = options.selector;
		
		this.el = '#'+options.region_id;
				
		$(this.el).css({
			top: (this.top*100)+'%',
			left : (this.left*100)+'%',
			width : (this.width*100)+'%',
			height: (this.height*100)+'%',
			position: 'absolute'
		});

		var lstContent = options.containerList;
		//console.log('o que vejo: ' + lstRegions)
		this.addContent(lstContent);
		
	}
	
};

/*******************************************************************************************************************
 ************************************************** LAYOUT *********************************************************
 *******************************************************************************************************************/

var Layout = function(options) {
	
	console.log('A gerar o objecto Layout...')
	
	this.scheduleType = localStorage.playerScheduleType;
	// ids
	this.layout_id = null;
	this.layout_name = null;
	this.layout_dur = null;
	
	this.el = null;
	
	this.left = null;
	this.top = null;
	this.width = null;
	this.height = null;
	
	this.layoutCycle=0;
	
	this.regions = new Array();
	
	this.checkScheduleType(options);
	
};

Layout.prototype.showRegions = function() {
	
	if(this.regions) {
		for(var i=0; i<this.regions.length; i++) {
			var r = this.regions[i];
			console.log('showRegions of ' + this.layout_id)
			console.log('showRegions :: id: '+ r.region_id + ' | name: ' + r.region_name)
			console.log('showRegions :: left: ' + r.left + ' | top: ' + r.top + ' | width: ' + r.width + ' | height: ' + r.height + ' | minwidth: ' + r.minWidth + ' | minheight: ' + r.minHeight)
			console.log('showRegions :: type item: ' + r.scheduleItem + ' | selector: ' + r.selector)
			console.log('showRegions :: container list: ' + r.containerList)
		}
	}	
};

Layout.prototype.addRegions = function(lstRegions) {

	lstRegions = lstRegions instanceof Array ? lstRegions : [lstRegions];
	playerLog.setLog("Layout :: Creating Regions...");
	for (var i=0; i<lstRegions.length; i++) {
		$(this.el).append('<div id="'+lstRegions[i].region_id+'"></div>');
		playerLog.setLog("Layout :: Region id: " + lstRegions[i].region_id + " | name: " + lstRegions[i].region_name);
		playerLog.setLog("Layout :: Region CSS | left: " + lstRegions[i].left + " | top: " + lstRegions[i].top + " | width: " + lstRegions[i].width + " | height: " + lstRegions[i].height);
		var r = new Region(lstRegions[i]);
		
		//console.log('completed region ' + i)
		//console.log('lstregion[i]: ' + JSON.stringify(lstRegions[i]))
		//console.log('isto e r = new region: ' + JSON.stringify(r))
		
		this.regions.push(r);
		
		//console.log("region id: " + lstRegions[i].region_id);
	}
	
	//this.showRegions();

};

Layout.prototype.resetCycle = function(){

	console.log('-- RESET LAYOUT CYCLE --');
		
	//this.cycle=0;
	this.regions.forEach(function(region){
		region.pause();
		region.resetCycle();
	});
		
};

Layout.prototype.play = function(elLayout){
	
	console.log('-- STARTING LAYOUT PLAY --');
	console.log('el HTML layout: ' + elLayout);
	
	$(elLayout).show();
	playerLog.setLog("Layout :: Showing Layout: " + elLayout);
	console.log('-- Showing Layout ' + elLayout + ' --')
	
	this.regions.forEach(function(region){
		region.play();
	});
	
};

Layout.prototype.checkScheduleType = function(options) {
	
	//console.log('starting layouts...')
	//console.log('checking schedule type...')
	
	if(this.scheduleType == "IP Schedule") {
		this.layout_id = options.layout_id;
		this.layout_name = options.layout_name;
		this.layout_dur = options.layout_dur;
		this.el = '#'+options.layout_id;
		
		this.left = options.left || 0;
		this.top = options.top || 0;
		this.width = options.width || 1;
		this.height = options.height || 1;
		
		$(this.el).css({
			top: (this.top*100)+'%',
			left : (this.left*100)+'%',
			width : (this.width*100)+'%',
			height: (this.height*100)+'%',
			display: 'none',
			position: 'absolute'
		});

		var lstRegions = options.regions;
		//console.log('o que vejo: ' + lstRegions)
		this.addRegions(lstRegions);

	}
	
}



/*******************************************************************************************************************
 ****************************************** CONTENT MANAGEMENT *****************************************************
 *******************************************************************************************************************/

var ContentManagement = function(options){
	console.log('A gerar o objecto Content Management...')

	this.currentSchedule = null;
	this.scheduleType = null;
	
	this.el = options.el;
	
	this.left = 0;
	this.top = 0;
	this.width = 1;
	this.height = 1;
	
	$(this.el).css({
		top: (this.top*100)+'%',
		left : (this.left*100)+'%',
		width : (this.width*100)+'%',
		height: (this.height*100)+'%'
	});
	
	this.isPaused = false;
	this.currentLayout = null;
	this.previousLayout = null;
	
	this.apps = new Array();
	this.layouts = new Array();
	
};

ContentManagement.prototype.getSchedule = function() {
	
	var Sschedule = localStorage.getItem('playerSchedule');
	//console.log('ainda sou uma string: ' + Sschedule);
	
	var Oschedule = JSON.parse(Sschedule);
	//console.log('obj maybe? ' + Oschedule)
	//console.log('cenas: ' + Oschedule.schedule.applications)
	
	return Oschedule;
	
};

ContentManagement.prototype.getAppSrc = function(appid) {
	//console.log('entrei com o valor: ' + appid)
	if(this.apps) {
		//console.log('tenho cenas na lista')
		for(var i=0; i<this.apps.length; i++) {
			if(this.apps[i].id == appid) {
				//console.log('iguais') 
				return this.apps[i].src;
			}
		}
	}
	return null;
};

ContentManagement.prototype.showApps = function() {	
	if(this.apps) {
		for(var i=0; i<this.apps.length; i++) {
			var a = this.apps[i];
			console.log('showApps :: id: '+ a.id + ' | type: ' + a.type + ' | src: ' + a.src)
		}
	}
};

ContentManagement.prototype.addApps = function(lstApps) {

	lstApps = lstApps instanceof Array ? lstApps : [lstApps];
	playerLog.setLog("ContentManagement :: Adding applications...");
	for (var i=0; i<lstApps.length; i++) {
		//console.log("app id: "+ lstApps[i].id + " Type app: " + lstApps[i].type + " App src: " + lstApps[i].src);
		this.apps.push(lstApps[i]);
		playerLog.setLog("ContentManagement :: Application id: " + lstApps[i].id + " | type: " + lstApps[i].type + " | src: " + lstApps[i].src);
	}	
	//this.showApps();
};

ContentManagement.prototype.showLayouts = function() {
	
	if(this.layouts) {
		for(var i=0; i<this.layouts.length; i++) {
			var lx = this.layouts[i];
			console.log('showLayouts :: id: '+ lx.layout_id + ' | name: ' + lx.layout_name + ' | dur: ' + lx.layout_dur)
			console.log('showLayouts :: regions: ' + lx.regions)
		}
	}
};

ContentManagement.prototype.addLayouts = function(lstLayouts) {
	
	lstLayouts = lstLayouts instanceof Array ? lstLayouts : [lstLayouts];
	playerLog.setLog("ContentManagement :: Creating layouts...");
	for (var i=0; i<lstLayouts.length; i++) {
		$(this.el).append('<div id="'+lstLayouts[i].layout_id+'"></div>');
		//console.log('starting layout ' + i + '...')
		playerLog.setLog("ContentManagement :: Layout id: " + lstLayouts[i].layout_id + " | name: " + lstLayouts[i].layout_name + " | dur: " + lstLayouts[i].layout_dur);
		var l = new Layout(lstLayouts[i]);
		
		this.layouts.push(l); // insere a lista de layouts do normalContent
		
	}	
	//this.showLayouts();	
};

/* caso se queria varios tipos de construcao
ContentManagement.prototype.startScheduleType_IPSchedule = function(lstLayouts) {
	
	lstLayouts = lstLayouts instanceof Array ? lstLayouts : [lstLayouts];

	for (var i=0; i<lstLayouts.length; i++) {

		$(this.el).append('<div id="'+lstLayouts[i].layout_id+'"></div>');
		var l = new Layout(lstLayouts[i]);
		this.layouts.push(l); // insere a lista de layouts do normalContent
		
		console.log("layout id: "+ lstLayouts[i].layout_id + " layout name: " + lstLayouts[i].layout_name + " layout dur: " + lstLayouts[i].dur + " layout regions: " + lstLayouts[i].regions);
	}
	
	this.play();
	
};
*/

ContentManagement.prototype.next = function(){
	console.log('-- NEXT CONTENT --');
	//$(this.el).empty();
	
	if(this.currentLayout==null) {
		console.log('FIRST TIME CONTENT');
		this.currentLayout = Math.abs((this.currentLayout) % this.layouts.length);
		//this.cycle=0;
	}
	else {
		var previousLayout = this.currentLayout;
		var pLayout = this.layouts[previousLayout];
		var elPrevLayout = '#'+pLayout.layout_id;
		
		console.log('PREV LAYOUT: ' + previousLayout + ' Element: ' + elPrevLayout);
		
		$(elPrevLayout).hide(500);
		
		console.log('---------- NEW LAYOUT -----------');
		this.currentLayout = Math.abs(((this.currentLayout)+1) % this.layouts.length);
	}
	
	//$(elLayout).show();
	//getNextApp
	//this.currentLayout = Math.abs((this.currentLayout + 1) % this.normalContent.length);
	console.log('Layout number: ' + this.currentLayout + ' Layout list: ' + this.layouts.length);
	var layout = this.layouts[this.currentLayout];
	var elLayout = '#'+layout.layout_id;
	console.log("layout id: " + layout.layout_id + " | el HTML: " + elLayout);
	
	playerLog.setLog("ContentManagement :: Playing Layout ID: " + this.currentLayout);
	
	layout.play(elLayout); // vai ao l correspondente dessa lista e faz play()
	
};

ContentManagement.prototype.play = function(){
	
	console.log('-- STARTING PLAYING --');
	playerLog.setLog("ContentManagement :: Playing...");
	this.isPaused = false;
	this.next();	
};

ContentManagement.prototype.checkScheduleType = function() {
	
	//console.log('starting content management...')
	playerLog.setLog("ContentManagement :: Starting Content Management...");
	
	this.currentSchedule = this.getSchedule();
	this.scheduleType = localStorage.playerScheduleType;
	
	//console.log('checking schedule type...')
	
	if(this.currentSchedule == null) {
		playerLog.setLog("ContentManagement :: No schedule stored");
		// do something
	}
	else {
		if(this.scheduleType == "IP Schedule") {
			//var schedule_typeIP_apps = this.tempSchedule.schedule.applications;
			var lstApps = this.currentSchedule.schedule.applications;
			var lstLayouts = this.currentSchedule.schedule.normalContent;
			//console.log('generated apps: ' + lstApps)
			//console.log('generated layouts: ' + lstLayouts)
			this.addApps(lstApps);
			this.addLayouts(lstLayouts);
		}
	
		this.play();		
	}
	
}

ContentManagement.prototype.resetCycle = function(){

	console.log('-- RESET CONTENT CYCLE --');
	
	var layout = this.layouts[this.currentLayout];
	var elLayout = '#'+layout.layout_id;
	//console.log("var layout: " + layout.layout_id + "el layout: " + elLayout);
	
	layout.resetCycle();
	
};

ContentManagement.prototype.notify = function(regionid) {
	
	regionid = regionid instanceof Array ? regionid : [regionid];
	
	console.log('-- NOTIFIED FROM: ' + regionid + ' THAT HIS CYCLE ENDED --');
	
	var layout = this.layouts[this.currentLayout];
	
	var regions = 0;
	
	for (var i=0; i<layout.regions.length; i++) {
		
		if(layout.regions[i].currentCycle >= layout.regions[i].limitCycle) {
			regions++;
		}
		else { return false; }
		
	}
	
	if(regions>=layout.regions.length) {
		return true;
	}
	else {
		return false;
	}
	
};


/*******************************************************************************************************************
 ************************************************ SCHEDULE *********************************************************
 *******************************************************************************************************************/

var Schedule = function(options){
	
	console.log('A gerar o objecto Schedule...')
	
	this.tempSchedule = null;
	this.currentSchedule = localStorage.getItem('playerSchedule');
	this.scheduleType = localStorage.playerScheduleType;
	this.id = null;
	this.name = null;
	this.lastUpdate = null;
	this.etag = null;
	
};

Schedule.prototype.getCurrentSchedule = function() {
	
	// para converter a string em LS para objecto
	
	var Sschedule = localStorage.getItem('playerSchedule');
	//console.log('ainda sou uma string: ' + Sschedule);
	
	var Oschedule = JSON.parse(Sschedule);
	//console.log('obj maybe? ' + Oschedule)
	//console.log('cenas: ' + Oschedule.schedule.applications)
	
	return Oschedule;
	
};

Schedule.prototype.setScheduleData = function() {
	
	var sdata = this.getCurrentSchedule();
	
	if (this.scheduleType == "IP Schedule") {
		this.id = sdata.schedule.id;
		this.name = sdata.schedule.name;
		this.lastUpdate = sdata.schedule.updatedOn;
		this.etag = sdata.schedule.etag;
		playerLog.setLog("Schedule :: The type of schedule is: " + this.scheduleType);
	}	
}

Schedule.prototype.checkSchedule_TypeIP = function() {
	
	this.id = this.tempSchedule.schedule.id;
	this.name = this.tempSchedule.schedule.name;
	this.lastUpdate = this.tempSchedule.schedule.updatedOn;
	this.etag = this.tempSchedule.schedule.etag;
	
	if(this.id == null || this.name == null || this. lastUpdate == null || this.etag == null) {
		//console.log('entrei no 1 campo');
		return false;
	}
	
	var schedule_typeIP_apps = this.tempSchedule.schedule.applications;
	//schedule_typeIP_apps = schedule_typeIP_apps instanceof Array ? schedule_typeIP_apps : [schedule_typeIP_apps];
		
	for (var i=0; i<schedule_typeIP_apps.length; i++) {
		//console.log('exemplo: ' + schedule_typeIP_apps[i].id)
		if(schedule_typeIP_apps[i].id == null || schedule_typeIP_apps[i].type == null || schedule_typeIP_apps[i].src == null) {
			//console.log('entrei nof asle apps')
			return false;
		}
	}
		
	var schedule_typeIP_nc = this.tempSchedule.schedule.normalContent;
	
	for (var i=0; i<schedule_typeIP_nc.length; i++) {
		//console.log('exemplo: ' + schedule_typeIP_apps[i].id)
		if(schedule_typeIP_nc[i].layout_id == null || schedule_typeIP_nc[i].layout_name == null || schedule_typeIP_nc[i].layout_dur == null || schedule_typeIP_nc[i].regions == null) {
			//console.log('entrei nof asle')
			return false;
		}
		
		var schedule_typeIP_nc_region = schedule_typeIP_nc[i].regions;
		
		for (var j=0; i<schedule_typeIP_nc_region[j].length; j++) {
			if(schedule_typeIP_nc_region[j].region_id == null || schedule_typeIP_nc_region[j].region_name == null || schedule_typeIP_nc_region[j].left == null || schedule_typeIP_nc_region[j].top == null || schedule_typeIP_nc_region[j].width == null || schedule_typeIP_nc_region[j].height == null || schedule_typeIP_nc_region[j].minWidth == null || schedule_typeIP_nc_region[j].minHeight == null) {
				//console.log('entrei nof asle 2')
				return false;
			}			
		}		
	}
	
	// incompleto, falta a lista de content
	
	return true;
	

}
// recebe o schedule; verifica tipo de schedule (validade, tipo); compara com localstorage e guarda se for diferente

Schedule.prototype.changeSchedule = function() {

	this.currentSchedule = this.tempSchedule; // currentSchedule passa a ser o valor Obj do temp
	
	var Sschedule = JSON.stringify(this.currentSchedule); // converte o objecto para string
	//console.log('string schedule a gravar: ' + Sschedule)
	localStorage.setItem('playerSchedule', Sschedule); // grava a string em localstorage
	
	this.scheduleType = "IP Schedule";
	localStorage.playerScheduleType = this.scheduleType;
}

Schedule.prototype.checkSchedule = function(options, callback) {
	
	//console.log('Starting Schedule...')
	playerLog.setLog("Schedule :: Checking schedule...");
	
	this.tempSchedule = options;
	
	if(this.tempSchedule != null) {
		
		if(this.currentSchedule != JSON.stringify(this.tempSchedule)) {
			//console.log('Different schedules...')
			//console.log('Checking type')
		
			// verificar os varios tipos de schedule
			var typeIP = this.checkSchedule_TypeIP();
		
			//console.log('tipo do schedule: ' +typeIP)
		
			// verifica o tipo q foi devolvido a true
			if(typeIP == true) {
				this.changeSchedule();
				playerLog.setLog("Schedule :: The type of schedule is: " + this.scheduleType);
				//console.log('schedule type: ' + this.scheduleType);			
			}	
		}
		else {
			//console.log('Same schedules!')
			this.setScheduleData(); // se forem iguais
		}		
	}
	else {
		if(this.currentSchedule != null) {
			this.setScheduleData();
		}
		else {
			playerLog.setLog("Schedule :: No schedule available in storage...");
		}
	}
	
	/*
	if(this.currentSchedule != JSON.stringify(this.tempSchedule)) {
		console.log('Different schedules...')
		console.log('Checking type')
		
		// verificar os varios tipos de schedule
		var typeIP = this.checkSchedule_TypeIP();
		
		console.log('tipo do schedule: ' +typeIP)
		
		// verifica o tipo q foi devolvido a true
		if(typeIP == true) {
			this.changeSchedule();
			console.log('schedule type: ' + this.scheduleType);			
		}	
	}
	else {
		console.log('Same schedules!')
		this.setScheduleData(); // se forem iguais
	}
	*/
	
	callback();	

}


/*******************************************************************************************************************
 ************************************** SERVER COMMUNICATION *******************************************************
 *******************************************************************************************************************/

var ServerCommunication = function(options) {
	console.log('A gerar o objecto ServerCommunication...')
	this.url = options.url;
	this.playerUUID = localStorage.playerUUID;
	this.schedule = null;
};

ServerCommunication.prototype.auth = function(){
	playerLog.setLog("ServerCommunication :: Attempting to authenticate...");
	// metodo para enviar UUID por REST a uma entidade geral que regista os players
	if(this.playerUUID == localStorage.playerUUID) {
		playerLog.setLog("ServerCommunication :: Authenticated");
	}
	else {
		playerLog.setLog("ServerCommunication :: Failed to authenticate...");
		// declara schedule nulo, e indica 
	}
};

ServerCommunication.prototype.update = function(callback){
	
	playerLog.setLog("ServerCommunication :: Attempting to obtain a schedule...");
	
	var self = this;
	
	if(navigator.onLine) {
		$.getJSON(this.url,function(data){
		//self.schedule = data.schedule;
		self.schedule = data;
		
		if (callback && typeof(callback) === 'function')
			//callback(data.schedule);
			callback(data);
					
		});
		playerLog.setLog("ServerCommunication :: Schedule received");		
		
	}
	else {
		playerLog.setLog("ServerCommunication :: No connection active, switching to offline mode...");
		self.schedule = null;
		if (callback && typeof(callback) === 'function')
			callback();		
	}
	/*
	$.getJSON(this.url,function(data){
		//self.schedule = data.schedule;
		self.schedule = data;
		
		if (callback && typeof(callback) === 'function')
			//callback(data.schedule);
			callback(data);
					
	});
	*/
	
};

ServerCommunication.prototype.getSchedule = function(){
	return this.schedule;
};

/*******************************************************************************************************************
 ********************************************* INFORMATION *********************************************************
 *******************************************************************************************************************/

var Information = function(options){
	
	console.log('A gerar o objecto Information...')
	// Player UUID
	this.playerUUID = localStorage.playerUUID;
	
	// Screen info
	this.screenWidth = localStorage.screenWidth;
	this.screenHeight = localStorage.screenHeight;
	
	// Browser info
	this.userAgent = localStorage.userAgent;
	this.browserName = localStorage.browserName;
	this.fullVersion = localStorage.browserFullVersion;
	this.majorVersion = localStorage.browserMajorVersion;
	
	// OS info
	this.OSName = localStorage.OSName;
	this.OSVersion = localStorage.OSVersion;
	
	this.validInfo = localStorage.playerValidInfo;
	
};

Information.prototype.resetPlayer = function() {
	console.log('-- RESETTING PLAYER INFO --')
	localStorage.clear();
	console.log('-- RESET COMPLETE --')
}
	
Information.prototype.checkPlayerUUID = function() {
	if(this.playerUUID == null) {
		localStorage.playerUUID = uuid.v1();
		this.playerUUID = localStorage.playerUUID;
		//console.log('generated player uuid :: ' + this.playerUUID);
	}
}
	
Information.prototype.checkScreen = function() {
	if(this.screenWidth == null || this.screenHeight == null) {
		localStorage.screenWidth = 0 || screen.width;
		localStorage.screenHeight = 0 || screen.height;
		this.screenWidth = localStorage.screenWidth;
		this.screenHeight = localStorage.screenHeight;
		//console.log('generated screen info :: width x height: ' + this.screenWidth + ' x ' + this.screenHeight);
	}
}

Information.prototype.checkUserAgent = function() {
	if(this.userAgent == null) {
		localStorage.userAgent = navigator.userAgent;
		this.userAgent = localStorage.userAgent;
		
		//console.log('generated browser info :: user-agent: ' + this.userAgent)
	}
}


Information.prototype.checkBrowser = function() {
	if(this.userAgent != null) {
		if(this.browserName == null || this.fullVersion == null || this.majorVersion == null) {

			var nameOffset, verOffset, ix;
	
			// In Opera, the true version is after "Opera" or after "Version"
			if ((verOffset = this.userAgent.indexOf("Opera"))!=-1) {
		 		this.browserName = "Opera";
		 		this.fullVersion = this.userAgent.substring(verOffset+6);
		 		if ((verOffset = this.userAgent.indexOf("Version"))!=-1) 
		   			this.fullVersion = this.userAgent.substring(verOffset+8);
			}
			// In MSIE, the true version is after "MSIE" in userAgent
			else if ((verOffset = this.userAgent.indexOf("MSIE"))!=-1) {
		 		this.browserName = "Microsoft Internet Explorer";
		 		this.fullVersion = this.userAgent.substring(verOffset+5);
			}
			// In Chrome, the true version is after "Chrome" 
			else if ((verOffset = this.userAgent.indexOf("Chrome"))!=-1) {
		 		this.browserName = "Chrome";
		 		this.fullVersion = this.userAgent.substring(verOffset+7);
			}
			// In Safari, the true version is after "Safari" or after "Version" 
			else if ((verOffset = this.userAgent.indexOf("Safari"))!=-1) {
		 		this.browserName = "Safari";
		 		this.fullVersion = this.userAgent.substring(verOffset+7);
		 		if ((verOffset = this.userAgent.indexOf("Version"))!=-1) 
		   			this.fullVersion = this.userAgent.substring(verOffset+8);
			}
			// In Firefox, the true version is after "Firefox" 
			else if ((verOffset = this.userAgent.indexOf("Firefox"))!=-1) {
		 		this.browserName = "Firefox";
		 		this.fullVersion = this.userAgent.substring(verOffset+8);
			}
			// In most other browsers, "name/version" is at the end of userAgent 
			else if ((nameOffset = this.userAgent.lastIndexOf(' ')+1) < (verOffset = this.userAgent.lastIndexOf('/')) ) 
			{
		 		this.browserName = this.userAgent.substring(nameOffset,verOffset);
		 		this.fullVersion = this.userAgent.substring(verOffset+1);
		 		if (this.browserName.toLowerCase() == this.browserName.toUpperCase()) {
		  			this.browserName = navigator.appName;
		 		}
			}
			
			// trim the fullVersion string at semicolon/space if present
			if ((ix = this.fullVersion.indexOf(";"))!=-1)
		   		this.fullVersion = this.fullVersion.substring(0,ix);
			if ((ix = this.fullVersion.indexOf(" "))!=-1)
		   		this.fullVersion = this.fullVersion.substring(0,ix);
		
			this.majorVersion = parseInt(''+this.fullVersion,10);
			if (isNaN(this.majorVersion)) {
		 		this.fullVersion  = ''+parseFloat(navigator.appVersion); 
		 		this.majorVersion = parseInt(navigator.appVersion,10);
			}
			
			localStorage.browserName = this.browserName;
			localStorage.browserFullVersion = this.fullVersion;
			localStorage.browserMajorVersion = this.majorVersion;
		
			//console.log('generated browser data :: name - ' + this.browserName + ' fullversion: ' + this.fullVersion + ' major version: ' + this.majorVersion);
		}
	}
	
}

Information.prototype.checkOS = function() {
	if(this.userAgent != null) {
		
		if(this.OSName == null || this.OSVersion == null) {
		
			var verOffset;
		
			if ((verOffset = this.userAgent.indexOf("Mac OS X"))!=-1) {
	 			this.OSName = "Mac OS X";
	 			this.OSVersion = this.userAgent.substring(verOffset+9);
	 			this.OSVersion = this.OSVersion.split(")",1);
			}
			else if ((verOffset = this.userAgent.indexOf("Windows"))!=-1) {
	 			this.OSName = "Windows";
	 			this.OSVersion = this.userAgent.substring(verOffset+8);
	 			this.OSVersion = this.OSVersion.split(";",1);
	 			if (this.OSVersion=="NT 5.1") { this.OSVersion = "XP"; }
	 			else if (this.OSVersion=="NT 6.0") { this.OSVersion = "Vista"; }
	 			else if (this.OSVersion=="NT 6.1") { this.OSVersion = "7"; }
	 			else if (this.OSVersion=="NT 6.2") { this.OSVersion = "8"; }
	 			else { this.OSVersion = "Unknown"; }	
			}
			else if ((verOffset=this.userAgent.indexOf("X11"))!=-1) {
	 			this.OSName = "Linux";
	 			this.OSVersion = this.userAgent.substring(verOffset+4);
	 		}
	 		
	 		localStorage.OSName = this.OSName;
	 		localStorage.OSVersion = this.OSVersion;	
			
			//console.log('generated OS info :: name: ' + this.OSName + ' version: ' + this.OSVersion)
		}
	}
	
}

Information.prototype.showInfo = function() {
	playerLog.setLog("Information :: Player UUID: " + this.playerUUID);
	playerLog.setLog("Information :: Screen resolution (width x height): " + this.screenWidth + " x " + this.screenHeight);
	playerLog.setLog("Information :: User-Agent: " + this.userAgent);
	playerLog.setLog("Information :: Browser name: " + this.browserName);
	playerLog.setLog("Information :: Browser full version: " + this.fullVersion + " | Browser major version: " + this.majorVersion);
	playerLog.setLog("Information :: OS name: " + this.OSName + " | OS version: " + this.OSVersion);
	console.log('showInfo :: player uuid: ' + this.playerUUID);
	console.log('showInfo :: width x height: ' + this.screenWidth + ' x ' + this.screenHeight);
	console.log('showInfo :: useragent: ' + this.userAgent);
	console.log('showInfo :: browser data: name - ' + this.browserName + ' fullversion: ' + this.fullVersion + ' major version: ' + this.majorVersion);
	console.log('showInfo :: OS name: ' + this.OSName + ' version: ' + this.OSVersion);	
}


Information.prototype.setValidInfo = function() {
	
	localStorage.playerValidInfo = true;
	this.validInfo = localStorage.playerValidInfo;
		
	//console.log('player has valid info?: ' + this.validInfo)
}

Information.prototype.checkInfo = function(callback) {
	
	playerLog.setLog("Checking Player information...");	
	
	if(this.validInfo == null) {
		
		playerLog.setLog("Generating information...");
		//console.log('a gerar informacao do player...')
	
		this.checkPlayerUUID();
		this.checkScreen();
		
		this.checkUserAgent();
		this.checkBrowser();
		
		this.checkOS();
		
		this.setValidInfo();		
	}
	else {
		this.showInfo();		
	}
	
	if(this.validInfo != null && this.playerUUID != null) {
		if (callback && typeof(callback) === 'function') {
				//console.log('Finishing Information...')
				callback();
		}		
	}
	
	
};


/*******************************************************************************************************************
 ************************************************** MAIN ***********************************************************
 *******************************************************************************************************************/

var playerLog, m, s, cm;
$(function() {
	
	playerLog = new Logs();
	var i = new Information();
	sm = new ServerCommunication({url:'json/schedulerv4.json'});
	s = new Schedule();
	cm = new ContentManagement({el:'#content'});

	playerLog.setLog("Starting Player InstantPlaces...");

	i.checkInfo(function() {
		if(navigator.onLine) {
			//sm.auth();
			sm.update(function() {
				var temps = sm.getSchedule(); // obtem o ficheiro descarregado
				s.checkSchedule(temps, function() { // verifica o tipo de schedule e trata da config
					cm.checkScheduleType();
				});
			});
		}
		else {
			// nothing yet
		}
		
		
	});

		
	//s.update(function(){
		//p = new Player({el:'#content', schedule:s});
		//p.play();
	//});
	
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
		cm.pause();
	});
	
	$('#play').click( function() {
		cm.play();
	});
	
	$('#fwd').click( function() {
		cm.next();
	});
	
	$('#back').click( function() {
		cm.previous();
	});
	
});