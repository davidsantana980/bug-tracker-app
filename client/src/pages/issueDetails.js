import { Card, Container, ListGroup } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useLocation } from "react-router-dom";


export default function Issue () {
    let {state : info} = useLocation()

    // let info = {
    //         "_id": "6399def2b8de7be5d8451ae2",
    //         "project": "apitest",
    //         "issue_title": "Test",
    //         "issue_text": "Text",
    //         "created_on": "Wed Dec 14 2022 10:34:26 GMT-0400 (hora de Venezuela)",
    //         "updated_on": "Wed Dec 14 2022 10:34:25 GMT-0400 (hora de Venezuela)",
    //         "created_by": "Salvador",
    //         "assigned_to": "Sabrina",
    //         "open": true,
    //         "status_text": "191",
    //         "__v": 0
    //     }

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
        <Container fluid>
            <Card>
                <CardHeader>Issue ID: {info._id}</CardHeader>
                <Card.Body>
                    <Card.Title className="mb-3">{info.issue_title}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                        <Card.Text>
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
                    {/* <ListGroup.Item>Created on: {info.created_on}</ListGroup.Item> */}
                    <ListGroup.Item>Status: {info.open ? "In progress" : "Closed"}</ListGroup.Item>
                </ListGroup>
                <Card.Footer>Last updated: {info.updated_on}</Card.Footer>
            </Card>
        </Container>
    )
}