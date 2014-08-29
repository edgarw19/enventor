$(function(){
	new AppRouter();
	Backbone.history.start();
	//some init
	/*var collection = new eventCollection();
	collection.fetch({
		success: function(data) {
			var view = new eventCollectionView({collection: data});
			$("body").append(view.render().el);
		}
	});*/
});