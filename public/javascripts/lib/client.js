var eventItemsBB = Backbone.Model.extend({
	idAttribute: "_id"
});

var eventCollection = Backbone.Collection.extend({
	model: eventItemsBB,
	url: "/eventList"
});

var eventView = Backbone.View.extend({
	tagName: "div",
	className: "event symbol width2 height2",
	render: function(){
		var template = $("#eventTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	}
});

var eventCollectionView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},
	tagName: "div",
	className: "events",
	render: function(){
		this.collection.each(function(eventItem) {
			var view = new eventView({model: eventItem});
			this.$el.append(view.render().el);

		}, this);//defines scope
		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		"*eventItems" : "eventItems"
	},
	eventItems : function() {
		var data = $("#startingdata").html();
		var collection = new eventCollection(JSON.parse(data));
		//collection.fetch({ reset: true}); maybe try without resetting
		var view = new eventCollectionView({collection: collection});
		$("#initialContent").html(view.render().el);
	}

});