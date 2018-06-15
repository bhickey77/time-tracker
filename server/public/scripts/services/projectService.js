app.service('ProjectService', function($http){
    console.log('ProjectService woot');
    let sv = this;
    
    sv.projects = {list: []};

    sv.getProjects = function(){
        return $http({
            url: '/project',
            method: 'GET'
        }).then(function(response){
            console.log('successfully got back from the server: ', response.data);
            sv.projects.list = response.data;
        }).catch(function(error){
            console.log('error in the server: ', error);
        });
    }

})