import { useState } from "react";
import { Button, ButtonGroup, Card, Container, ListGroup, Modal } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

let WarningModal = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Do you really want to delete this issue?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <LinkContainer to={`/delete`} state={{_id : props._id, project : props.project}}>
                <Card.Link><Button variant="danger">Delete issue</Button></Card.Link>
            </LinkContainer> 
          </Modal.Footer>
        </Modal>
    )
} 

export default function Issue () {
    let {state : info} = useLocation()
    const [modal, setModal] = useState({show: false, _id: "", project: ""});

    if(!info){
        return (
            <Container>
                <h1>Unexpected error, issue not found</h1>
            </Container>
        )
    }

    let OptionalAssignment = () => {
        if(info.assigned_to){    
            return  (
                <>           
                    <hr/>
                    Assigned to:  {info.assigned_to}
                </>
            ) 
        }
        return
    }
    
    return (
        <>
            <Container fluid>
                <Card>
                    <CardHeader>
                        Issue ID: <b>{info._id}</b>
                        <ButtonGroup className="float-end">
                            <Button onClick={() => setModal({show: true, _id : info._id, project: info.project})} variant="danger" size="sm" >Delete issue</Button>
                            <LinkContainer to={`/update`} state={info} variant="secondary" size="sm">
                                <Button>Update issue</Button>
                            </LinkContainer>
                        </ButtonGroup>
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
            <WarningModal 
                show={modal.show}
                onHide={() => setModal({show :false})}
                _id={modal._id} 
                project={modal.project}
            />
        </>
    )
}