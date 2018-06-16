app.service('ProjectService', function($http){
    let verbose = false;
    verbose && console.log('ProjectService woot');
    let sv = this;
    
    sv.projects = {list: []};

    sv.getProjects = function(){
        return $http({
            url: '/project',
            method: 'GET'
        }).then(function(response){
            verbose && console.log('successfully got back from the server: ', response.data);
            sv.projects.list = sv.formatProjects(response.data);
        }).catch(function(error){
            verbose && console.log('error in the server: ', error);
        });
    }

    sv.formatProjects = function(projects){
        return projects.map(function(project){
            let hours = Math.floor(project.total_entry_time_milliseconds/3600000);
            let remainingMinutes = ((project.total_entry_time_milliseconds % 3600000)/60000).toFixed();
            project.time_spent = hours + ':' + ((remainingMinutes<10) ? ('0' + remainingMinutes) : remainingMinutes);
            return project;
        });
    }

    sv.removeProjectFromServer = function(project_id){
        return $http({
            url: `/project${project_id}`,
            method: 'DELETE'
        }).then(function(response){
            verbose && console.log('successfully deleted from server: ', response);
        }).catch(function(error){
            verbose && console.log('error from the server')
        });
    }

})