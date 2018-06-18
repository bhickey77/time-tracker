app.controller('ReportController', ['ReportService', function(ReportService){
    let verbose = true;
    let self = this;
    verbose && console.log('ReportController woot');
    self.testMessage = 'hihihi'
    self.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

    self.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    self.data = [
      [65, -59, 80, 81, -56, 55, -40],
      [28, 48, -40, 19, 86, 27, 90]
    ];
    self.datasetOverride = [
      {
        label: "Bar chart",
        borderWidth: 1,
        type: 'bar'
      },
      {
        label: "Line chart",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        type: 'line'
      }
    ];
}]);