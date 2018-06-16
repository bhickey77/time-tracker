app.service('AddService', function($http){
    let verbose = false;
    verbose && console.log('AddService woot');
    let sv = this;

    sv.entries = {list: []};
    
    sv.getEntries = function(){             
        verbose && console.log('getting entries');
        return $http({
            method: 'GET',
            url: '/entry'
        }).then(function(response) {
            verbose && console.log('back from the server with: ', response);
            sv.entries.list = sv.formatEntires(response.data);            
        }).catch(function(error){
            verbose && console.log('error with the server: ', error);
        })
    }

    sv.submitToServer = function(inputObject){
        inputObject.item_date = moment(inputObject.item_date_raw);
        inputObject.start_time = moment(inputObject.start_time_raw);
        inputObject.end_time = moment(inputObject.end_time_raw);
        let entryDateMilliFromEpoch = inputObject.item_date.valueOf();        
        let entryTime = inputObject.end_time.valueOf() - inputObject.start_time.valueOf();
        objectToSend = {
            item: inputObject.item,
            entryDateMilliFromEpoch: entryDateMilliFromEpoch,
            milliseconds: entryTime,
            project_id: inputObject.project_id
        }        
        verbose && console.log(objectToSend);
        
        return $http({
            method: 'POST',
            url: '/entry',
            data: objectToSend
        }).then(function(response) {
            verbose && console.log('back from the server with: ', response);
        }).catch(function(error){
            verbose && console.log('error with the server: ', error);
        })
    }

    sv.deleteFromServer = function(entry_id){
        verbose && console.log(`service delete from server: `, entry_id);
        return $http({
            method: 'DELETE',
            url: `/entry/${entry_id}`
        }).then(function(response){
            verbose && console.log('back from the server with: ', response);      
        }).catch(function(error){
            verbose && console.log('error from the server: ', error);  
        });
    }

    sv.formatEntires = function(entries){
        return entries.map(function(entry){
            let hours = Math.floor(entry.entry_time_milliseconds/3600000);
            let remainingMinutes = ((entry.entry_time_milliseconds % 3600000)/60000).toFixed();
            entry.time_spent = hours + ':' + ((remainingMinutes<10) ? ('0' + remainingMinutes) : remainingMinutes);
            entry.date = moment.unix(entry.item_date_milli_from_epoch/1000).format('MMM Do, YYYY');
            return entry;
        });
    }

})