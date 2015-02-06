// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'form-profile.html'
        })
        
        // url will be /form/interests
        .state('form.message', {
            url: '/message',
            templateUrl: 'form-message.html'
        })
        
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'form-payment.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/profile');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $location, $anchorScroll, $http) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.formKey = '1h3zYqSC4jrg03_6yAYEkzi8DwtZo7VZFhIUqqiRTXLY';
    $scope.message="Awesome!!"

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
      $location.url($location.path());
   }
    
    // function to process the form
    $scope.processForm = function() {

        $http.post("https://docs.google.com/forms/d/" + $scope.formKey + "/formResponse", $scope.formData).
        success(function(data, status, headers, config){
            alert('awesome!');  
        });


        
    };
    
})

.controller('mainController', function($scope, $location, $anchorScroll){
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
      $location.url($location.path());
   }
})

.directive('postsToGoogleForms', function($state){
    return {
        restrict: "A",
        link: function(scope, element, attributes) {
            element.bind('click', function(){

               var googleForm = $(window).jqGoogleForms({"formKey": "1h3zYqSC4jrg03_6yAYEkzi8DwtZo7VZFhIUqqiRTXLY"});

                googleForm.sendFormData({
                    "entry.615795479": scope.formData.name,
                    "entry.522010502": scope.formData.email
                });

                $state.go('form.message');

                
            });
        }
    };
});