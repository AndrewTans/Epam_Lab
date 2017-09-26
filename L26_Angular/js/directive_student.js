const app = angular.module('studentsList', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('main', {
            url: "/",
            template: `<button type="button" ui-sref="list">Students</button>`
        })
        .state('list', {
            url: "/list",
            template: `<students id="student.id" name="student.name" 
        surname="student.lastName" image="student.image" 
        ng-repeat="student in $ctrl.cool"></students>`
        })
        .state('student', {
            url: "/student/:id",
            template: `<student></student>`
        });
});

app.factory('studentsFactory', function() {
    return [{
        id: 0,
        name: 'Liudmyla',
        lastName: 'Bashta',
        image: 'https://i.pinimg.com/736x/0a/62/86/0a62867eac5a51755bbc973541f617be--beach-sunset-photography-photography-pics.jpg',
        birthDate: '30.07.1993',
        phone: '093-456-65-21'
    }, {
        id: 1,
        name: 'Roman',
        lastName: 'Chapkailo',
        image: 'https://i.pinimg.com/736x/0a/62/86/0a62867eac5a51755bbc973541f617be--beach-sunset-photography-photography-pics.jpg',
        birthDate: '30.07.1993',
        phone: '093-456-65-21'
    }, {
        id: 2,
        name: 'Khrystyna',
        lastName: 'Dalivska',
        image: 'https://i.pinimg.com/736x/0a/62/86/0a62867eac5a51755bbc973541f617be--beach-sunset-photography-photography-pics.jpg',
        birthDate: '30.07.1993',
        phone: '093-456-65-21'
    }, {
        id: 3,
        name: 'Ivan',
        lastName: 'Gnatyshyn',
        image: 'https://i.pinimg.com/736x/0a/62/86/0a62867eac5a51755bbc973541f617be--beach-sunset-photography-photography-pics.jpg',
        birthDate: '30.07.1993',
        phone: '093-456-65-21'
    }, {
        id: 4,
        name: 'Andrii',
        lastName: "Hun'ka",
        image: 'https://i.pinimg.com/736x/0a/62/86/0a62867eac5a51755bbc973541f617be--beach-sunset-photography-photography-pics.jpg',
        birthDate: '30.07.1993',
        phone: '093-456-65-21'
    }];
});

app.controller('MyCoolController', ['$scope', '$state', 'studentsFactory', function($scope, $state, studentsFactory) {
    this.cool = studentsFactory;

}])

app.directive('students', function factory() {
    var directiveDefinitionObject = {
        templateUrl: '../pages/students.html',
        transclude: false,
        scope: {
            id: '=',
            name: '=',
            surname: '=',
            image: '='
        },
        controller: function($scope, $element, $attrs, $transclude, studentsFactory) {}
    };
    return directiveDefinitionObject;
});

app.directive('student', function factory() {
    var directiveDefinitionObject = {
        templateUrl: '../pages/student.html',
        transclude: false,
        controller: function($scope, $state, $element, $attrs, $transclude, $stateParams, studentsFactory) {

            let studentId = $stateParams.id;

            $scope.id = studentsFactory[studentId].id;
            $scope.name = studentsFactory[studentId].name;
            $scope.surname = studentsFactory[studentId].lastName;
            $scope.image = studentsFactory[studentId].image;
            $scope.birthDate = studentsFactory[studentId].birthDate;
            $scope.phone = studentsFactory[studentId].phone;

            $scope.editFunc = function() {
                $scope.show = true;
            }
            $scope.close = function() {
                studentsFactory[studentId] = {
                    id: studentId,
                    name: $scope.name,
                    lastName: $scope.surname,
                    image: 'https://i.pinimg.com/736x/0a/62/86/0a62867eac5a51755bbc973541f617be--beach-sunset-photography-photography-pics.jpg',
                    birthDate: $scope.birthDate,
                    phone: $scope.phone
                }
                $scope.show = false;
            }
        }
    };
    return directiveDefinitionObject;
});