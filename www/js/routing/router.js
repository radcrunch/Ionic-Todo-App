
todoApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('categories', {
            url: '/categories',
            templateUrl: 'templates/categories.html',
            controller: 'CategoryController'
        })
        .state('categoryTasks', {
            url: "/categories/:categoryTitle",
            templateUrl: "templates/categoryTasks.html",
            controller: "TaskController"
        });
    $urlRouterProvider.otherwise('/categories');
});