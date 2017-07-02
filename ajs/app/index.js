let app = angular.module('app', ['ui.router']);
app.controller('PersonController', function () {
    this.person = { name: 'mirek' }
});
app.config(function ($stateProvider, $urlServiceProvider) {
    $urlServiceProvider.rules.otherwise({ state: 'userlist' });

    $stateProvider.state('userlist', {
        url: '/users',
        component: 'users',
        resolve: {
            users: function (UserService) {
                return UserService.list();
            }
        }
    });

    $stateProvider.state('userlist.detail', {
        url: '/:userId',
        views: {
            'main': {
                component: 'userDetail'
            },
              'b': {
                component: 'userDetail'
            }
        },
        resolve: {
            user: function ($transition$, users) {
                debugger
                var res = users.find(user => user.id == $transition$.params().userId);
                console.log('res', res);
                return res;
            }
        }

    });

});

app.service('UserService', function ($http) {
    return {
        list: function () {
            return $http.get('./data/users.json', { cache: true }).then(resp => resp.data)
        }
    };
});

// preload resources in case plunker times out
app.run(function ($http, $templateRequest) {
    $http.get('data/users.json', { cache: true });
})
