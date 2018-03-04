import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import MailFormRecipientList from './MailFormRecipientList'

class MailForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        // send to mail service
        // show the user something is happening
        // report errors or success

        event.preventDefault()
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="senderEmail">Your Email Address</Label>
                    <Input
                        type="email"
                        name="sender-email"
                        id="senderEmail"
                        placeholder="you@example.com"
                    />
                </FormGroup>

                <MailFormRecipientList />

                <FormGroup>
                    <Label for="emailSubject">Email Subject</Label>
                    <Input type="text" name="subject" id="emailSubject" />
                </FormGroup>

                <FormGroup>
                    <Label for="emailBody">Email Contents</Label>
                    <Input type="textarea" name="body" id="emailBody" />
                </FormGroup>

                <Button>Send</Button>
            </Form>
        )
    }
}

export default MailForm
