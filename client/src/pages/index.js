import { Component } from "react";
import { Container, Card, CardGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
                            <Card.Subtitle className="mb-2 text-muted">{issueAndCount[1]} issues</Card.Subtitle>
                            <LinkContainer to={`/see-issues`} state={{project : issueAndCount[0]}}>
                                <Card.Link><Button>See all issues</Button></Card.Link>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </Container>
            )
        }) 

        return(
            <Container>
                <CardGroup>
                    {headerCards}
                </CardGroup>
            </Container>
       )
    }
}

export default IssueCards