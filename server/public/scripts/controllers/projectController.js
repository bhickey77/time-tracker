app.controller('ProjectController', ['ProjectService', 'NgTableParams', '$mdDialog', function(ProjectService, NgTableParams, $mdDialog){
    let verbose = true;
    let self = this;
    verbose && console.log('ProjectController woot');
    
    self.tableParams = {};

    self.requestProjects = function(){
        ProjectService.getProjects().then(function(response){
            verbose && console.log('back from service: ', response);
            console.log('projects list: ', ProjectService.projects.list);
            let data = ProjectService.projects.list;
            self.tableParams = new NgTableParams({count: data.length}, {dataset: data, counts: []});
        })
    }

    self.handleDelete = function(project_id){
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
            $mdDialog.hide();
        })
    }

    self.status = '  ';
    self.customFullscreen = false;

    self.showProjectDialog = function(){
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: '../../views/dialogs/projectDialog.html',
            bindToController: true,
            locals: {
                close: function close(){
                    $mdDialog.cancel();
                },
                projects: self.projects,
                handleSubmit: self.handleSubmit,
                input: self.input
            },
            controller: function(){},
            controllerAs: 'vm',
            clickOutsideToClose: true
        });
    }

    self.requestProjects();

}]);