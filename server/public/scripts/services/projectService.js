app.service('ProjectService', function($http){
    let verbose = true;
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
        }).filter(function(project){
            return project.project_name != null;
        });
    }

    sv.removeProjectFromServer = function(project_id){
        return $http({
            url: `/project/${project_id}`,
            method: 'DELETE'
        }).then(function(response){
            verbose && console.log('successfully deleted from server: ', response);
        }).catch(function(error){
            verbose && console.log('error from the server')
        });
    }

    sv.addProjectToServer = function(inputs){
        return $http({
            url: '/project',
            method: 'POST',
            data: inputs
        }).then(function(response){
            verbose && console.log('successfully added to server: ', response);
        }).catch(function(error){
            verbose && console.log('error from the server');
        });
    }

})