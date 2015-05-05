
if (Meteor.isServer) {

  throwError = function(str){
    throw new Meteor.Error(403, str);
      return false;
  };

  Accounts.validateNewUser(function (user) {

    console.log(user);

    if(!user.username){
      return throwError('Username was blank');
    }

    if (user.username.length < 5){
      return throwError('Username needs at least 5 characters');
    }

    user.username = user.username.toLowerCase();

    if(user.username === "root" ){
      return throwError('Reserved username');
    }

    return true;
  });
}

if (Meteor.isClient) {

  passwordSanity = function(pwd, optPwd){

   if(optPwd && pwd !== optPwd){
      doOptionsChangeError("Confirmed password does not match");
      return false;
    }

    //1 lower, 1 upper, 1 number, 6-15 length, no spaces
    var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,10}$/;
    if(!pass.test(pwd) ){
      doOptionsChangeError("Password: 1 Number, 1 Upper, 6-15, no spaces");
      return false;
    }

     if(JSON.parse(JSON.stringify(pwd)) !== pwd){
      doOptionsChangeError("JSON Test Failed");
      return false;
    }

    return true;
  }

  usernameSanity = function(usr){
    if(JSON.parse(JSON.stringify(usr)) !== usr){
      doOptionsChangeError("user contains illegal characters");
      return false;
    }
    return true;
  }

  logIn = function(){
    var username = $("#input-username").val();
    var password = $("#input-password").val();
    username = username.toLowerCase();


    if(usernameSanity(username) === false){
      return;
    }
    if(passwordSanity(password) === false){
      return;
    }

    Meteor.loginWithPassword({username: username}, password, function(error){
      if(error){
        doOptionsChangeError(error);
      }else{
        Meteor.logoutOtherClients();
      }

    });
  };

  logOut = function(){
    Meteor.logout(function(error){
        if(error){
          //something
        }
    });
  };

  Template.registerHelper('checkCreateIsOpen', function(){
    return Session.get("createIsOpen");
  });

  closeCreateUser = function(){
    Session.set("createIsOpen", false);
  }

  openCreateUser = function(){
    Session.set("createIsOpen", true);
  }

  createUser = function(){
    var username = $('#input-username').val();
    var newPassword = $('#input-password').val();
    var newPasswordAgain = $('#input-password-again').val();

    if(!usernameSanity(username)) return;
    if(!passwordSanity(newPassword, newPasswordAgain)) return;

    var options = {
      //can add email to this option
      username: username,
      password: newPassword,
      profile: {nickname: username }
    };

    disableButton("createUser");

    Accounts.createUser(options, function(error){
        //on create
        if(error){
          console.log("error on create user");
          doOptionsChangeError(error);
        }else{
          console.log("user created");
          closeCreateUser();
        }
        enableButton("createUser");
      });
  }

  closeChangePassword = function(){
    Session.set("changePasswordIsOpen", false);
  };

  openChangePassword = function(){
    Session.set("changePasswordIsOpen", true);
  };

  Template.registerHelper('checkChangePasswordIsOpen', function(){
    return Session.get("changePasswordIsOpen");
  });

  //stores settimout id here so can be cleared later
  //before being set again
  var errTimeoutId = null;
  doOptionsChangeError = function(errOrText){
    var text;
    if(typeof errOrText === "string"){
      text = errOrText;
    }else{
      text = errOrText.reason;
    }
    $("#options-error").text(text);
    clearTimeout(errTimeoutId);
    errTimeoutId = setTimeout(function(){
      $("#options-error").text("");
    }, 5000);

  };

  changePassword = function(){
    var oldPassword = $('#input-password-change-current').val();
    var newPassword = $('#input-password-change-new').val();
    var newPasswordAgain = $('#input-password-change-new-again').val();

    disableButton("change-password");
      //must be logged in
    Accounts.changePassword(oldPassword, newPassword, function(error){
      if(error){
        doOptionsChangeError(error);
      }else{
        //re-enable button
        closeChangePassword();
        $('#input-password-change-current').val("");
        $('#input-password-change-new').val("");
        $('#input-password-change-new-again').val("");
        doOptionsChangeError("password change successful");
      }

      enableButton("change-password");

    });
  };

  disableButton = function(str){
    $("#" + str).prop("disabled", true);
  };

  enableButton = function(str){
    $("#" + str).removeProp("disabled");
  };

  toggleOptions = function(){
    console.log("toggle");
    if(Session.get("optionsToggleIsOpen") !== true){
      Session.set("optionsToggleIsOpen", true);
    }else{
      Session.set("optionsToggleIsOpen", false);
    }
  };
}

