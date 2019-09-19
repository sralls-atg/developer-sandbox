({
  doInit: function(component, event, helper) {
    // Instead of System.debug(), we use console.log to print out in browser!
    console.log("In the doInit function!");

    var title = component.get("v.pageTitle");

    console.log("The page title is: " + title);

    // Call the Helper class methods
    helper
      .callApex(component, "c.fetchAccounts") // Call Apex Controller fetchAccounts() method
      .then(function(accounts) {
        // Update the accountList attribute to the value returned by the Controller
        component.set("v.accountList", accounts);
      });
  },

  createAccount: function(component, event, helper) {
    // Find the newAccount attribute with component.get() method
    var accountRecord = component.get("v.newAccount");

    console.log("Account Object: " + accountRecord);
    console.log("Account Name: " + accountRecord.Name);

    // Update the params used in the Helper method.
    // "account" is the property name. The accountRecord is the record to insert.
    var params = {
      account: accountRecord
    };

    helper
      .callApex(component, "c.insertAccount", params)
      .then(function(accounts) {
        // Refresh the list of accounts
        component.set("v.accountList", accounts);

        // Refresh the newAccount variable
        component.set("v.newAccount", {
          sobjectType: "Account",
          Name: "",
          Phone: ""
        });
      });
  }
});