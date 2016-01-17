
'use strict';//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function($rootScope, $scope,$route,$location,$routeParams){

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
  
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.go = function(path) {
	$location.path(path);
  };
  
  $scope.numOfMember = {
	min: 1,
	max: 10,
	ceil: 10,
	floor: 1
  }; 
  $scope.level = {
	min: 1,
	max: 4,
	ceil: 4,
	floor: 1
  };
  
 
  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  // 
  // 'Scroll' screen
  // 
  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    /* global alert: false; */
    alert('Congrats you scrolled to the end of the list!');
  };

  // 
  // Right Sidebar
  // 
  $scope.chatUsers = [
    { name: 'Carlos  Flowers', online: true },
    { name: 'Byron Taylor', online: true },
    { name: 'Jana  Terry', online: true },
    { name: 'Darryl  Stone', online: true },
    { name: 'Fannie  Carlson', online: true },
    { name: 'Holly Nguyen', online: true },
    { name: 'Bill  Chavez', online: true },
    { name: 'Veronica  Maxwell', online: true },
    { name: 'Jessica Webster', online: true },
    { name: 'Jackie  Barton', online: true },
    { name: 'Crystal Drake', online: false },
    { name: 'Milton  Dean', online: false },
    { name: 'Joann Johnston', online: false },
    { name: 'Cora  Vaughn', online: false },
    { name: 'Nina  Briggs', online: false },
    { name: 'Casey Turner', online: false },
    { name: 'Jimmie  Wilson', online: false },
    { name: 'Nathaniel Steele', online: false },
    { name: 'Aubrey  Cole', online: false },
    { name: 'Donnie  Summers', online: false },
    { name: 'Kate  Myers', online: false },
    { name: 'Priscilla Hawkins', online: false },
    { name: 'Joe Barker', online: false },
    { name: 'Lee Norman', online: false },
    { name: 'Ebony Rice', online: false }
  ];

  //
  // 'Forms' screen
  //  
  $scope.rememberMe = true;
  $scope.email = 'me@example.com';
  
  $scope.login = function() {
    alert('You submitted the login form');
  };

  // 
  // 'Drag' screen
  // 
  $scope.notices = [];
  
  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };
});

/*app.controller('CreateEventController', function($scope,uiGmapGoogleMapApi){

	console.log("Loading createEventController");
	// Do stuff with your $scope.
	// Note: Some of the directives require at least something to be defined originally!
	// e.g. $scope.markers = []

	// uiGmapGoogleMapApi is a promise.
	// The "then" callback function provides the google.maps object.
    
	uiGmapGoogleMapApi.then(function(maps) {
		console.log("Google Map successfully loaded.");
		   
		   navigator.geolocation.getCurrentPosition(handle_geolocation_query);  
		     
		   function handle_geolocation_query(position){
		     console.log("Google Map successfully loaded."+position.coords.latitude);
			 console.log("Google Map successfully loaded."+position.coords.longitude);
             var LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		         var mapOptions = {
		           center: LatLng,
		           zoom: 16
		         };
		         var map = new google.maps.Map(document.getElementById("map"), mapOptions);
				 
                 var marker = new google.maps.Marker({
                     map: map,
                     position: LatLng,
                     title: 'You are here',
					 icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                 });
				 
                 marker.content = '<div class="infoWindowContent"></div>';
   
                 google.maps.event.addListener(marker, 'click', function(){
					 var infoWindow = new google.maps.InfoWindow();
                     infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
                     infoWindow.open($scope.map, marker);
                 });
		       }
					    $scope.openInfoWindow = function(e, selectedMarker){
					                     e.preventDefault();
					                     google.maps.event.trigger(selectedMarker, 'click');
					                 }
		   
	});	
	$scope.gPlace;// call google map autocomplete
	
	console.log('autocomplete'+$scope.gPlace);
});*/


app.controller('LoginController', ['$scope','Auth','$location',function($scope,Auth,$location){
 // var firebaseObj = new Firebase("https://intense-heat-1597.firebaseIO.com");
  
  $scope.user = {};
  $scope.FacebookSignIn=function(e){
	  console.log("Facebook Login");
	  Auth.$authWithOAuthPopup("facebook", function(error, authData) {
	    if (error) {
			console.log("Login Failed!", error);
	    } else {
	        console.log("Authenticated successfully with payload:", authData);
	    }
	  },{
		  remember:"sessionOnly",
		  scope:"email,user_likes"		
	  });
  }
  
  // Log a user in using email/password authentication
  $scope.SignIn = function(e){ 
     e.preventDefault();
     var username = $scope.user.email;
     var password = $scope.user.password;
	 
	 Auth.$authWithPassword({
	                 email: username,
	 		        password: password		
	 }).then(function(authData) {
		   $scope.signInError = false;
           console.log("Logged in as:", authData.uid);
       }).catch(function(error) {
		   $scope.signInError = true;
		   $scope.signInMessage = 'Login Failed. Please check your login or password';
           console.error("Authentication failed:", error);
       });
  }
}]);

app.controller('CreateUserController', ['$scope','Auth','$location',function($scope, Auth,$location) {
	var model = this;
    model.message = "";
    model.user = {
      username: "",
      password: "",
      confirmPassword: ""
    };
       model.submit = function(isValid) {
		  
       if (isValid) {
	   console.log("Create User Account");
         $scope.message = null;
         $scope.error = null;
	   var username = $scope.registration.user.email;
       var password = $scope.registration.user.password;
         Auth.$createUser({
           email: username,
           password: password
         }).then(function(userData) {
		   $location.path('/sportNews');
		   console.log("User created with uid: " + userData.uid);
         }).catch(function(error) {
		   $scope.createAccountError = true;
		   $scope.createAccountMessage = error.message;
		   console.log("Error creating user:", error.message);
         });
       };
    };
}]);

app.controller('CreateEventController', ['$scope','$location', 'ItemsService', function ($scope,$location, ItemsService) {
    
	$scope.newItem = { eventName: '', description: '',startDate:'',endDate:'', noOfPpl: '' };
    $scope.currentItem = null;
    $scope.items = ItemsService.getItems();
	
    $scope.addItem = function () {
		var startDate  = $scope.newItem.startDate;
		var endDate = $scope.newItem.endDate;
		var convStartDateToJSON = startDate.toJSON();
		var convEndDateToJSON = endDate.toJSON();
		var obj= { eventName: $scope.newItem.eventName, 
			       description:$scope.newItem.description,
			       startDate:convStartDateToJSON,
			       endDate:convEndDateToJSON, 
			       noOfPpl:$scope.newItem.noOfPpl
		         };
   
        ItemsService.addItem(angular.copy(obj));
        $scope.newItem = { eventName: '', description: '',startDate:'',endDate:'', noOfPpl: '' };
    };

    $scope.updateItem = function (id) {
        ItemsService.updateItem(id);
    };

    $scope.removeItem = function (id) {
		ItemsService.removeItem(id);
    };
    
    $scope.today = function() {
       $scope.newItem.startDate = new Date();
	   $scope.newItem.endDate = new Date();
     };
     $scope.today();

     $scope.clear = function() {
       $scope.newItem.startDate = null;
	   $scope.newItem.endDate = null;
     };
     // Disable weekend selection
     $scope.disabled = function(date, mode) {
       return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
     };

     $scope.toggleMin = function() {
       $scope.minDate = $scope.minDate ? null : new Date();
     };

     $scope.toggleMin();
     $scope.maxDate = new Date(2020, 5, 22);

     $scope.open1 = function() {
       $scope.popup1.opened = true;
     };

     $scope.open2 = function() {
       $scope.popup2.opened = true;
     };

     $scope.setDate = function(year, month, day) {
       $scope.dt = new Date(year, month, day);
     };

     $scope.dateOptions = {
       formatYear: 'yy',
       startingDay: 1
     };

     $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
     $scope.format = $scope.formats[0];
     $scope.altInputFormats = ['M!/d!/yyyy'];

     $scope.popup1 = {
       opened: false
     };

     $scope.popup2 = {
       opened: false
     };

     var tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1);
     var afterTomorrow = new Date();
     afterTomorrow.setDate(tomorrow.getDate() + 1);
     $scope.events =
       [
         {
           date: tomorrow,
           status: 'full'
         },
         {
           date: afterTomorrow,
           status: 'partially'
         }
       ];

     $scope.getDayClass = function(date, mode) {
       if (mode === 'day') {
         var dayToCheck = new Date(date).setHours(0,0,0,0);

         for (var i = 0; i < $scope.events.length; i++) {
           var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

           if (dayToCheck === currentDay) {
             return $scope.events[i].status;
           }
         }
       }

       return '';
     };
	
}]);
