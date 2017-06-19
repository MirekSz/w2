angular.module('app')
    .component('userDetail', {
        bindings: { user: '<' },

        controller: function () {
            this.$onInit = function () {

            }
            this.showD = function () {
                alert('showD ' + JSON.stringify(this.user));
            }
        },
        templateUrl: 'app/userDetails.html'
    })
