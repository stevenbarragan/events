// Define Minimongo collections to match server/publish.js
Events = new Meteor.Collection('events')

Session.setDefault('editing_event', null)

Template.display_events.events = function(){
  return Events.find()
}

Template.display_event.editing = function(){
  return Session.equals('editing_event', this._id)
}

Template.display_event.owner = function(){
  user = Meteor.users.findOne({_id: this.owner_id})
  return user && user.profile.name
}

Template.display_event.already_going = function(){
  return this.participants.indexOf(Meteor.userId()) >= 0
}

Template.display_event.loggedOwner = function(){
  return this.owner_id === Meteor.userId()
}

Template.display_event.events({
  'dblclick .edit-field': function(evt, tmpl){
    if(this.owner_id == Meteor.userId()){
      Session.set('editing_event', this._id)
    }
  },
  'keypress .event input': function(evt, tmpl){
    if(evt.which == 13){
      new_data = {
        name: $('.event .name').val(),
        department: $('.event .department').val(),
        owner: $('.event .owner').val()
      }

      Events.update(this._id, {$set: new_data})

      Session.set('editing_event', null)
    }
  },
  'click .delete': function(evt, tmpl){
    Events.remove(this._id)
  },
  'click .going': function(evt, tmpl){
    Events.update({_id: this._id}, { $push: {participants: Meteor.userId() }})
  },
  'click .notgoing': function(evt, tmpl){
    Events.update({_id: this._id}, { $pull: {participants: Meteor.userId() }})
  }
})

Template.add_new_event.events({
  'click .save_new_event': function(evt, tmpl){
    new_data = {
      name: $('.add_event .name').val(),
      department: $('.add_event .department').val(),
      owner_id: Meteor.userId(),
      participants: [Meteor.userId()]
    }
    Events.insert(new_data)

    $('.add_event input[type=text]').val('')
  }
})
