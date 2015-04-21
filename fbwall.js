if (Meteor.isClient) {
  Meteor.subscribe('Messages');
  Template.home.events({
    'submit .form':function(event,template){
      event.preventDefault();
      Messages.insert({author:event.target.author.value,message:event.target.message.value});
      event.target.message.value = "";
      event.target.author.value = "";
    },
    'keyup #hi':function(event,template){
      Session.set('value',template.find('#hi').value);
    }

  });
  Template.home.helpers({
    Messages:function(){
      return Messages.find();
    },
    Value:function(){
      console.log(Session.get('value'));
      return Session.get('value');
    }
  });  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish('Messages',function() {
      return Messages.find({},{sort:{createdAt:-1}});
    })
  });
}