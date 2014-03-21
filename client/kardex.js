// Define Minimongo collections to match server/publish.js
Events = new Meteor.Collection('events')

Session.setDefault('editing_event', null)

Template.display_events.events = function(){
  return Events.find()
}

Template.display_event.editing = function(){
  return Session.equals('editing_event', this._id)
}

Template.display_event.events({
  'dblclick .event': function(evt, tmpl){
    Session.set('editing_event', this._id)
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
  }
})
