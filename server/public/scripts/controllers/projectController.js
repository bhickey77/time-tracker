app.controller('ProjectController', ['ProjectService', 'NgTableParams', function(ProjectService, NgTableParams){
    let verbose = false;
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

    self.requestProjects();

}]);