public with sharing class uploadCSVController {
    public uploadCSVController() {

    }

    @AuraEnabled
    public static void createRecordFromCSV(String jsonFile){

        System.debug('JsonFile: ' + jsonFile);

        List<Opportunity> oppsToInsert = new List<Opportunity>();

        Opportunity newOpp = new Opportunity();
        // newOpp.Name = ;
        // newOpp.StageName = ;
        // newOpp.CloseDate = ;

        //oppsToInsert.add(newOpp);

        if (oppsToInsert.size() > 0) {
            insert oppsToInsert;
        }

    }


}
