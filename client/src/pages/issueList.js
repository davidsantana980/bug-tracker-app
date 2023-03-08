import { useState, useEffect } from "react"
import { Button, Card, CardGroup, Container } from "react-bootstrap"
import { useLocation } from "react-router-dom"

export default function IssueList(){
    const [state, changeState] = useState({
        issueList : [],
        dataIsLoaded : false
    })

    let {state : params} = useLocation()
    let queryParams = {...params}
    
    //delete undefined body parameters EXCEPT FOR "open", which is a boolean and can be falsy
    Object.keys(params).forEach(key => {
        return !queryParams[key] && typeof(queryParams[key]) !== "boolean" ? delete queryParams[key] : {}
    });
    
    let url = `http://localhost:5000/api/issues?${new URLSearchParams(queryParams).toString()}` 

    useEffect(() => {
        fetch(url)
        .then((res) => res.json()) //take the response string and turn it into a json array
        .then((json) => { //take the json array from the previous step...
            changeState({
                issueList: json, //...and make our this.state.items<Array> == the JSON<Array> response
                dataIsLoaded:true //changed status
            })
        })  
    })

    let issueCards = state.issueList.map((issue, index) => {
        return (
            <Container className="col-md-12 col-lg-8 mt-2" key={index}>
                <Card key={index}>
                    <Card.Body>
                        <Card.Title>{issue.issue_title}</Card.Title>
                        <Card.Subtitle>ID: {issue._id}</Card.Subtitle>
                        <Card.Text>{issue.status_text}</Card.Text>
                        {/* <LinkContainer to={`/see-issues`} state={{project : issueAndCount[0]}}> */}
                            <Card.Link><Button>See issue details</Button></Card.Link>
                        {/* </LinkContainer> */}
                    </Card.Body>
                </Card>
            </Container>
        )
    })

    if(!state.dataIsLoaded){
        return (
            <Container>
                <h1>Please wait...</h1>
            </Container>
        )
    } 

    return (
        <Container>
            <CardGroup>
                {issueCards}
            </CardGroup>
        </Container>
    )
}