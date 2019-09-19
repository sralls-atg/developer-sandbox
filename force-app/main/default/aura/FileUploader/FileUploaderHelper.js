({
  convertCSVtoJSON: function(uploadedFile) {
    var jsonObj = [];
    var csvRows = [];

    csvRows = uploadedFile.split("\n");
    csvRows.pop(); // Remove last ","
    console.log("@@@ csvRows[0] = " + csvRows[1]);

    // Cread array of headers
    var headers = csvRows[0].split(",");
    console.log("@@@ headers = " + headers);

    for (var i = 1; i < csvRows.length; i++) {
      var dataRow = {};
      var dataCells = csvRows[i].split(",");

      for (var j = 0; j < dataCells.length; j++) {
        // populate dataRow with header name and value
        // (i.e. {"Name": "Acme"})
        dataRow[headers[j].trim()] = dataCells[j].trim();
      }

      // Add row to jsonObj (i.e. {"Name":"Acme","StageName":"Closed Won","CloseDate":"1/1/2019"})
      jsonObj.push(dataRow);
    }

    var json = JSON.stringify(jsonObj);
    console.log("@@@ json = " + json);
    return json;
  },

  callApex: function(component, methodName, params) {
    return new Promise(
      $A.getCallback(function(resolve, reject) {
        var action = component.get(methodName);

        if (params) {
          action.setParams({
            jsonFile: params
          });
          console.log("action.getParams: " + action.getParams());
        }

        action.setCallback(this, function(results) {
          if (results.getState() === "SUCCESS") {
            resolve(results.getReturnValue());
          } else if (results.getState() === "ERROR") {
            $A.log("Errors", results.getError());
            reject(results.getError());
          }
        });

        $A.enqueueAction(action);
      })
    );
  }
});
