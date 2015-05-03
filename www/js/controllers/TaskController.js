todoApp.controller('TaskController', function($scope, $ionicModal, $ionicPopup, $ionicPlatform, $location, $stateParams, TodoManager) {
      
   scope.selectedCategory = [];
    
    $scope.selectedTask = null;
    
    $ionicPlatform.ready(function() {
        
        LoadTasks();
        
    });
    
    $scope.newTask = function(){
        
        $scope.taskModal.show();
    };
    
    $scope.closeNewTask = function(){
        
        $scope.taskModal.hide();
    };
    
    $scope.createTask = function(task){
        
      if(!task) {
        return;
      }          
      
      TodoManager.AddTask($scope.selectedCategory.id, task);
        
      LoadTasks();
          
      $scope.taskModal.hide();
    
       task.title = "";
    
      };
    
    $scope.onTaskDelete = function(taskId){
        
       $ionicPopup.confirm({
	       title: 'Confirm Delete',
	       content: 'Are you sure you want to delete this task?'
	   }).then(function(res) {
           
	       if(res) {             
               
		      TodoManager.DeleteTask($scope.selectedCategory.id,taskId);
               
		      LoadTasks();
	       } 
	   });
    };
    
    $scope.onTaskEdit = function(task)
     {   
        $scope.selectedTask = task;
        
        $scope.editTaskModal.show();
     };
    
    $scope.closeEditTask = function(){
        
        $scope.editTaskModal.hide();
    };
    
    $scope.updateTask = function(task){
        
        TodoManager.UpdateTask($scope.selectedCategory.id, task);
         
         LoadTasks();
         
         $scope.editTaskModal.hide();
    }
    
    $scope.reorderTasks = function(task, fromIndex, toIndex){
        
        TodoManager.ReorderTasks($scope.selectedCategory.id, task, fromIndex, toIndex);
        
        LoadTasks();
        
    };
    
    $scope.onReorder = function(fromIndex, toIndex, taskId){
        
        TodoManager.ReorderTasks($scope.selectedCategory.id, taskId, fromIndex, toIndex);
        
        LoadTasks();
    }
    
    $scope.backToCategoryList = function(){
          $location.path("/categories");
      };
    
    $scope.toggleTask = function(task){
        
        if(!task) 
        {
            return;
        }
        
        task.checked = !task.checked;
        
        // Inefficient, but save all the projects
        TodoManager.UpdateTaskState($scope.selectedCategory.id, task);     
        
        LoadTasks();
        
    };
    
    $scope.appliedClass = function(task){
        
        return task.checked ? 'completed' : '';
    };
    
    function LoadTasks(){
        
        var categoryTitle = $stateParams.categoryTitle;
        
        if(categoryTitle)
        {         
          $scope.selectedCategory = TodoManager.GetCategory(categoryTitle);           
        }
    };
    
    $scope.taskSearch = function(){
        
        $(".searchItem").val("");
        
        $(".searchItemWrapper").toggle();
        
        $scope.searchText = "";
    };
    
    $scope.toggleMenu = function(){
        $(".dropdown-menu").toggle();
    };
    
    $scope.onDeleteAllTasks = function(){
        
        if($scope.selectedCategory.tasks.length > 0){
            
        $ionicPopup.confirm({
	       title: 'Confirm Delete',
	       content: 'Are you sure you want to delete ALL tasks?'
	   }).then(function(res) {
           
	       if(res) {             
               
		      TodoManager.DeleteAllTasks($scope.selectedCategory.id);
               
		      LoadTasks();
	       } 
	   });
            
      }
        
     $(".dropdown-menu").hide();
        
    };
    
    $scope.onSwipeLeft = function(elm){
        
        var swipedItem = $('.card[data-task-id="' + elm.task.id + '"]');

        swipedItem.find('.swipe-item-settings').show();
    };
    
    
    $scope.onSwipeRight = function(){
        
        $('.swipe-item-settings').hide();
    };
    
    
    //============= TEMPLATES ================
    
    $ionicModal.fromTemplateUrl('templates/addTask.html', function(modal){
     $scope.taskModal = modal;
    },
    {
        scope: $scope,
        animation: 'slide-in-down'
    });
    
    $ionicModal.fromTemplateUrl('templates/editTask.html', function(modal){
     $scope.editTaskModal = modal;
    },
    {
        scope: $scope,
        animation: 'slide-in-down'
    });  
    
});