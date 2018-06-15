app.service('AddService', function($http){
    console.log('AddService woot');
    let sv = this;

    sv.entries = {list: []};

    sv.getEntries = function(){             
        console.log('getting entries');
        return $http({
            method: 'GET',
            url: '/entry'
        }).then(function(response) {
            console.log('back from the server with: ', response);
            sv.entries.list = response.data;
        }).catch(function(error){
            console.log('error with the server: ', error);
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
        return $http({
            method: 'POST',
            url: '/entry',
            data: objectToSend
        }).then(function(response) {
            console.log('back from the server with: ', response);
        }).catch(function(error){
            console.log('error with the server: ', error);
        })
    }

})