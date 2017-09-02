// Let's register Template7 helper so we can pass json string in links
Template7.registerHelper('json_stringify', function (context) {
    return JSON.stringify(context);
});

// Initialize your app
var myApp = new Framework7({
	 material: true,
	
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    template7Pages: true
    // Specify Template7 data for pages
  });
// Export selectors engine
var $$ = Dom7;
// function to get pedals
function getPedals() {
  $$.getJSON('Pedals.json', function (json) {
   myApp.template7Data.pedalslist =   json ;
  });
};
//function to get helmets
function getHelmets() {
  $$.getJSON('Helmets.json', function (json) {
   myApp.template7Data.helmetslist =   json ;
  });
};
//function to get chains
function getChains() {
  $$.getJSON('Chains.json', function (json) {
   myApp.template7Data.chainslist =   json ;
  });
};
//function to get frames
function getFrames() {
  $$.getJSON('Frames.json', function (json) {
   myApp.template7Data.frameslist =   json ;
  });
};
//function to get Saddles
function getSaddles() {
  $$.getJSON('Saddles.json', function (json) {
   myApp.template7Data.saddleslist =   json ;
  });
};


//Method Calls
getPedals();
getHelmets();
getChains();
getFrames();
getSaddles();

// Add main View
var mainView = myApp.addView('.view-main', {
	//enable inline pages
	domCache: true,
});

$$('.notification-single').on('click', function () {
    myApp.addNotification({
        message: 'Saved Test',

    });
});
function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime =' at '+ hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}



var testsArray = [];
var selectedIndex = -1;
$(document).on("ready", function () {
                init();
            });
			
			
			
			
			
			
			
function init(){
	$("#test-list").empty();
	if (localStorage.testRecord){
		testsArray =  JSON.parse(localStorage.testRecord);
		var listHTML = '<div class=\'list-block accordion-list inset\'>';
			for(var i=0; i < testsArray.length; i++)
			{ listHTML  += '<ul>';
			   listHTML += '<li class="accordion-item">';
			   listHTML += '<a href="#" class="item-link item-content">';	
			   listHTML += '<div class="item-inner">';	
			   listHTML += '<div class="item-title">' + "Test "+ [i+1] +' on '+ testsArray[i].date +'</div>';
			   listHTML += '</div>';
			   listHTML += '</a>';
			   listHTML += '<div class="accordion-item-content">';
			   listHTML += '<div class="content-block">';
			   listHTML += '<h4> Your chain was oiled and clean?</h4><p>'+"		"+ testsArray[i].chain +'</p>';
					listHTML +=  '<h4>Your tire presure was appropreate?</h4><p>'+"		"+ testsArray[i].pumped +'</p>';
					listHTML +=  '<h4>Your rubber was not worn?</h4><p>'+ testsArray[i].tires +'</p>';
					listHTML +=  '<h4>Your breakes where in working order?</h4><p>'+"		"+ testsArray[i].working +'</p>';
					listHTML +=  '<h4>Your lights shine bright & reflectors in the best position? :</h4><p>'+ testsArray[i].lights +'</p>';
					listHTML +=  '<h4>Your Comments:</h4><p>'+ testsArray[i].comments +'</p>';
					if(testsArray[i].lights == "Yes" && testsArray[i].chain == "Yes" && testsArray[i].pumped == "Yes" && testsArray[i].tires == "Yes" && testsArray[i].working == "Yes"){
						listHTML +=  '<h4>pass/fail?</h4><p>Your Checkup Passed, It is safe to ride today!</p>';

					}
					else{
						listHTML +=  '<p>Your Checkup failed, It is not to ride today!</p>';
					}
			   listHTML += '</div>';
			   listHTML += '</div>';
			   listHTML += '</li>';
               listHTML += '</ul>';
			}
			listHTML +='</div>';
		    $("#test-list").append(listHTML);
			
		}
		else{
			listHTML = '<div class="content-block">';
			listHTML += '<p>Opps! it seems you havent any checkups. <a href="#safety">Click Here</a> to create one!</p>';
			$("#test-list").append(listHTML);
			listHTML += '</div>';

		}
	}
	

	
	
	
$$('.get-storage-data').on('click', function() {
  var storedData = myApp.formGetData('Checkform');
  if(storedData) {	
   //create new date every form submition
	var date = new Date();
	//format this date using function
	var newdate = formatDate(date);
	//add this date to avascript object
	var date = newdate;
	var comments = storedData.comments
	var tires = storedData.tires;
	var pumped = storedData.pumped;
	var chain = storedData.chain;
	var working = storedData.working;
	var lights = storedData.lights
	var testobj = {date:date,comments:comments,lights:lights,tires:tires,pumped:pumped,chain:chain,working:working};
	if(selectedIndex === -1){
		testsArray.push(testobj);
	}
	else {
		testsArray.splice(selectedIndex,1,testobj);
	}
	localStorage.testRecord = JSON.stringify(testsArray);
	init();
  }
  else  {
	    alert('Opps, it seems some information has been entered incorrecly, please try again.')
  }
});