import { Component } from "react";
import { Container, Card, CardGroup, Button, Row, Col, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


class IssueCards extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allIssues : [],
            openIssues: [],
            dataIsLoaded : false
        };
    }

    componentDidMount(){
        fetch("http://localhost:5000/api/issues") //?open=true")
        .then((res) => res.json()) //take the response string and turn it into a json array
        .then((json) => { //take the json array from the previous step...
            let openIssues = json.filter(project => project.open )
            this.setState({
                allIssues: json, //...and make our this.state.items<Array> == the JSON<Array> response
                openIssues : openIssues,
                dataIsLoaded:true //changed status
            })
        })  
    }

    uniqueProjectsByProp(prop){
        let responsiveCount=false; // this variable sets if the total count will include projects with no open issues
        if (prop === "project" || prop === "assigned_to") responsiveCount=true; 

        let uniqueByPropArray = [...new Set(this.state.allIssues.map(obj => obj[prop]))];
        let searchResults = [];

        const singleResult = {
            name: "",
            count: 0
        };
          

        for(let propName of uniqueByPropArray){
            let issueNameAndCountPair = Object.create(singleResult, {
                name: {value : propName},
                count: {value : !responsiveCount ? this.state.allIssues.filter(issue => issue[prop] === propName).length : this.state.allIssues.filter(issue => issue.open && issue[prop] === propName).length}
            });

            searchResults.push(issueNameAndCountPair);
        }

        return searchResults;
    }

    render() {

        if(!this.state.dataIsLoaded){
            return (
                <Container>
                    <h1>Please wait...</h1>
                </Container>
            )
        } 

        let ProjectCards = () => {
            let projectAndIssueCountPair = this.uniqueProjectsByProp("project");

            return projectAndIssueCountPair.map((project, index) => {
                return(
                    <Container className="col-md-12 col-lg-6 mt-2" key={project.name}>
                        <Card key={index}>
                            <Card.Body>
                                <Card.Title>{project.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{project.count} open issue(s)</Card.Subtitle>
                                <LinkContainer to={`/see-issues`} state={{project : project.name}}>
                                    <Card.Link><Button>See all issues</Button></Card.Link>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Container>
                )
            }) 
        }

        let CreatorList = () => {
            let creatorAndCountPair = this.uniqueProjectsByProp("created_by");
            return creatorAndCountPair.map((creator, index) => {
                return (
                    <LinkContainer to={`/see-issues`} state={{created_by : creator.name}}> 
                        <Badge pill as="button" bg="info" key={index}>
                            {creator.name} 
                            <Badge bg="secondary">{creator.count}</Badge>
                        </Badge>
                    </LinkContainer> 
                );            
            });
        }

        let AssignedList = () => {
            let assignmentAndCountPair = this.uniqueProjectsByProp("assigned_to").filter(project => !!project.count); //get only pending assignments

            return assignmentAndCountPair.map((user, index) => {
                return (
                    <LinkContainer to={`/see-issues`} state={{assigned_to : user.name}}> 
                        <Badge pill as="button" bg="info" key={index}>
                            {/* <Button size="sm" key={index}> */}
                                {user.name} 
                                <Badge bg="secondary">{user.count}</Badge>
                            {/* </Button> */}
                        </Badge>
                    </LinkContainer>
                    );            
            });
        }

        return(
            <Container fluid className="mb-5">
                <Row>
                    <Col lg={8}>
                        <Container fluid>
                            <CardGroup>
                                <ProjectCards/>
                            </CardGroup>
                        </Container>
                    </Col>
                    <Col lg={4}>
                        <Container className="mt-2">
                            {/* <ButtonToolbar className="justify-content-between"> */}
                                {/* <ButtonGroup size="sm" > */}
                                <h4>See issues by creator</h4>
                                <CreatorList />
                                {/* </ButtonGroup> */}
                            {/* </ButtonToolbar> */}
                        </Container>
                        <hr/>
                        <Container>
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