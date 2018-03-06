import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'reactstrap'

import MailForm from './MailForm/MailForm.js'

class App extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Jumbotron>
                        <h1 className="display-3">
                            SM Tech Challenge Mail Client
                        </h1>
                    </Jumbotron>
                </Row>
                <Row>
                    <Col>
                        <MailForm />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default App
