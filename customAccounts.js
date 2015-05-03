/*
if (Meteor.isServer) {


  //customize emails sent to users
  Accounts.emailTemplates.siteName = "AwesomeSite";
  Accounts.emailTemplates.from = "AwesomeSite Admin <accounts@example.com>";

  Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Awesome Town, " + user.profile.name;
  };
  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "You have been selected to participate in building a better future!"
   + " To activate your account, simply click the link below:\n\n"
   + url;
 };
 Accounts.emailTemplates.resetPassword.subject = function (user) {
  return "Reset Password Request for " + user.profile.name;
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
 return "Password reset information for user " + user + ". at " + url + ".";
};
Accounts.emailTemplates.verifyEmail.subject = function (user) {
  return "Please Verify your Email for " + user.profile.name;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
 return "Please verify email for " + user + ". at " + url + ".";
};
  //END


  Accounts.validateNewUser(function (user) {
    if (user.username && user.username.length >= 3)
      return true;
  });
    // Validate username, without a specific error message.
    Accounts.validateNewUser(function (user) {
      return user.username !== "root";
    });

    // Accounts.onCreateUser(function(options, user) {
    //     // We still want the default hook's 'profile' behavior.
    //     if (options.profile)
    //       user.profile = options.profile;
    //     return user;
    // });
  Accounts.validateLoginAttempt(function(){
      //chain can be called, only purpose after fail would be to adjust error message
      if (!attempt.allowed) return false;

      //return falsy to abort login
      return true;
    });

  sendReset = function(user, emailOrDefault){

    Accounts.sendResetPasswordEmail(userId, emailOrDefault);
  }

  // Accounts.sendEnrollmentEmail(userId, [email])
  // Accounts.sendVerificationEmail(userId, [email])
}

if (Meteor.isClient) {

  Accounts.onResetPasswordLink(function(){

  });

  Accounts.onLogin(function(){
  //called on login success
  });

  Accounts.onLoginFailure(function(){
    //on login failure
  });

  Accounts.onEmailVerificationLink(function(token, done){
    tokenEmailConfirm(token);
    done();
  });

  login = function(){
    Meteor.loginWithPassword(user, password, function(error){
      Meteor.logoutOtherClients();
    });
  };

  logout = function(){
    Meteor.logout(function(error){
        //callback
    });
  };

  createUser = function(){
    var options = {
      username: "this",
      email: "string",
      password: "string",
      profile: {nickname: "name" }
    };
    Accounts.createUser(options, function(error){
        //on create
      });
  }

  changePassword = function(){
    var oldPassword = "string";
    var newPassword = "string";
      //must be logged in
    Accounts.changePassword(oldPassword, newPassword, function(error){
      //password changed
    });
  };

  forgotPassword = function(){
    var options = {email: "string"};
    Accounts.forgotPassword(options, function(error){
      //forgot password
    });
  };

  tokenPasswordConfirm = function(){
    var token = "string";
    var newPassword = "string"
    Accounts.resetPassword(token, newPassword, function(error){
      //token confirmed
    })
  };

  tokenEmailConfirm = function(token){
    token = token || //pull from somewehre?
    Accounts.verifyEmail(token, function(error){
      //email confirmed
    });
  };


}
*/
