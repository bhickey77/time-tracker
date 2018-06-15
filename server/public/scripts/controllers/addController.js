app.controller('AddController', ['AddService', 'ProjectService', 'NgTableParams', function(AddService, ProjectService, NgTableParams){
    let self = this;
    console.log('AddController woot');

    self.projects = [
        {
            name: 'Prime',
            id: 1
        },
        {
            name: 'Dog',
            id: 2
        },
        {
            name: 'House',
            id: 3
        },
        {
            name: 'Softball',
            id: 4
        }
    ]

    self.input = {};
    self.input.item = 'testtest';
    self.input.project = 'Dog';
    self.tableParams = {};

    self.handleSubmit = function(){
        console.log('handling submit');
        AddService.submitToServer(self.input).then(function(response){
            self.requestEntries();
        })
    }

    self.handleDelete = function(entry_id){
        console.log('deleting: ', entry_id);
        AddService.deleteFromServer(entry_id).then(function(response) {
            self.requestEntries();
        })
    }

    self.requestEntries = function(){
        AddService.getEntries().then(function(response){
            console.log('successfully got entries, ', response);
            let data = AddService.entries.list;
            console.log('request data: ', AddService.entries.list);
            self.tableParams = new NgTableParams({count: data.length}, {dataset: data, counts: []});
        }).catch(function(error){
            console.log('error in service getting entries, ', error);
            
        })
    }

    self.requestProjects = function(){
        ProjectService.getProjects().then(function(response){
            console.log('successfully got projects: ', response);
            self.projects = ProjectService.projects.list;
            console.log(ProjectService.projects);
            
        }).catch(function(error){
            console.log('error getting projects: ', error);
        })
    }
    
    self.requestEntries();
    self.requestProjects();
}]);