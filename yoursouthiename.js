
// Meteor.Router.add({
//   "/edit": "edit",
//   "" : "form"
// });

if (Meteor.isClient) {
  
  Template.greeting.response = function() {
    var name = Session.get('ysn-name');
    
    if (name) {
      var salutations = Salutations.find().fetch();
      return salutations[_.random(salutations.length)].text.replace('@', name);      
    }
    
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
