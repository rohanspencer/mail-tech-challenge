import React, { Component } from 'react'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import MailFormRecipient from './MailFormRecipient'

class MailFormRecipientList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipientEmails: [],
            currentEmail: '',
        }

        this.handleEmailChanged = this.handleEmailChanged.bind(this)
    }

    handleAdd = event => {
        console.log
        this.setState({
            emails: this.state.recipientEmails.push(this.state.currentEmail),
            currentEmail: '',
        })
    }

    handleEmailChanged(event) {
        this.setState({
            currentEmail: event.target.value,
        })
    }

    handleEmailDeletion(deleted) {
        console.log('email to be deleted:' + deleted)

        let newList = this.state.recipientEmails.filter(
            email => email !== deleted
        )

        console.log('current emails' + newList.length)

        this.setState({
            emails: newList,
        })
    }

    render() {
        let addedEmails = this.state.recipientEmails.map(email => {
            return (
                <MailFormRecipient
                    key={email}
                    recipientEmail={email}
                    deleteMethod={this.handleEmailDeletion.bind(this, email)}
                />
            )
        })

        return (
            <div>
                {addedEmails}

                <FormGroup>
                    <Input
                        type="email"
                        name="current"
                        value={this.state.currentEmail}
                        onChange={this.handleEmailChanged}
                    />
                    <Button onClick={this.handleAdd}>Add</Button>
                </FormGroup>
            </div>
        )
    }
}

export default MailFormRecipientList
