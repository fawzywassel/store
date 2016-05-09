app.config(function($routeProvider) {
  $routeProvider.when('/', {
      templateUrl: "template/newUser.html",
      controller: "registerCtrl"
    })
    .when('/login', {
      templateUrl: "template/login.html",
      controller: "loginCtrl"
    })
    .when('/main', {
      templateUrl: 'template/main.html',
      controller: 'mainCtrl'
    })
    .when('/products', {
      templateUrl: 'template/products.html',
      controller: 'productsCtrl'
    })
    .when('/product', {
      templateUrl: 'template/product.html',
      controller: 'productCtrl'
    })
    .when('/order', {
      templateUrl: 'template/order.html',
      controller: 'orderCtrl'
    })
});



app.controller('registerCtrl', function($scope, $location) {
  $scope.newUser = function() {
    //Get submitted values
    var name = $scope.name;
    var password = $scope.password;


    //Create array with new user data
    var new_user = {
      "name": name,
      "password": password
    }
    $scope.users = []
    $scope.users.push(new_user);
    localStorage.setItem('users', JSON.stringify($scope.users));


    $location.url('/login')

  }

});

app.controller('loginCtrl', function($scope, $location) {
  $scope.getUser = function() {



    //Get submitted values
    var name = $scope.name;
    var password = $scope.password;

    var users = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < users.length; i++) {
      if (name == users[i].name && password == users[i].password) {
        $location.url('/main')
      }

    }

  }

});
app.controller('mainCtrl', function ($scope, $location, $rootScope, productsFactory) {
    var productArray = productsFactory.getProducts().then(function (res) {
        $scope.products = res
            // console.log($scope.products)
    });
    $scope.productDetails = function (product) {
        $rootScope.product = product;
        $location.url('/product')
    }
});


app.controller('productsCtrl', function ($scope, $location, $rootScope, productsFactory) {
    var productArray = productsFactory.getProducts().then(function (res) {
        $scope.products = res
            // console.log($scope.products)
    });
    $scope.productDetails = function (product) {
        $rootScope.product = product;
        $location.url('/product')
    }
});

app.controller('productCtrl', function ($scope, $rootScope) {
    $scope.product = $rootScope.product;
    $rootScope.select = $scope.product.name;
});



//
//
//
// $ionicPlatform.ready(function() {
//     if(device.platform === "iOS") {
//         window.plugin.notification.local.promptForPermission();
//     }
// });
// ionicApp.run(function($ionicPlatform, $rootScope, $timeout) {
//     $ionicPlatform.ready(function() {
//         if(window.cordova &amp;&amp; window.cordova.plugins.Keyboard) {
//             cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//         }
//         if(window.StatusBar) {
//             StatusBar.styleDefault();
//         }
//         window.plugin.notification.local.onadd = function (id, state, json) {
//             var notification = {
//                 id: id,
//                 state: state,
//                 json: json
//             };
//             $timeout(function() {
//                 $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
//             });
//         };
//     });
// });



app.controller('orderCtrl', function ($scope, $rootScope, productsFactory) {
    $scope.select = $rootScope.select;
    var productArray = productsFactory.getProducts().then(function (res) {
        $scope.products = res;
    });

    $scope.setprice = function (product) {
        console.log($scope.product)
    }
    $scope.visacheck = function () {
        var getnumber = false;
        if ($scope.selectedMethod == "visa") {
            getnumber = true;
        }
        return getnumber;
    }
//     $scope.add = function() {
//         var alarmTime = new Date();
//         alarmTime.setMinutes(alarmTime.getMinutes() + 1);
//         $cordovaLocalNotification.add({
//             id: "1234",
//             date: alarmTime,
//             message: "your product selectes is "+$scope.select,
//             title: "your order details",
//             autoCancel: false
//         }).then(function () {
//             console.log("The notification has been set");
//         });
//     };
//
//     $scope.isScheduled = function() {
//         $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
//             alert("Notification 1234 Scheduled: " + isScheduled);
//         });
//     }
//
//
});

app.directive("limitTo", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function (e) {
                if (this.value.length == limit) {
                    e.preventDefault();
                }
            })
        }
    }
})
