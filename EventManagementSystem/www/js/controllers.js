angular.module('app.controllers', [])

  .controller('eventCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http) {
      $http.get("http://localhost:1337/")
        .then(function (response) {
          $scope.feeds = response.data;
          console.log($scope.feeds)
        });
    }
  ])

  .controller('organizerCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {}
  ])

  .controller('venueCtrl', ['$scope', '$stateParams', 'VenueServie', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, VenueServie) {
      $scope.venueList = VenueServie.getVenueNames()
    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$ionicHistory', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $ionicHistory, $ionicPopup) {
      $scope.data = {};

      $scope.login = function () {

        $http.post("http://localhost:1337/user/login", $scope.data)
          .then(function (response) {
            //$cookies.put('username',$scope.data.username)
            // A confirm dialog
            localStorage.setItem('username', $scope.data.username)
            var confirmPopup = $ionicPopup.confirm({
              title: 'Welcome back!' + localStorage.getItem('username'),
              template: 'Go back to previous page?'
            });

            confirmPopup.then(function (res) {
              if (res) {
                console.log($scope.data);
                $ionicHistory.goBack();
              } else {
                console.log('granted');
              }
            });

          }, function (response) {

            var alertPopup = $ionicPopup.alert({
              title: response.data,
              template: 'Login failed. Please try again.'
            });
          });

      }
    }
  ])

  .controller('activityCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http) {
      $http.get("http://localhost:1337/")
        .then(function (response) {
          var activities = response.data;
          if ($stateParams.id == 0) {
            $scope.activityList = [activities[0], activities[1]]
          } else {
            $scope.activityList = [activities[2], activities[3]]
          }
        });
    }
  ])

  .controller('registeredEventCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http) {
      $http.get("http://localhost:1337/user/registrationDetail/" + localStorage.getItem('username') + "/register")
        .then(function (response) {
          $scope.activities = response.data[0].register;
        });
    }
  ])

  .controller('activityDetailCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $ionicPopup, $ionicHistory) {
      $http.get("http://localhost:1337/activity/detail/" + localStorage.getItem('username') + "/" + $stateParams.id) ///activity/detail/:username/:id
        .then(function (response) {
          $scope.feed = response.data;
          console.log($scope.feed)
        });

      $scope.detailClick = function () {
        if ($scope.feed.registered) {
          var cancelRegister = $ionicPopup.confirm({
            title: 'Cancel this event?',
            template: 'Are you sure?'
          });
          cancelRegister.then(function (res) {
            if (res) {
              console.log($scope.data);
              $http.post("http://localhost:1337/user/" + localStorage.getItem('username') + "/register/remove/" + $stateParams.id).then(function (response) {
                $scope.registerResult = response.data; //"/user/" + username + "/register/remove/" + id
                console.log($scope.registerResult)
                var cancel = $ionicPopup.confirm({
                  template: 'Cancel successfully.'
                });
                $http.get("http://localhost:1337/activity/detail/" + localStorage.getItem('username') + "/" + $stateParams.id) ///activity/detail/:username/:id
                  .then(function (response) {
                    $scope.feed = response.data;
                    console.log($scope.feed)
                  });
                //history.go(0)
              });
            }
          });
        } else {
          var confirmRegister = $ionicPopup.confirm({
            title: 'Register this event?',
            template: 'Are you sure?'
          });
          confirmRegister.then(function (res) {
            if (res) {
              console.log($scope.data);
              $http.post("http://localhost:1337/user/" + localStorage.getItem('username') + "/register/add/" + $stateParams.id).then(function (response) {
                $scope.registerResult = response.data;
                console.log($scope.registerResult)
                if ($scope.registerResult == "Not enough quota") {
                  var notEnough = $ionicPopup.confirm({
                    template: 'Not enough quota'
                  });
                } else {
                  var successful = $ionicPopup.confirm({
                    template: 'Registered successfully.'
                  });
                  $http.get("http://localhost:1337/activity/detail/" + localStorage.getItem('username') + "/" + $stateParams.id) ///activity/detail/:username/:id
                    .then(function (response) {
                      $scope.feed = response.data;
                      console.log($scope.feed)
                    });
                  //history.go(0)
                }

              });
            }
          });
        }
      }

    }
  ])

  .controller('userInformationCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $state, $ionicPopup) {
      $scope.username = localStorage.getItem('username')

      $scope.logout = function () {
        $http.post("http://localhost:1337/user/logout", $scope.data)
          .then(function (response) {
            //$cookies.put('username',$scope.data.username)
            console.log($scope.data);
            localStorage.removeItem('username')
            $state.go('tabsController.login')
          }, function (response) {
            var alertPopup = $ionicPopup.alert({
              title: response.data,
              template: 'Login failed. Please try again.'
            });
          });
      }
      $scope.myRegisteredEvent = function () {
        if (localStorage.getItem('username') == 'student') {
          $state.go('tabsController.registeredEvent')
        } else {
          var alertPopup = $ionicPopup.alert({
            template: 'You have not logged in yet.'
          });
        }
      }

    }
  ])

  .controller('mapCtrl', ['$scope', '$stateParams', 'VenueServie', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, VenueServie) {
      var venueID;
      if ($stateParams.venueName == 'OEE1007') {
        venueID = 'Oen Hall Building (East)'
      } else if ($stateParams.venueName == 'AAB601') {
        venueID = 'Academic and Administration Building'
      } else if ($stateParams.venueName == 'LT1') {
        venueID = 'Joint Sports Centre'
      }
      console.log("location: " + VenueServie.getVenueNames(venueID)[0].Latitude)
      var map = L.map('map').setView([22.337827, 114.181962], 17);
      L.marker([VenueServie.getVenueLocation(venueID)[0].Latitude, VenueServie.getVenueLocation(venueID)[0].Longitude]).addTo(map)
        .bindPopup($stateParams.venueName);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }
  ])
