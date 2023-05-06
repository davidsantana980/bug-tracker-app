import { Component } from "react";
import { Container, Card, CardGroup, Button, Row, Col, Badge, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import GetIssueForm from './search.js';


class IssueCards extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            issues : [],
            dataIsLoaded : false
        };
    }

    componentDidMount(){
        fetch("http://localhost:5000/api/issues?open=true")
        .then((res) => res.json()) //take the response string and turn it into a json array
        .then((json) => { //take the json array from the previous step...
            this.setState({
                issues: json, //...and make our this.state.items<Array> == the JSON<Array> response
                dataIsLoaded:true //changed status
            })
        })  
    }

    render() {

        if(!this.state.dataIsLoaded){
            return (
                <Container>
                    <h1>Please wait...</h1>
                </Container>
            )
        } 

        let uniqueProjectArray = [...new Set(this.state.issues.map(obj => obj.project))];
        let issueCreatorsArray = [...new Set(this.state.issues.map(obj => obj.created_by))];
        let issueAssignmentsArray = [...new Set(this.state.issues.map(obj => obj.assigned_to))];

        let issueAndCountPair = {};
        for(let project of uniqueProjectArray){
            issueAndCountPair[project] = this.state.issues.filter(issue => issue.project === project).length
        }

        let headerCards = Object.entries(issueAndCountPair).map((issueAndCount, index) => {
            return(
                <Container className="col-md-12 col-lg-6 mt-2" key={issueAndCount[0]}>
                    <Card key={index}>
                        <Card.Body>
                            <Card.Title>{issueAndCount[0]}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{issueAndCount[1]} open issue(s)</Card.Subtitle>
                            <LinkContainer to={`/see-issues`} state={{project : issueAndCount[0]}}>
                                <Card.Link><Button>See all issues</Button></Card.Link>
                            </LinkContainer>
                            {/* <LinkContainer to={`/rename-project`} state={{project : issueAndCount[0]}}>
                                <Card.Link><Button variant="secondary">Rename</Button></Card.Link>
                            </LinkContainer>
                            <LinkContainer to={`/delete-project`} state={{project : issueAndCount[0]}}>
                                <Card.Link><Button variant="danger">Delete all project issues</Button></Card.Link>
                            </LinkContainer> */}
                        </Card.Body>
                    </Card>
                </Container>
            )
        }) 

        let UserList = () => issueCreatorsArray.map(name => {
            return (
                <Button variant="primary" size="sm">
                    {name} 
                    <Badge bg="secondary">9</Badge>
                </Button>
              );            
        });

        let AssignmentsList = () => issueAssignmentsArray.map(name => {
            return (
                <Button variant="primary" size="sm">
                    {name} 
                    <Badge bg="secondary">9</Badge>
                </Button>
              );            
        });

        return(
            <Container className="mb-5">
                <Row>
                    <Col lg={8}>
                        <Container fluid>
                            <CardGroup>
                                {headerCards}
                            </CardGroup>
                        </Container>
                    </Col>
                    <Col lg={4}>
                        <GetIssueForm/>
                        {/* <ButtonToolbar className="justify-content-between">
                            <ButtonGroup size="sm" >
                                <UserList />
                            </ButtonGroup>
                        </ButtonToolbar> */}
                    </Col>
                </Row>
            </Container>
       )
    }
}

export default IssueCards