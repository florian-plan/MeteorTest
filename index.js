// Global access
eleves = new Mongo.Collection( "eleves" );

if ( Meteor.isClient )
{
	Template.eleves.helpers
	(
		{
			alleleve : function ()
			{
				return eleves.find();
			}
		}
	);
	Template.eleves.events
	( {
		'click #submit_eleve' : function( event, template )
		{
			event.preventDefault();
			var $name = template.find( "#name" );
			var $firstname = template.find( "#firstname" );
            eleves.insert( { name : $name.value , firstname : $firstname.value, checked : false } );
		}
		,'click #remove_eleve' : function( event, template )
		{
				elevestrue = eleves.find({ checked : true }).fetch();
				elevestrue.forEach(function ( eleve ){
					eleves.remove( { _id : eleve._id } )
				});
		}
		,'click .check' : function()
		{
			var eleve_id = eleves.findOne( { _id : this._id })._id;
			var eleve_checked = eleves.findOne( { _id : this._id } ).checked;
			if ( eleve_checked == false ){
				eleves.update
				(
					{ _id : eleve_id }
					, {
						$set: {checked: true}
					}
				);
			}
			if ( eleve_checked == true ){
				eleves.update
				(
					{ _id : eleve_id }
					, {
						$set: {checked: false}
					}
				);
			}

		}
		,'click #submit_maj' : function( event, template )
		{
			event.preventDefault();
			var eleve_maj = eleves.findOne( { _id : this._id })._id;
			var maj_name = $(event.target).siblings( ".maj_name" ).val();
			var maj_firstname = $(event.target).siblings( ".maj_firstname" ).val();
			eleves.update( { _id : eleve_maj }
				, {
					$set: { name : maj_name, firstname : maj_firstname }
				});
		}
	} );
}


