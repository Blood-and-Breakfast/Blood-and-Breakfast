if (Meteor.isClient) {


  Template.body.helpers({
    username: function () {
      if (Meteor.user().username) {
        return true;
      } else {
        return false;
      }
    }
  });


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


