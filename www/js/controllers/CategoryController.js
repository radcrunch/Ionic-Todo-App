todoApp.controller('CategoryController', function($scope, $ionicGesture, $ionicModal, $ionicPopup, $ionicPopover, $stateParams, TodoManager) {
    
      // Load or initialize categories
   LoadCategories();
    
    $scope.selectedCategory = null;
    
    
   //============= CATEGORIES ================      
       
    
    $scope.newCategory = function(){
        
        $scope.categoryModal.show();
    };
    
    $scope.toggleMenu = function(){
        $(".dropdown-menu").toggle();
    };
    
    $scope.closeNewCategory = function(){
        
        $scope.categoryModal.hide();
    };
    
    $scope.closeEditCategory = function(){
        
        $scope.editCategoryModal.hide();
    };
    
     $scope.updateCategory = function(selectedCategory){
         
         TodoManager.UpdateCategory(selectedCategory);
         
         LoadCategories();
         
         $scope.editCategoryModal.hide();
         
     };
    
    $scope.onCategoryDelete = function(categoryId){
     
       $ionicPopup.confirm({
	       title: 'Confirm Delete',
	       content: 'Are you sure you want to delete this category?'
	   }).then(function(res) {
           
	       if(res) {             
              
              $('.swipe-item-settings').hide();
               
		      TodoManager.DeleteCategory(categoryId);
               
		      LoadCategories();
	       } 
	   });     
    };
    
    $scope.onDeleteAllCategories = function(){
        if($scope.categories.length > 0){
        $ionicPopup.confirm({
	       title: 'Confirm Delete',
	       content: 'Are you sure you want to delete ALL categories?'
	   }).then(function(res) {
           
	       if(res) {             
               
		      TodoManager.DeleteAll();
               
		      LoadCategories();
                         
	       } 
	   });
      }
        $(".dropdown-menu").hide();
    }
    
    $scope.onSwipeLeft = function(elm){
        
        var swipedItem = $('.card[data-category-id="' + elm.category.id + '"]');

        swipedItem.find('.swipe-item-settings').show();
    };
    
    
    $scope.onSwipeRight = function(){
        
        $('.swipe-item-settings').hide();
    };
    
     $scope.onCategoryEdit = function(category)
     {
         $scope.selectedCategory = category;
         
         $scope.editCategoryModal.show();
     };
    
    $scope.onReorder = function (fromIndex, toIndex, itemId) {
        
        TodoManager.ReorderCategories(itemId, fromIndex, toIndex);
        
        LoadCategories();
    };
    
    $scope.reorderCategories = function(category, fromIndex, toIndex){
        
        TodoManager.ReorderCategories(category, fromIndex, toIndex);
        
        LoadCategories();
        
    };
    
    
    $scope.createCategory = function(category) {
        
      TodoManager.AddCategory(category);
    
      LoadCategories(); 
         
      $scope.categoryModal.hide();
         
      category.title = "";

    };       
    
    $scope.categorySearch = function(){
        
        $(".searchItem").val("");
        
        $(".searchItemWrapper").toggle();
        
        $scope.searchText = "";
        
    };
    
    
    
    function LoadCategories(){
        
        $scope.categories = TodoManager.GetCategories();   
    }
    
    //============= TEMPLATES ================
    
    $ionicModal.fromTemplateUrl('templates/addCategory.html', function(modal){
     $scope.categoryModal = modal;
    },
    {
        scope: $scope,
        animation: 'slide-in-down'
    });   
    
    $ionicModal.fromTemplateUrl('templates/editCategory.html', function(modal){
     $scope.editCategoryModal = modal;
    },
    {
        scope: $scope,
        animation: 'slide-in-down'
    });   


});