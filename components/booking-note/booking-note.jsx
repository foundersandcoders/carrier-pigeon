/** @jsx React.DOM */

var React  = require('react');

var Header         = require("../header/header.jsx");
// If the buttons don't work... If email: Please double check your email address and try again.
// If save/print doesn't work... sorry, there has been an internal error. Try again at a late point.
var Error          = require("../error-message.jsx");
var BookingOptions = require("./booking-note-options.jsx");
var BookingForm    = require("./booking-note-form.jsx");

var getJobNumber = function (dbId) {
    var today = new Date();
  
    var id = ("0000" + dbId).slice(-4);
    var mm = ("0" + (today.getMonth()+1)).slice(-2);
    var yy = today.getFullYear().toString().slice(-2);
  
    return yy + mm + id;
}

var bookingNote = React.createClass({
    getInitialState: function() {
        return {
            order: {
                job_number: "",
                date: ""
            }
        };
    },

    componentWillMount: function() {
        var getOrderUrl = "/order/get/" + this.props.params.job_no;

        $.get(getOrderUrl, function(result) {
            if(result !== ""){
                var order = JSON.parse(result);

                this.setState({
                    order : order,
                });
            }
        }.bind(this))
        .fail(function () {
            "get units request failed"
        });
    },
    convertPdf: function () {
       var pdf = new jsPDF('p', 'pt', 'letter');
       var source = document.getElementById('form');
       console.log(source)
       var handler = {
            '#bypassme': function(element, renderer){
                return true
            }
       };
       var margins = {
            top: 50,
            left:60,
            width: 545
       };

       pdf.fromHTML(
            source,
            margins.left,
            margins.top,
            {
                'width' : margins.width,
                'elementHandlers': handler
            },
            function(dispose){
                pdf.save('forms')
            }
        )
    },

    render: function() {
        return (
            <div>
                <Header/>
                <div id = "form" className="booking-note container">
                    <div>
                        <img src="../../img/logo-full.png" />
                        <hr/> 
                    </div>
                    <h2>BOOKING NOTE</h2>
                    <div className="float-right">
                        <p>Job no: {getJobNumber(this.state.order.job_number)}</p>
                        <p>date: { this.state.order.date.substring(0, 10)}</p>
                    </div>
                    <div>
                        <BookingForm order={this.state.order} />
                    </div>
                    <br />
                    <hr />
                    <div className="half float-left">
                        <p className="small">145-157 St John Street</p>
                        <p className="small">London EC1V 4PW</p>
                        <p className="small">England</p>
                    </div>
                    <div className="half float-right">
                        <p className="small">Coot Freight Ltd.</p>
                        <p className="small">Registered in England No.07880722</p>
                        <p className="small">VAT No. GB 128 2159 22</p>
                    </div>
                </div>
                 <button className=" column-2 push-7 button grey" onClick={this.convertPdf}>download as pdf</button>
            </div>
        )
    }
});

module.exports = bookingNote;
