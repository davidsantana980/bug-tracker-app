import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, ListGroup, Modal} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LinkContainer } from "react-router-bootstrap";

let DetailsModal = (props) => {
    let info = {...props.props}
   
    let OptionalAssignment = () => {
        if(info.assigned_to){    
            return  (
                <>           
                    <hr/>
                    Assigned to:  <b>{info.assigned_to}</b>
                </>
            ) 
        }
        return
    }

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-deleteModal-title-vcenter"
          centered
        >
            <Modal.Body>
                <Container >
                    <Card>
                        <CardHeader>
                            <Col lg="10">
                                <text>Issue ID: <b>{info._id}</b></text>
                            </Col>
                            <Col lg="2">
                                <ButtonGroup className="flex-wrap">
                                    <LinkContainer to={`/delete`} state={{_id : info._id, project : info.project}}>
                                        <Card.Link><Button className="float-end" variant="danger" size="sm">Delete issue</Button></Card.Link>
                                    </LinkContainer> 
                                </ButtonGroup>
                            </Col>
                        </CardHeader>
                        <Card.Body>
                            <Card.Title className="mb-3">{info.issue_title}</Card.Title>
                            <hr/>
                            <Card.Subtitle className="mb-3 text-muted mt-2">
                                <Card.Text as="div">
                                    Created by <b>{info.created_by}</b> on: {info.created_on}
                                    <OptionalAssignment/>
                                </Card.Text>
                            </Card.Subtitle>
                            <hr/>
                            <Card.Text>
                                Explanation: {info.issue_text}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Status: {info.open ? "In progress" : "Closed"}</ListGroup.Item>
                        </ListGroup>
                        <Card.Footer>Last updated: {info.updated_on}</Card.Footer>
                    </Card>
                </Container>
            </Modal.Body>
        </Modal>
    )
} 


export default function Issue (props) {
    let info = {...props.props};
    const [detailsModal, setDetailsModal] = useState({show: false, props : {}});

    if(!info){
        return (
            <Container>
                <h1>Unexpected error, issue not found</h1>
            </Container>
        )
    }

    return (
        <>
            <span onClick={() => setDetailsModal({show: true, props: info})} >Issue details</span>
            <DetailsModal 
                show={detailsModal.show}
                onHide={() => setDetailsModal({show :false})}
                props={detailsModal.props}
            />
        </>        
    )
}