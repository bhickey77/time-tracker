app.controller('AddController', ['AddService', 'ProjectService', 'NgTableParams', '$mdDialog', function(AddService, ProjectService, NgTableParams, $mdDialog){
    let verbose = true;
    let self = this;
    verbose && console.log('AddController woot');

    self.input = {};
    self.tableParams = {};

    self.handleSubmit = function(){
        verbose && console.log('handling submit');
        AddService.submitToServer(self.input).then(function(response){
            self.requestEntries();
            for(field in self.input){
                self.input[field] = null;
            }
            $mdDialog.hide();
        })
    }

    self.handleDelete = function(entry_id){
        verbose && console.log('deleting: ', entry_id);
        AddService.deleteFromServer(entry_id).then(function(response) {
            self.requestEntries();
        })
    }

    self.requestEntries = function(){
        AddService.getEntries().then(function(response){
            verbose && console.log('successfully got entries, ', response);
            let data = AddService.entries.list;
            verbose && console.log('request data: ', AddService.entries.list);
            self.tableParams = new NgTableParams({count: data.length}, {dataset: data, counts: []});
        }).catch(function(error){
            verbose && console.log('error in service getting entries, ', error);
            
        })
    }

    self.requestProjects = function(){
        ProjectService.getProjects().then(function(response){
            verbose && console.log('successfully got projects: ', response);
            self.projects = ProjectService.projects.list;
            verbose && console.log(ProjectService.projects);
            
        }).catch(function(error){
            verbose && console.log('error getting projects: ', error);
        })
    }

    self.status = '  ';
    self.customFullscreen = false;

    self.showEntryDialog = function(){
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl: '../../views/entryDialog.html',
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

    
    self.requestEntries();
    self.requestProjects();
}]);