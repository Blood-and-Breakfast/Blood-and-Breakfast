if (Meteor.isClient) {

  Deps.autorun(function(){

  });

  Template.everything.helpers({
    giraffe: function () {
      return "Giraffe";
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


