var React 		= require('react');		
var Reminders 	= require("./reminder.jsx");	
var Close 		= require("../close-warning.jsx");

var addReminder = React.createClass({
	getInitialState: function () {
	    return {
	    	closeView: false,
	    	viewing: true,
	    	reminders:[],
	    	deletedReminders: "",
	    	edited: false
	    };
	},

	removeReminder : function (key) {
		console.log('key', key);
		
		if (this.state.reminders.length > 0) {

  			var deletedReminder = this.state.reminders.splice(key, 1);

	  		var newState = this.state.reminders;

  			this.setState({
    			reminders: newState,
    		});

  			if (deletedReminder[0].reminder_id) {
  				var newDeletedStrng = this.state.deletedReminders + ',' + deletedReminder[0].reminder_id;
  				
  				this.setState({
	    			deletedReminders: newDeletedStrng
	    		});
	
			}
		} 
	},

  	onReminderChange: function (key, event) {

		this.props.edited();
		var name = event.target.name;
		var value = event.target.value;
		this.state.reminders[key][name] = value;
	},

  	closeWarning: function () {
	  	this.setState({
			closeView: false,
			clearReminders: false
		})
  	},

	addReminder : function (key) {
		
		var newReminder = {
			contact_id : this.props.contactId
		}

		this.state.reminders.splice(key + 1, 0, newReminder);

		var newState = this.state.reminders;

  		this.setState({
    		reminders: newState
    	});
	},

	componentDidMount: function () {

		var reminder = this.props.reminder;

		this.setState({
			reminders: reminder
		})
	},

	render: function () {

		var reminders 			= this.state.reminders;
		var addReminder 		= this.addReminder;
		var removeReminder 		= this.removeReminder;
		var closeView  			= this.closeView;
		var onReminderChange	= this.onReminderChange;
		var clearReminders		= this.clearReminders;
		var setClearReminders 	= this.setClearReminders;
		var viewing 			= this.props.viewing;

		return (
			<div className="reminder create-order">
				<div className="row column-16 push-2 gutters small-margin-top">
					<div className="row column-11 gutters">
						<div className="column-7 purchase">
							<h4>Message</h4>
						</div>
						<div className="column-9 purchase">
							<h4>Date</h4>
						</div>
					</div>
					{reminders.length > 0 
						?reminders.map(function (reminder, i) {
							var key = new Date().getMilliseconds() + i;

							return 	<Reminders
										viewing = {viewing}
										reminder = {reminder}
										key = {key}
										keys= {i} 
										addReminder={addReminder} 
										removeReminder={removeReminder}
										edited = {onReminderChange}/>
						})
						: <button type="button" className="button blue add-row wide" onClick={addReminder.bind(null, 0)}>Add A Reminder</button>
					}
				</div>	
			</div>
		);
	}
})

module.exports = addReminder;
