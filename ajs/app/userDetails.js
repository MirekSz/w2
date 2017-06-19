angular.module('app')
    .component('userDetail', {
        bindings: { user: '<' },

        controller: function () {
            this.$onInit = function () {

            }
            this.showD = function () {
                debugger;
                alert('showD ' + JSON.stringify(this.user));
            }
        },
        templateUrl: 'app/userDetails.html'
    })
