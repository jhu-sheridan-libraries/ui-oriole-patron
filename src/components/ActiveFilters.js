import React from 'react'
import { Container, Col, Row, Button } from 'reactstrap';

const ActiveFilters = () => {
    return (
    <div>
        <Container className="jhu-second-nav col-12">
          <Row>
            <Col className="col-*">
              Active Filters:  <Button color="primary">Filter</Button>{' '} <Button color="secondary">Filter</Button>{' '} <Button color="success">Filter</Button>{' '}
            </Col>
          </Row>
        </Container>

     </div>
   )
 }

 export default ActiveFilters
