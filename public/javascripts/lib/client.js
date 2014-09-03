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
	events: {
		'click' : 'showModal'
	},
	render: function(){
		var template = $("#eventTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	},
	showModal: function(){
		var view = new modalView({model: this.model});
		$("#backboneModal").html(view.render().el);
	},
});

var modalView = Backbone.View.extend({
	tagname: "div",
	render: function(){
		var template = $("#modalTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	}
});
 
// for individual page
var eventPageView = Backbone.View.extend({
	tagName: "div",
	className: "wrapper",
	render: function(){
		var template = $("#eventPageTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	},
});

var eventCollectionView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},
	tagName: "div",
	className: "events",
	render: function(){
		this.collection.each(function(eventItem) {
			var path = window.location.pathname;
			if (path.substr(0, 6) === '/event')
				var view = new eventPageView({model: eventItem});
			else
				var view = new eventView({model: eventItem});
			this.$el.append(view.render().el);

		}, this);//defines scope
		return this;
	}
});


var AppRouter = Backbone.Router.extend({
	initialize: function(){
		this._setupCollection();
	},
	routes: {
		"*eventItems" : "eventItems",
		"*eventItems/:title": "eventItems"
	},
	_setupCollection: function(){
		if(this.collection) return;
		var data = $("#startingdata").html();
		this.collection = new eventCollection(JSON.parse(data));
	},
	_renderView: function(view){
		$("#initialContent").html(view.render().el);
	},
	eventItems : function() {
		//collection.fetch({ reset: true}); maybe try without resetting
		var view = new eventCollectionView({collection: this.collection});
		this._renderView(view);
	},
	singleBook: function(id){

	}

});