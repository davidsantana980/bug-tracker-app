import { Component } from "react";
import { Container, Card, CardGroup, Button, Row, Col, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CreateProjectForm from "./createProject";


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
        try{
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
        }catch(error){
            this.setState({
                dataIsLoaded:true //changed status
            })
        }
    }

    uniqueProjectsByProp(prop){
        let uniqueByPropArray = [...new Set(this.state.allIssues.map(obj => obj[prop]))];
        let searchResults = [];

        const singleResult = {
            name: "",
            openIssueCount: 0,
            totalCount: 0
        };          

        for(let propName of uniqueByPropArray){
            let nameAndCounts = Object.create(singleResult, {
                name: {value : propName},
                //if the searched prop is a project or assignment list of issues, the count will be 1) the "open" amount of issues and 2) the total amount of issues for said prop. 
                totalCount: {value :  this.state.allIssues.filter(issue => issue[prop] === propName).length },
                openIssueCount : {value: this.state.allIssues.filter(issue => issue.open && issue[prop] === propName).length}
            });

            searchResults.push(nameAndCounts);
        }

        return searchResults;
    }

    render() {

        if(!this.state.dataIsLoaded){
            return (
                <Container>
                    <h3>Please wait...</h3>
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
                                <Card.Subtitle className="mb-2 text-muted">{project.openIssueCount} {project.openIssueCount === 1 ? "issue" : "issues"} in progress, {project.totalCount} total</Card.Subtitle>
                                <LinkContainer to={`/see-issues`} state={{project : project.name}}>
                                    <Card.Link><Button>See all issues</Button></Card.Link>
                                </LinkContainer>
                                <LinkContainer to={`/delete`} state={{project : project.name}}>
                                    <Card.Link><Button variant="danger">Delete project</Button></Card.Link>
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
                    <LinkContainer to={`/see-issues`} state={{created_by : creator.name}} key={index}> 
                        <Badge pill as="button" bg="info" key={index}>
                            {!!creator.name ? creator.name : "Unknown"} 
                            <Badge bg="secondary">{creator.totalCount}</Badge>
                        </Badge>
                    </LinkContainer> 
                );            
            });
        }

        let AssignedList = () => {
            let assignmentAndCountPair = this.uniqueProjectsByProp("assigned_to").filter(project => !!project.openIssueCount); //get only pending assignments

            return assignmentAndCountPair.map((user, index) => {
                return (
                    <LinkContainer to={`/see-issues`} state={{assigned_to : user.name}} key={index}> 
                        <Badge pill as="button" bg="info" key={index}>
                            {/* <Button size="sm" key={index}> */}
                                {!!user.name ? user.name : "Unknown"} 
                                <Badge bg="secondary">{user.openIssueCount}</Badge>
                            {/* </Button> */}
                        </Badge>
                    </LinkContainer>
                    );            
            });
        }

        if(!this.state.allIssues.length){
            return(
                <Container className="mx-auto">
                    <Row>
                        <Col>
                            <Container className="mt-1 justify-content-center p-3 border bg-light">
                                <Container className="text-center">
                                    <h3>Create a new project to start!</h3>
                                </Container>
                                <Container>
                                    <CreateProjectForm />
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container fluid className="mb-5">
                    <Row>
                        <Col lg={8}>
                            <Container fluid className="mt-1">
                                <Container className="p-3 border bg-light">
                                    <h2>Your projects:</h2>
                                </Container>
                                <Container className="border">
                                    <CardGroup className="mb-2">
                                        <ProjectCards/>
                                    </CardGroup>
                                </Container>
                            </Container>
                        </Col>
                        <Col lg={4}>
                            <Container className="mt-2">
                                <h4>See issues by creator</h4>
                                <CreatorList />
                            </Container>
                            <hr/>
                            <Container>
                                <h4>See issues by assignment</h4>
                                <AssignedList/>
                            </Container>
                            <hr/>
                            <Container>
                                <CreateProjectForm />
                            </Container>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default IssueCards