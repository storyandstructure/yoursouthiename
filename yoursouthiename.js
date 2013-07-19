
if (Meteor.isClient) {

  Meteor.Router.add({
    "/edit": function () {
      return "edit";
    },
    "/" : function () {
      return "index";
    }
  });

  function getSouthieName(name) {
    // translate your name...first parse it
    
    var pieces = name.split(' ');
    var firstName = pieces[0];
    var southieName;
    
    if (firstName.slice(-1) == 's') {
      return firstName + 'ie';
    }
    if (firstName.slice(-1) == 'm') {
      return firstName + 'my';
    }
    if (firstName.slice(-1) == 'b') {
      return firstName + 'by';
    }
    if (firstName.slice(-1) == 'd') {
      return firstName + 'sie';
    }
    if (firstName.slice(-2) == 'tt') {
      return firstName + 'sie';
    }
    if (firstName.slice(-1) == 't') {
      return firstName + 'ty';
    }
    if (firstName.length > 8) {
      return _.first(firstName) + 'az';
    }
    
    return '. I have no friggin\' clue what ya name is. Yuh screwed!';

  }
  
  Template.greeting.response = function() {
    var name = Session.get('ysn-name');
    
    if (name) {
      
      var salutations = Salutations.find().fetch();            
      return salutations[_.random(salutations.length)].text.replace('@', getSouthieName(name));
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
