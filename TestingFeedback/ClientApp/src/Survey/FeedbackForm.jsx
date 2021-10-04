import React from "react";

export class FeedbackForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySurvey: this.props.displaySurvey
        }        
    }

    async componentDidMount() {
        if (window.addEventListener) {
            window.addEventListener("message", this.handleMessage.bind(this));
        } else {
            window.attachEvent("onmessage", this.handleMessage.bind(this));
        }

        if (document.addEventListener) {
            document.addEventListener("message", this.handleMessage.bind(this));
        } 
    }

    handleMessage = (event) => {
        let iframe = document.getElementById("mainframe");

        if (event != undefined) {
            var dataFromChildIframe = event.data;

            if (dataFromChildIframe != "SurveyDone")
            {
                console.log("The message came from some site we don't know. We're not processing it.");
                return;
            }

            if (iframe !== null) {
                iframe.style.height = '25pt';
                iframe.style.width = '280pt';
            }
        }
    };

    hideSurvey() {
        let iframe = document.getElementById("mainframe");
        if (iframe !== null) {

            if (iframe.innerHTML === "") {
                this.setState({
                    displaySurvey: false
                });
            }

                //iframe.addEventListener("onLoad", this.unloadHandler());

                // Just in case the change wasn't dispatched during the unload event...
                //this.dispatchChange();
        }
    }    


    render() {
        const style = {
            height: '360pt',
            width: '280pt',
            borderWidth: '0px',
            display:'inline'
        }
        let surveyUrl = "https://www.surveymonkey.com/r/WSDHJRP?cust_id=" + this.props.customerId + "&cont_id=" + this.props.contactId + "&asst_id=" + this.props.assessmentId + "&date=" + this.props.date + "&recordform_id=" + this.props.recordformId + " &activitytype=" + this.props.activitytype ;
        //let surveyUrl = "https://nimmipatel.github.io/TestReview/SurveyComplete.html"; 
        return (
            <div>
                {this.state.displaySurvey ? (
                    <iframe id="mainframe" style={style} src={surveyUrl}></iframe>
                ) : <div id="tf_commit_detail"><>The record form has been committed : {this.props.customerId}</></div>}
                
            </div> 
        );
    }
}

export default FeedbackForm;