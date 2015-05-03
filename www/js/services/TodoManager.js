todoApp.factory('TodoManager', function() {
  return {
      
    GetCategories: function() {
      var categoriesString = window.localStorage['categories'];
      if(categoriesString) {
        return angular.fromJson(categoriesString);
      }
      return [];
    },
      
    SaveCategories: function(categories) {
      window.localStorage['categories'] = angular.toJson(categories);
    },
      
    AddCategory: function(category) {
        
        // Add a new category
         var categories = this.GetCategories();

         var categoryId = this.GetHighest(categories) + 1;
            
         category = {
            id: categoryId,
            title: category.title,
            tasks: [
            ]
          };
          
         categories.push(category);
            
         this.SaveCategories(categories);
           
    },      
      
    GetCategory: function(categoryTitle){
               
        var categories = this.GetCategories();
        
        var selectedCategory = $.grep(categories, function( item ) { return item.title == categoryTitle; });
          
        if(selectedCategory.length > 0){
              return  selectedCategory[0];
          }
        
        return [];
    },
    GetCategoryById: function(categories, categoryId){
                   
        var categoryToUpdate = $.grep(categories, function( item ) { return item.id == categoryId;});
        
        if(categoryToUpdate.length > 0){
            
            return categoryToUpdate[0];
        }
        
        return [];
    },
    AddTask: function(categoryId, task){
        
       var categories = this.GetCategories();
                            
       var categoryToUpdate = this.GetCategoryById(categories, categoryId);
               
       var taskId = this.GetHighest(categoryToUpdate.tasks) + 1;
           
        categoryToUpdate.tasks.push({
          id: taskId,
          title: task.title,
          checked: false
        });
        
        this.SaveCategories(categories);
    },      
    GetTask: function(categories, categoryId, taskId){
        
        var category = this.GetCategoryById(categories, categoryId);
        
        var task = $.grep(category.tasks,function( item ) { return item.id == taskId });
        
         if(task.length > 0){
             
             return task[0];
         }
        return [];
    },
  UpdateTaskState: function(categoryId, task){
      
      var categories = this.GetCategories();
                              
       var taskToUpdate = this.GetTask(categories, categoryId, task.id);
           
       taskToUpdate.checked = task.checked
         
       this.SaveCategories(categories);
    },
    DeleteAll: function(){
        window.localStorage['categories'] = "";
    },
    DeleteCategory: function(categoryId){
        
        var categories = this.GetCategories();
        
        if(categories.length > 1){
                       
            categories = categories.filter(function( obj ) {
                return obj.id !== categoryId;
            });
        }
        else
        {
            categories = [];
        }
        
        this.SaveCategories(categories);
    },
    DeleteAllTasks: function(categoryId){
        
        var categories = this.GetCategories();
        
        var categoryToUpdate = this.GetCategoryById(categories, categoryId);
        
        categoryToUpdate.tasks = [];
        
        this.SaveCategories(categories);
    },
    DeleteTask: function(categoryId,taskId){
        
       var categories = this.GetCategories();
                            
       var categoryToUpdate = this.GetCategoryById(categories, categoryId);
        
        categoryToUpdate.tasks = categoryToUpdate.tasks.filter(function( obj ) {
                return obj.id !== taskId;
            });
        
       this.SaveCategories(categories);
    },
    UpdateCategory: function(category){
          
          var categories = this.GetCategories();
          
          var categoryToUpdate = this.GetCategoryById(categories, category.id);
          
          categoryToUpdate.title = category.title;
          
          this.SaveCategories(categories);
      },
      UpdateTask: function(categoryId, task){
          
          var categories = this.GetCategories();
                              
          var taskToUpdate = this.GetTask(categories, categoryId, task.id);
          
          taskToUpdate.title = task.title
         
          this.SaveCategories(categories);
          
      },
      ReorderCategories: function(categoryId, fromIndex, toIndex){
          
          var categories = this.GetCategories();
          
          var category = this.GetCategoryById(categories,categoryId);
          
          categories = this.Reorder(categories, fromIndex, toIndex, category);
          
          this.SaveCategories(categories);
          
      },
      ReorderTasks: function(categoryId, taskId, fromIndex, toIndex){
          
          var categories = this.GetCategories();
          
          var categoryToUpdate = this.GetCategoryById(categories, categoryId);
                              
          var taskToUpdate = this.GetTask(categories, categoryId, taskId);
          
          categoryToUpdate.tasks = this.Reorder(categoryToUpdate.tasks, fromIndex, toIndex, taskToUpdate);
          
          this.SaveCategories(categories);                    
          
      },
      Reorder: function(array, fromIndex, toIndex, item){
          
          array.splice(fromIndex, 1);
        
          array.splice(toIndex, 0, item);
          
          return array;
      },
      GetHighest: function(array) {
        var max = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i].id > max)
                max = array[i].id;
            }
        return max;
      }
  }
});
