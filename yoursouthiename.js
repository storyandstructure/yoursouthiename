
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
  
  Template.edit.firstNames = function() {
    return FirstNames.find();
  }
  
  Template.edit.lastNames = function() {
    return LastNames.find();
  }
  
  Template.edit.salutations = function() {
    return Salutations.find();
  }
  
  Template.edit.specials = function() {
    return Specials.find();
  }

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
      FirstNames.insert({
        english: $('#ysn-first-english').val(),
        southie: $('#ysn-first-southie').val()
      });
      $('#ysn-first-english').val('').blur();
      $('#ysn-first-southie').val('').blur();
    },
    'submit #ysn-last-form' : function (e) {
      e.preventDefault();
      LastNames.insert({
        english: $('#ysn-last-english').val(),
        southie: $('#ysn-last-southie').val()
      });
      $('#ysn-last-english').val('').blur();
      $('#ysn-last-southie').val('').blur();
    },
    'submit #ysn-salutation-form' : function (e) {
      e.preventDefault();
      Salutations.insert({
        english: $('#ysn-salutation-english').val(),
        southie: $('#ysn-salutation-southie').val()
      });
      $('#ysn-salutation-english').val('').blur();
      $('#ysn-salutation-southie').val('').blur();
    },
    'submit #ysn-special-form' : function (e) {
      e.preventDefault();
      Specials.insert({
        english: $('#ysn-special-english').val(),
        southie: $('#ysn-special-southie').val()
      });
      $('#ysn-special-english').val('').blur();
      $('#ysn-special-southie').val('').blur();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
