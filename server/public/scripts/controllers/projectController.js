app.controller('ProjectController', ['ProjectService', 'NgTableParams', '$mdDialog', function(ProjectService, NgTableParams, $mdDialog){
    let verbose = true;
    let self = this;
    verbose && console.log('ProjectController woot');
    
    self.tableParams = {};

    self.new_project_name = '';
    self.update_name = '';
    self.update_id = '';

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

    self.handleSubmit = function(new_project_name){
        verbose && console.log(`handling submit: `, new_project_name);
        ProjectService.addProjectToServer(new_project_name).then(function(response){
            self.requestProjects();
            self.new_project_name = '';
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
                new_project_name: self.new_project_name
            },
            controller: function(){},
            controllerAs: 'vm',
            clickOutsideToClose: true
        });
    }

    self.displayUpdateDialog = function(id, name){
        self.update_id = id;
        self.update_name = name;
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: '../../views/dialogs/projectUpdateDialog.html',
            bindToController: true,
            locals: {
                close: function close(){
                    $mdDialog.cancel();
                },
                projects: self.projects,
                handleUpdate: self.handleUpdate,
                input: self.input,
                update_id: self.update_id,
                update_name: self.update_name
            },
            controller: function(){},
            controllerAs: 'vm',
            clickOutsideToClose: true
        });
    }

    self.handleUpdate = function(update_name){
        ProjectService.updateProjectOnServer(self.update_id, update_name).then(function(){
            self.requestProjects();
            $mdDialog.hide();
        });
    }   

    self.requestProjects();

}]);