var app = {

	renderHomeView: function() {
  	$('body').html( this.homeTpl() );
  	//$('body').html( 'Howdy' );
  	$('.search-key').on('keyup', $.proxy(this.findByName, this));
	},

	showAlert: function( message, title ) {
		if (navigator.notification) {
			navigator.notification.alert( message, null, title, 'OK' );
		} else {
			alert( title ? (title + ": " + message) : message );
		}
	},

	findByName: function() {
		var self = this;
		console.log('findByName');
		this.store.findByName($('.search-key').val(), function(employees) {
			$('.employee-list').html( self.employeeLiTpl(employees) );
			//$('.employee-list').html( 'hello' );
		});
	},

	initialize: function() {
		var self = this;
		this.homeTpl = Handlebars.compile($("#home-tpl").html());
		this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
		//this.store = new MemoryStore();
		this.store = new LocalStorageStore( function() {
			//self.showAlert('Store Initialized', 'Info');
			self.renderHomeView();
		});
	}

};

app.initialize();