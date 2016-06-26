'use strict';

var Tradelog = angular.module("tradelog", ['ngRoute', 'ngResource', 'ngSanitize'])
    .config([
        '$httpProvider', '$locationProvider', '$routeProvider',
        function($httpProvider, $locationProvider, $routeProvider) {

            // configure html5 like urls (without # character)
            $locationProvider.html5Mode(true);
            $httpProvider.defaults.headers.common["Content-type"] = "application/json";
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
            var viewFolder = "/views/";

            $routeProvider.when("/", {
                templateUrl: viewFolder+"Dashboard.html",
                controller: "Dashboard",
                title: "Dashboard"
            })
            .when("/notes", {
                templateUrl: viewFolder+"Notes.html",
                controller: "Notes",
                title: "Notes"
            })
            .otherwise({
                templateUrl: viewFolder+"/Error404.html",
                controller: "Error404",
                title: "Error 404"
            });
        }
    ]);