app.controller('ProjectController', ['ProjectService', 'NgTableParams', function(ProjectService, NgTableParams){
    let verbose = true;
    let self = this;
    verbose && console.log('ProjectController woot');
    
    self.tableParams = {};

    self.requestProjects = function(){
        ProjectService.getProjects().then(function(response){
            let data = ProjectService.projects.list;
            self.tableParams = new NgTableParams({count: data.length}, {dataset: data, counts: []});
        })
    }

    self.deleteProject = function(project_id){
        ProjectService.removeProjectFromServer(project_id).then(function(response){
            self.requestProjects();          
        })
    }

    self.handleSubmit = function(){
        ProjectService.addProjectToServer(self.input).then(function(response){
            self.requestProjects();
            for(field in self.input){
                self.input[field] = null;
            }
            // $mdDialog.hide();
        })
    }

    self.requestProjects();

}]);