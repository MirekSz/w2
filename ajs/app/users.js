let module = angular.module('app');
module
    .component('users', {
        bindings: {users: '<'},
        controller: function () {
            this.clickHandler = function () {
                alert('something');
            }
        },
        templateUrl: 'app/users.html'
    });
