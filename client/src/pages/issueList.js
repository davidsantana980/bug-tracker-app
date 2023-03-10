import { useState, useEffect } from "react"
import { Badge, Button, Card, CardGroup, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useLocation } from "react-router-dom"

export default function IssueList(){
    const [state, changeState] = useState({
        issueList : [],
        dataIsLoaded : false,
        message : ""
    })

    //get query params from location reference
    let {state : params} = useLocation()
    //copy params
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
            if(typeof json === "object" && json.length >= 1){
                return changeState({
                    issueList: json, //...and make our this.state.items<Array> == the JSON<Array> response
                    dataIsLoaded:true //changed status
                })
            }

            return changeState({
                dataIsLoaded : false,
                message : "Issue not found"
            })
        })  
    }, [state.dataIsLoaded, url])

    if(state.dataIsLoaded){
        let issueCards = state.issueList.map((issue, index) => {
            return (
                <>
                    <Container fluid key={index} className="mb-2">
                        <Card key={index} className="text-center">
                            <Card.Body>
                                <Card.Title>{issue.issue_title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{issue.status_text ? `Status: ${issue.status_text}` : ""}</Card.Subtitle>

                                <Card.Text>{issue.issue_text ? `Summary: ${issue.issue_text}` : "Click button for more details"}</Card.Text>
                                <Card.Text><Badge pill bg="success">{!issue.open ? `This issue is solved!` : ""}</Badge></Card.Text>
        
                                <LinkContainer to={`/issue`} state={issue}>
                                    <Card.Link><Button variant="info">See issue details</Button></Card.Link>
                                </LinkContainer>

                                <LinkContainer to={`/update`} state={issue}>
                                    <Card.Link><Button variant="secondary">Update issue</Button></Card.Link>
                                </LinkContainer>
                             </Card.Body>
                        </Card>
                    </Container>
                </>
            )
        })

        
        return (
            <Container className="col-md-12 col-lg-8 mt-2" >
                <CardGroup>
                    {issueCards}
                </CardGroup>
            </Container>
        ) 
    }

    let message = "Please wait..."

    if(state.message){
        message = state.message
    }

    return (
        <Container>
            <h1>{message}</h1>
        </Container>
    )
}