angular.module('directory.controllers', ['angularUtils.directives.dirPagination'])

    .controller('EmployeeListCtrl', function ($scope, Employees,$state) {

        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            //$scope.searchKey = "";
            $scope.employees = Employees.query();
        }

        $scope.search = function () {
            var name =  $scope.searchKey ;
            var selectType = $scope.searchType;
            
            if(selectType){
            switch(selectType.trim()) {
               
                case 'CITY':  
                            
                            $scope.employees = Employees.findByCity.query({city:name});
                            break;
                 case 'ID' :
                        $scope.employees = Employees.findById.query({id:name}); // this works   
                        break;
                default : 
                        $scope.employees = Employees.findAll.query(); 
                        break;
            }
            
            }
            else{
                $scope.employees = Employees.findAll.query(); 
            }
        }
        $scope.employees = Employees.findAll.query(); 
    })

    .controller('EmployeeDetailCtrl', function($scope, $stateParams, Employees) {
                
        $scope.employees = Employees.findById.query({id: $stateParams.employeeId});

    })
    
    .controller('PageChangeCtrl',function($scope,$http){

        $scope.pageChangeHandler = function(num) {
            
            //$scope.employees = $scope.employees.slice(0,5);
            getResultsPage(num);

            console.log('going to page ' + num);
        };

        function getResultsPage(pageNumber) {
        // this is just an example, in reality this stuff should be in a service
        $http.get('/employees/page/' + pageNumber)
            .then(function(result) {
                
                $scope.employees = result;
            });
    }

    })    ;