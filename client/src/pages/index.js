import { Component } from "react";
import { Container, Card, CardGroup, Button, Row, Col, Badge } from "react-bootstrap";
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

    uniqueByProp(prop){
        let uniqueByPropArray = [...new Set(this.state.issues.map(obj => obj[prop]))];

        let issueAndCountPair = {};
        for(let propName of uniqueByPropArray){
            issueAndCountPair[propName] = this.state.issues.filter(issue => issue[prop] === propName).length
        }

        return Object.entries(issueAndCountPair);
    }

    render() {

        if(!this.state.dataIsLoaded){
            return (
                <Container>
                    <h1>Please wait...</h1>
                </Container>
            )
        } 

        let projectAndIssueCountPair = this.uniqueByProp("project");

        let headerCards = projectAndIssueCountPair.map((issueAndCount, index) => {
            return(
                <Container className="col-md-12 col-lg-6 mt-2" key={issueAndCount[0]}>
                    <Card key={index}>
                        <Card.Body>
                            <Card.Title>{issueAndCount[0]}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{issueAndCount[1]} open issue(s)</Card.Subtitle>
                            <LinkContainer to={`/see-issues`} state={{project : issueAndCount[0]}}>
                                <Card.Link><Button>See all issues</Button></Card.Link>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </Container>
            )
        }) 

        let creatorAndCountPair = this.uniqueByProp("project");
        let UserList = () => creatorAndCountPair.map((nameAndCount, index) => {
            return (
                <Badge pill as="button" bg="info">
                    {/* <Button size="sm" key={index}> */}
                        {nameAndCount[0]} 
                        <Badge bg="secondary">{nameAndCount[1]}</Badge>
                    {/* </Button> */}
                </Badge>
              );            
        });

        let assignmentAndCountPair = this.uniqueByProp("assigned_to");
        let AssignedList = () => assignmentAndCountPair.map((nameAndCount, index) => {
            return (
                <Badge pill as="button" bg="info">
                    {/* <Button size="sm" key={index}> */}
                        {nameAndCount[0]} 
                        <Badge bg="secondary">{nameAndCount[1]}</Badge>
                    {/* </Button> */}
                </Badge>
              );            
        });


        // let AssignmentsList = () => issueAssignmentsArray.map(name => {
        //     return (
        //         <Button variant="primary" size="sm">
        //             {name} 
        //             <Badge bg="secondary">9</Badge>
        //         </Button>
        //       );            
        // });

        return(
            <Container fluid className="mb-5">
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
                        <Container className="mt-3">
                            {/* <ButtonToolbar className="justify-content-between"> */}
                                {/* <ButtonGroup size="sm" > */}
                                <h4>See issues by creator</h4>
                                <UserList />
                                {/* </ButtonGroup> */}
                            {/* </ButtonToolbar> */}
                        </Container>
                        <Container className="mt-3">
                            <h4>See issues by assignment</h4>
                            <AssignedList/>
                        </Container>
                    </Col>
                </Row>
            </Container>
       )
    }
}

export default IssueCards