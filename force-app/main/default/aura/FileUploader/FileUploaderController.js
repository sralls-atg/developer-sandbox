({
  handleFilesChange: function(component, event, helper) {
    var fileName = "No File Selected..";
    if (event.getSource().get("v.files").length > 0) {
      fileName = event.getSource().get("v.files")[0]["name"];
    }
    component.set("v.fileName", fileName);
    console.log("file name " + fileName);
  },

  uploadFile: function(component, event, helper) {
    console.log("Uploaded Files");

    var fileList = component.find("file").get("v.files");
    var uploadedFile = fileList[0];

    if (uploadedFile) {
      var reader = new FileReader();

      reader.readAsText(uploadedFile, "UTF-8");

      reader.onload = function(readerEvent) {
        var csvFile = readerEvent.target.result;
        console.log("csvFile file contains: " + csvFile);

        var jsonFile = helper.convertCSVtoJSON(csvFile);
        console.log("Returned jsonFile " + jsonFile);

        helper
          .callApex(component, "c.createRecordFromCSV", jsonFile)
          .then(function(recordData) {
            console.log("RecordData " + recordData);
            // component.set('v.contentVersions', contentVersions);
          })
          .catch(function(err) {
            console.log("ERROR CALLING APEX: " + err);
          });
      };

      reader.onerror = function(evt) {
        console.log("error reading file");
      };
    }
  }
});
