global with sharing class AccountManagerAuraController {

    @AuraEnabled
    global static List<Account> fetchAccounts(){
        
        System.debug('In fetchAccounts');
        
        List<Account> accounts = [
            SELECT Id, Name, Phone, CreatedDate 
            FROM Account 
            ORDER BY CreatedDate DESC
            LIMIT 10
        ];

        return accounts;
    }

    @AuraEnabled
    global static List<Account> insertAccount(Account newAccount){
        
        System.debug('In insert Account');

        insert newAccount;

        // Update list of accounts
        List<Account> accounts = [
            SELECT Id, Name, Phone, CreatedDate
            FROM Account 
            ORDER BY CreatedDate DESC
            LIMIT 10
        ];

        return accounts;
    }

}
