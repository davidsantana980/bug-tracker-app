import { Component } from "react";
import { Container, Card, CardGroup, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

//this is supposed to be an array of db elements
const issues = [{
    "_id": "6399def2b8de7be5d8451ae2",
    "project": "apitest",
    "issue_title": "Test",
    "issue_text": "Text",
    "created_on": "Wed Dec 14 2022 10:34:26 GMT-0400 (hora de Venezuela)",
    "updated_on": "Wed Dec 14 2022 10:34:25 GMT-0400 (hora de Venezuela)",
    "created_by": "Salvador",
    "assigned_to": "Sabrina",
    "open": true,
    "status_text": "191",
    "__v": 0
    }, 
    {
        "_id": "824u285772458dakfbbla32",
        "project": "proyeye",
        "issue_title": "Test",
        "issue_text": "Text",
        "created_on": "Wed Dec 14 2022 10:34:26 GMT-0400 (hora de Venezuela)",
        "updated_on": "Wed Dec 14 2022 10:34:25 GMT-0400 (hora de Venezuela)",
        "created_by": "Sabrina",
        "assigned_to": "Salvador",
        "open": true,
        "status_text": "191",
        "__v": 0
    }
]

class IssueCards extends Component {
    
    constructor(props) {
        super(props);

        let uniqueProjectArray = [...new Set(issues.map(obj => obj.project))];

        let issueAndCountPair = {};
        for(let project of uniqueProjectArray){
            issueAndCountPair[project] = issues.filter(issue => issue.project === project).length
        }

        function handleSee (){
            return (
                <Navigate to="/see-issues" state={{issueList : issues.filter(issue => issue.project === "proyeye")}} replace="true"/>
            )
        }

        this.state = {
            headerCards : Object.entries(issueAndCountPair).map((issueAndCount, index) => {
                return(
                    <Card key={index} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{issueAndCount[0]}</Card.Title>
                            <Card.Text>{issueAndCount[1]} issues</Card.Text>
                            <Card.Link onClick={handleSee}><Button>See all issues</Button></Card.Link>
                        </Card.Body>
                    </Card>
                )
            })
        };
    }

    render() {
       return(
        <>
            <Container>
                <CardGroup>
                    {this.state.headerCards}
                </CardGroup>
            </Container>
        </>
       )
    }
}

export default IssueCards