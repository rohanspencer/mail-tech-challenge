import React, { Component } from 'react'
import { Alert, Fade } from 'reactstrap'

class MailFormRecipient extends Component {
    render() {
        return (
            <Alert color="primary" toggle={this.props.deleteMethod}>
                {this.props.recipientEmail}
            </Alert>
        )
    }
}

export default MailFormRecipient
