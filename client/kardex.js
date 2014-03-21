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
  },
  'click .delete': function(evt, tmpl){
    Events.remove(this._id)
  }
})

Template.add_new_event.events({
  'click .save_new_event': function(evt, tmpl){
    new_data = {
      name: $('.add_event .name').val(),
      department: $('.add_event .department').val(),
      owner: $('.add_event .owner').val()
    }
    Events.insert(new_data)
    $('.add_event input[type=text]').val('')
  }
})
