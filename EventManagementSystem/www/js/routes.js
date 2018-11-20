angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.event', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/event.html',
        controller: 'eventCtrl'
      }
    }
  })

  .state('tabsController.organizer', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/organizer.html',
        controller: 'organizerCtrl'
      }
    }
  })

  .state('tabsController.venue', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/venue.html',
        controller: 'venueCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.login', {
    url: '/page7',
    views: {
      'tab4': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('activity', {
    url: '/page9',
    templateUrl: 'templates/activity.html',
    controller: 'activityCtrl'
  })

  .state('activityDetail', {
    url: '/page10',
    templateUrl: 'templates/activityDetail.html',
    controller: 'activityDetailCtrl'
  })

$urlRouterProvider.otherwise('/page1/page2')


});