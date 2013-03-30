
function onDeviceReady() {
   // Now safe to use the PhoneGap API
   // document.addEventListener("backbutton", onBackKeyDown, false);
   //document.addEventListener("menubutton", onMenuKeyDown, false);
  
   document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;
 		//alert(title);
  		//      console.warn('user data: ' + JSON.stringify(userData));
        navigator.notification.alert(title);
        
	});
	document.addEventListener("quitbutton", function () { 
	//turha, vanhaa..
              navigator.notification.confirm(
              'Do you want to quit', 
              onConfirmQuit, 
              'QUIT TITLE', 
               'OK,Cancel'  
              );
    }, true); 
    function exitFromApp()
    {
    //turha, vanhaa..
    	//alert("foo");
    	// console.log("in button");
    	navigator.device.exitApp();
     	//device.exitApp();
     	//navigator.app.exitApp();
    }    
    var uname = window.localStorage.getItem("username");
    var password = window.localStorage.getItem("password");
    var group1 = window.localStorage.getItem("group1");
    var group2 = window.localStorage.getItem("group2");
    var group3 = window.localStorage.getItem("group3");
    var group4 = window.localStorage.getItem("group4");
   $("input#username").val(uname);
   $("input#password").val(password);
   $("select#group1").val(group1);
   $("select#group2").val(group2);
   $("select#group3").val(group3);
   $("select#group4").val(group4);
   // $.defaultPageTransition:'none';
   
}

 function onDeviceReadylink(url) {
 //avaa linkit
 
 		 var uid = device.uuid;
         var ref = window.open(url + 'uuid=' + uid, '_blank', 'location=yes');
         ref.addEventListener('loadstart', function() {  });
         ref.addEventListener('loadstop', function() {  });
         ref.addEventListener('exit', function() { 
         //tähän joku jqueryui juttu redirectiin etusivulle
        $.mobile.changePage("index.html", null, true, true);
        var uname = window.localStorage.getItem("username");
    var password = window.localStorage.getItem("password");
    var group1 = window.localStorage.getItem("group1");
    var group2 = window.localStorage.getItem("group2");
    var group3 = window.localStorage.getItem("group3");
    var group4 = window.localStorage.getItem("group4");
    var token = window.localStorage.getItem("token");
    debug("token:" + token);
   $("input#username").val(uname);
   $("input#password").val(password);
   $("select#group1").val(group1);
   $("select#group2").val(group2);
   $("select#group3").val(group3);
   $("select#group4").val(group4);
   debug("takaisin",0);
 
       // alert("loading..");
       //alert(event.type);
       
       //nämä kolme riviä ovat paikkaamassa sitä ,että joskus selaimella takaisin palveluun tuleva näkee vain tyhjän sivun
       window.scrollTo(0,0);  
       $("input[type=text],textarea").blur(); 
       $.mobile.changePage('#start', { allowSamePageTransition: true, transition: "none" });
          });
 }

function initPushwoosh()
{
	var pushNotification = window.plugins.pushNotification;
	pushNotification.onDeviceReady();

	document.addEventListener('push-notification', function(event) {
   	    var title = event.notification.title;
   	    var userData = event.notification.userdata;

   	    if(typeof(userData) != "undefined") {
   			console.warn('user data: ' + JSON.stringify(userData));
   		}

   		navigator.notification.alert(title);
   		pushNotification.stopGeoPushes();
   		});
	//projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID"
	pushNotification.registerDevice({ projectid: "49475997089", appid : "A1598-F187F" },
		function(token) {
			onPushwooshInitialized(token);
		},
		function(status) {
									
		//alert(status + 'virhe');
		//console.warn(JSON.stringify(['failed to register ', status]));
		debug(JSON.stringify(['failed to register ', status]),1);
		});
	 debug('pushwoosh init1...',0);									
}

//set the settings for Pushwoosh or set tags, this must be called only after successful registration
function onPushwooshInitialized(pushToken)
{
//alert("in initialize" + pushToken);
	//output the token to the console
	//console.warn('push token: ' + pushToken);
	debug('push token: ' + pushToken,0);

	var pushNotification = window.plugins.pushNotification;

	//set multi notificaiton mode
	pushNotification.setMultiNotificationMode();
	
	//set single notification mode
	//pushNotification.setSingleNotificationMode();
	
	//disable sound and vibration
	pushNotification.setSoundType(1);
	pushNotification.setVibrateType(1);
	
	pushNotification.setLightScreenOnNotification(true);
	
	//goal with count
	//pushNotification.sendGoalAchieved({goal:'purchase', count:3});
	
	//goal with no count
	//pushNotification.sendGoalAchieved({goal:'registration'});

	//setting list tags
	//pushNotification.setTags({"MyTag":["hello", "world"]});
	
	//settings tags
	
	pushNotification.setTags({deviceName:"hello", deviceId:10},
		function(status) {
			//console.warn('setTags success');
			debug('setTags success',0);
		},
		function(status) {
			//console.warn('setTags failed');
			debug('setTags failed',0);
		});
		
	function geolocationSuccess(position) {
	//taitaa olla turha..
		pushNotification.sendLocation({lat:position.coords.latitude, lon:position.coords.longitude},
			function(status) {
				//console.warn('sendLocation success');
				debug('sendLocation success',0);
			},
			function(status) {
				//console.warn('sendLocation failed');
				debug('sendLocation failed',0);
			});
								 
	};
		
	// onError Callback receives a PositionError object
	//
	function geolocationError(error) {
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
	}
	
	function getCurrentPosition() {
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
	}
	
	//greedy method to get user position every 3 second. works well for demo.
//	setInterval(getCurrentPosition, 3000);
		
	//this method just gives the position once
//	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
		
	//this method should track the user position as per Phonegap docs.
//	navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, { maximumAge: 3000, enableHighAccuracy: true });

	//Pushwoosh Android specific method that cares for the battery
	pushNotification.startGeoPushes();
	debug('pushwoosh init2 ready...',0);
}

var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },

    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        initPushwoosh();

        app.report('deviceready');
        
        //optional: create local notification alert
		//pushNotification.clearLocalNotification();
		pushNotification.createLocalNotification({"msg":"Kaikki ajot käynnistyneet", "seconds":30, "userData":"optional"});
		debug("localpush piti tapahtua..",1);
    },
    
    report: function(id) {
        console.log("report:" + id);
        
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }

};

function doPost()
{
 	var uid = device.uuid;   
 	 var salt = "234430923409324";
          var token = MD5(jase.username.value + jas.password.value + salt);
  
        window.localStorage.setItem("token", token);
   	$.post('http://jasenpalvelu.pwire.fi/mobilelogin/', {name: jas.username.value,password:jas.password.value,uuid:uid,token:token},
    function(output){
        //$('#result').html(output).show();
        //alert(output);
        $('tallenna').val('Tallennettu');
		debug('username tallennettu palvelimelle');
    });
    //var value = window.localStorage.getItem("key");
        // value is now equal to "value"
        //window.localStorage.removeItem("key");
        window.localStorage.setItem("username", jas.username.value);
        window.localStorage.setItem("password", jas.password.value);
        window.localStorage.setItem("uid", uid);
       
       // window.localStorage.clear();
    
}

function doSaveSettings()
{
	window.localStorage.setItem("group1", ilm.group1.value);
	window.localStorage.setItem("group2", ilm.group2.value);
	window.localStorage.setItem("group3", ilm.group3.value);
	window.localStorage.setItem("group4", ilm.group4.value);
	alert('tiedot tallennettu puhelimeen');
	
	debug('tallennettu asetukset',0);
}

function debug (text,popup)
{
if(popup == 1)
{
	//alert(text);
}
	$('#connectstatus').append(text + '<br>');
	$('#connectstatus2').append(text + '<br>');
}