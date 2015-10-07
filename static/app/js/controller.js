'use strict';

app.controller('MasterCtrl', ['$scope', '$modal', 'personServices', function($scope, $modal, personServices) {

    personServices.getPerson()
        .then(function(data) {
            $scope.persons = data;
        },
        function(data) {
           console.log('error', data);
        });

    $scope.addPerson = function() {

        console.log("addPerson");

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'addModalContent.html',
            controller: 'addModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                //index: id
            }
        });

        modalInstance.result
            .then(function (person) {
                $scope.persons.push(person);

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

    $scope.editPerson = function(formData) {

        console.log("editPerson");

        var personData = angular.copy(formData);

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'addModalContent.html',
            controller: 'editModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                formData: personData
            }
        });

        modalInstance.result
            .then(function (person) {

                for(var i = 0; i < $scope.persons.length; i++) {
                    if($scope.persons[i].id == person.id) {
                        $scope.persons[i] = person;
                    }
                }

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

    $scope.deletePerson = function(id) {

        console.log("deletePerson");

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModalContent.html',
            controller: 'deleteModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                index: id
            }
        });

        modalInstance.result
            .then(function (deleted_id) {

                for (var i = 0; i < $scope.persons.length; i++) {
                    if ($scope.persons[i].id == deleted_id) {
                        $scope.persons.splice(i, 1);
                    }
                }

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

}]);


app.controller('addModalInstanceCtrl', ['$scope', '$modalInstance', 'personServices', function ($scope, $modalInstance, personServices) {

    $scope.model = {'first_name': '', 'last_name': '','email': '', 'age': ''};

    $scope.save = function () {

        personServices.addPerson($scope.model)
            .then(function(data) {

                $modalInstance.close(data);

            }, function(data) {
               console.log('error', data);
            });
    };

    $scope.cancel = function () {
       $modalInstance.dismiss('cancel');
    };

}]);


app.controller('editModalInstanceCtrl', ['$scope', '$modalInstance', 'personServices', 'formData', function ($scope, $modalInstance, personServices, formData) {

    $scope.model = formData;

    $scope.save = function () {

        personServices.editPerson($scope.model)
            .then(function(data) {

                $modalInstance.close(data);

            }, function(data) {
                console.log('error', data);
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);


app.controller('deleteModalInstanceCtrl', ['$scope', '$modalInstance', 'index', 'personServices', function ($scope, $modalInstance, index, personServices) {

    $scope.ok = function () {
        personServices.deletePerson(index)
            .then(function(data) {

                $modalInstance.close(index);

            }, function(data) {
               console.log('error', data);
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

