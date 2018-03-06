import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { validateEmail } from '../Utils/Validators'
import { fetch } from 'whatwg-fetch'

class MailForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipientEmails: [],
            currentEmail: '',
            currentEmailValid: true,
            currentEmailErr: 'Enter a valid email',
            senderEmail: '',
            senderEmailValid: true,
            subject: '',
            subjectValid: true,
            emailBody: '',
        }
    }

    handleSubmit = event => {
        // validate the inputs

        if (validateEmail(this.state.senderEmail)) {
            // ensure at least 1 recipient has been added
            if (this.state.recipientEmails.length > 1) {
                // ensure a subject is set
                if (this.state.subject.length > 0) {
                    fetch(process.env.REACT_APP_MAIL_API)
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
        let addingEmail = this.state.currentEmail

        console.log(validateEmail(addingEmail))
        console.log(addingEmail)

        // set a reasonable maximum number of recipients
        if (this.state.recipientEmails.length > 100) {
            //we need emails to be unique to use map
            if (this.state.recipientEmails.indexOf(addingEmail) < 0) {
                if (validateEmail(addingEmail)) {
                    this.setState({
                        emails: this.state.recipientEmails.push(addingEmail),
                        currentEmail: '',
                        currentEmailValid: true,
                    })
                } else {
                    this.setState({
                        currentEmailValid: false,
                        currentEmailErr: 'Enter a valid email',
                    })
                }
            } else {
                this.setState({
                    currentEmailValid: false,
                    currentEmailErr: 'Recipient has already been added',
                })
            }
        } else {
            this.setState({
                currentEmailValid: false,
                currentEmailErr: 'No more recipients can be added',
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

    handleEmailChanged = event => {
        this.setState({
            currentEmail: event.target.value,
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
                    />
                </FormGroup>

                <FormGroup>
                    <Label>To:</Label>
                    {addedEmails}
                    <Input
                        name="current"
                        value={this.state.currentEmail}
                        onChange={this.handleEmailChanged}
                        placeholder="them@example.com"
                    />
                    <Button onClick={this.handleAdd}>Add</Button>
                </FormGroup>

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
