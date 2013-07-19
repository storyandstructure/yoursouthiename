
if (Meteor.isClient) {

  Meteor.Router.add({
    "/edit": function () {
      return "edit";
    },
    "/" : function () {
      return "index";
    }
  });
  
  Template.greeting.response = function() {
    var name = Session.get('ysn-name');
    
    if (name) {
      var salutations = Salutations.find().fetch();
      return salutations[_.random(salutations.length)].text.replace('@', name);      
    }
    
    Session.set('ysn-name', '');
    
  };

  Template.form.events({
    'submit form' : function (e) {
      e.preventDefault();
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined') {
        Session.set('ysn-name', $('#sas-name').val())
        $('#sas-name').val('').blur();
      }
    }
  });
  
  Template.edit.events({
    'submit #ysn-first-form' : function (e) {
      e.preventDefault();
      console.log('he');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
