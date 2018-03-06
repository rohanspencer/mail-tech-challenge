import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { validateEmail } from '../Utils/Validators'
import 'whatwg-fetch'

class MailForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipientEmails: [],
            recipientEmail: '',
            recipientEmailValid: true,
            recipientEmailErr: 'Enter a valid email',
            senderEmail: '',
            senderEmailValid: true,
            subject: '',
            subjectValid: true,
            emailBody: '',
        }
    }

    handleSubmit = event => {
        // validate the inputs
        console.log(this.state.subject.length)
        console.log(this.state.recipientEmails.length)
        console.log(validateEmail(this.state.senderEmail))

        if (validateEmail(this.state.senderEmail)) {
            // ensure at least 1 recipient has been added
            if (this.state.recipientEmails.length >= 1) {
                // ensure a subject is set
                if (this.state.subject.length > 0) {
                    console.log(process.env.REACT_APP_MAIL_API)

                    //hard code the request here
                    let request = {
                        sender_email: this.state.senderEmail,
                        recipient_emails: [],
                        subject: this.state.subject,
                        body: this.state.emailBody,
                    }

                    for (var recipient in this.state.recipientEmail) {
                        request.recipient_emails.push({ recipient: recipient })
                    }

                    var thisHeader = new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    })

                    fetch('http://localhost:3001/send', {
                        method: 'POST',
                        headers: thisHeader,
                        body: JSON.stringify(request),
                    })
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(json) {
                            console.log(json)
                        })
                        .catch(function(exception) {})
                }
            }
        }

        event.preventDefault()
    }

    handleAdd = event => {
        let addingEmail = this.state.recipientEmail

        // set a reasonable maximum number of recipients
        if (this.state.recipientEmails.length <= 100) {
            //we need emails to be unique to use map
            if (this.state.recipientEmails.indexOf(addingEmail) < 0) {
                if (validateEmail(addingEmail)) {
                    this.setState({
                        emails: this.state.recipientEmails.push(addingEmail),
                        recipientEmail: '',
                        recipientEmailValid: true,
                    })
                } else {
                    this.setState({
                        recipientEmailValid: false,
                        recipientEmailErr: 'Enter a valid email',
                    })
                }
            } else {
                this.setState({
                    recipientEmailValid: false,
                    recipientEmailErr: 'Recipient has already been added',
                })
            }
        } else {
            this.setState({
                recipientEmailValid: false,
                recipientEmailErr: 'No more recipients can be added',
            })
        }
    }

    handleEmailDeletion = deleted => {
        let newList = this.state.recipientEmails.filter(
            email => email !== deleted
        )

        this.setState({
            recipientEmails: newList,
        })
    }

    handleRecipientEmailChanged = event => {
        this.setState({
            recipientEmail: event.target.value,
        })
    }

    handleSenderEmailChanged = event => {
        this.setState({
            senderEmail: event.target.value,
        })
    }

    handleSubjectChanged = event => {
        this.setState({
            subject: event.target.value,
            subjectValid: true,
        })
    }

    handleBodyChanged = event => {
        this.setState({
            emailBody: event.target.value,
        })
    }

    render() {
        let addedEmails = this.state.recipientEmails.map(email => {
            return (
                <Alert
                    key={email}
                    color="primary"
                    toggle={this.handleEmailDeletion.bind(this, email)}
                >
                    {email}
                </Alert>
            )
        })

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="senderEmail">From:</Label>
                    <Input
                        name="sender-email"
                        id="senderEmail"
                        placeholder="you@example.com"
                        onChange={this.handleSenderEmailChanged}
                        valid={this.state.senderEmailValid}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>To:</Label>
                    {addedEmails}
                    <Input
                        name="current"
                        value={this.state.recipientEmail}
                        onChange={this.handleRecipientEmailChanged}
                        valid={this.state.recipientEmailValid}
                        placeholder="them@example.com"
                    />
                    <Button onClick={this.handleAdd}>Add</Button>
                </FormGroup>

                <FormGroup>
                    <Label for="emailSubject">Email Subject</Label>
                    <Input
                        type="text"
                        name="subject"
                        id="emailSubject"
                        onChange={this.handleSubjectChanged}
                        valid={this.state.subjectValid}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="emailBody">Email Contents</Label>
                    <Input
                        type="textarea"
                        name="body"
                        id="emailBody"
                        onChange={this.handleBodyChanged}
                    />
                </FormGroup>

                <Button>Send</Button>
            </Form>
        )
    }
}

export default MailForm
