angular.module('directory.services', ['ngResource'])

    .factory('Employees', function ($resource) {
       return {
          	findById: $resource('/employees/id/:id', {id: '@id'}),
    		findByCity:  $resource('/employees/city/:city', {city: '@city'}),
    		findAll: $resource('/employees')
    };
    })