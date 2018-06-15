app.controller('AddController', ['AddService', 'NgTableParams', function(AddService, NgTableParams){
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

    self.handleSubmit = function(){
        console.log('handling submit');
        AddService.submitToServer(self.input).then(function(response){
            self.requestEntries();
        })
    }

    self.requestEntries = function(){
        AddService.getEntries().then(function(response){
            console.log('successfully got entries, ', response);
            let data = AddService.entries.list;
            self.tableParams = new NgTableParams({count: data.length}, {dataset: data, counts: []});
        }).catch(function(error){
            console.log('error in service getting entries, ', error);
            
        })
    }
    
    self.requestEntries();
}]);