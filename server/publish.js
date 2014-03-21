// Events - {name: String
//           owner: integer
//           department: String}

Events = new Meteor.Collection("events")

// Publish complete set of events to all clients.
Meteor.publish('events', function(){
  return Events.find()
})
