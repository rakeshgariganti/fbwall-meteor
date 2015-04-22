

if (Meteor.isClient) {
  Meteor.subscribe('Posts');
  Template.home.events({
    'submit #loginForm':function(event,template){
      event.preventDefault();
      var username = template.find('#loginUsername').value;
      var password = template.find('#loginPassword').value;
      Meteor.loginWithPassword(username,password,function(error){
        alert(error.reason);
        console.log(error);
      });
    },
    'click #registerButton':function(event,template){
      var username = template.find('#loginUsername').value;
      var password = template.find('#loginPassword').value;
      Accounts.createUser({
        username:username,
        password:password
      },function(error,data){
        console.log(error);
        console.log('data:'+data);
      });
    },
    'submit #postForm':function(event,template){
      event.preventDefault();
      var postBody = template.find('#postBody').value;

      if(postBody != null && postBody != ""){
        Posts.insert({
          content:postBody,
          createdAt:new Date(),
          author:Meteor.user(),
          likes:0,
          dislikes:0
        });
        template.find('#postBody').value = "";
      }
    },
    'click #likeButton':function(event,template){
        event.preventDefault();
        var post = Posts.findOne({_id:this._id});
        var likes = post.likes+1;
        Posts.update({_id:this._id},{$set:{likes:likes}})
      },
    'click #dislikeButton':function(event,template){
        event.preventDefault();
        var post = Posts.findOne({_id:this._id});
        var dislikes = post.dislikes+1;
        Posts.update({_id:this._id},{$set:{dislikes:dislikes}})
      }
  });

  Template.home.helpers({
    user:function(){
      return Meteor.user();
    },
    Posts:function(){
      return Posts.find({},{sort:{createdAt:-1}});
    }
  });

  Template.layout.events({
    'click #logoutButton':function(event,template){
        event.preventDefault();
        Meteor.logout(function(error){
            if(error){
              alert("Can't logout");
            }
        });

    }
  });  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Meteor.userId){
      Meteor.publish('Posts',function() {
        return Posts.find({},{sort:{createdAt:-1}});
      });
    }
  });
}