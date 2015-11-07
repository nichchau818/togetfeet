
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

app.controller('CreateEventController', function($scope,uiGmapGoogleMapApi){

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
});


app.controller('LoginController', ['$scope','$firebaseSimpleLogin',function($scope,$firebaseSimpleLogin){
  var firebaseObj = new Firebase("https://intense-heat-1597.firebaseIO.com");
  var loginObj = $firebaseSimpleLogin(firebaseObj);
  
  // Log a user in using email/password authentication
  $scope.user = {};
  $scope.SignIn = function(e){ 
     e.preventDefault();
     var username = $scope.user.email;
     var password = $scope.user.password;
	
     loginObj.$login('password', {
                email: username,
		        password: password
            })
            .then(function(user) {
                //Success callback
                console.log('Authentication successful');
            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
            });
  }
}]);
