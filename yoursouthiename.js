if (Meteor.isClient) {
  
  Template.greeting.response = function() {
    var name = Session.get('ysn-name');
    
    if (name) {
      
      var salutations = Salutations.find().fetch();
      
      // translate your name...first parse it
      
      var pieces = name.split(' ');
      var firstName = pieces[0];
      var southieName;
      
      if (_.last(firstName) == 's') {
        southieName = firstName + 'ie';
      }
      
      return salutations[_.random(salutations.length)].text.replace('@', southieName);
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
