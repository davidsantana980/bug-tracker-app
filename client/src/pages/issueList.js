import { useState, useEffect, useCallback, useMemo } from "react"
import { Badge, Button, ButtonGroup, Card, CardGroup, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import CreateIssueForm from "./create"
import Issue from "./issueDetails"
import UpdateIssueForm from "./update"

export default function IssueList(){
    //get query params from location reference
    let nav = useNavigate();
    let {state : params} = useLocation();
    //copy params
    let queryParams = useMemo(() => {
        return {...params}
    }, [params])

    if(!!params){ 
        //delete undefined body parameters EXCEPT FOR "open", which is a boolean and can be falsy
        Object.keys(params).forEach(key => {
            return !queryParams[key] && typeof(queryParams[key]) !== "boolean" ? delete queryParams[key] : {}
        });
    }

    const [state, changeState] = useState({
        issueList : [],
        dataIsLoaded : false,
        message : ""
    })
    
    let loadItems = useCallback(() => {
        let url = `${process.env.REACT_APP_API_LINK}?${new URLSearchParams(queryParams).toString()}` 

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
                message : "Oops! Not found"
            })
        })  
    }, [queryParams])

    useEffect(() => {
        if(!params) return nav("/", {replace : true});
        return loadItems
    }, [state.dataIsLoaded, loadItems, nav, params])

    function closeIssue(state){
        fetch(process.env.REACT_APP_API_LINK, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(state)
        })
        .then((res) =>  res.json())
        .then(() => {
            loadItems()
        }) 
        .catch(error => {
            console.log(error)
        })
    }
    
    function ReturnButton  (props) {
        return (
            <Container className="d-grid mt-3">
                <LinkContainer to={`/`} >
                    <Button variant="primary" size="lg">
                        Go back to main menu
                    </Button>
                </LinkContainer> 
            </Container>
        )
    }

    if(state.dataIsLoaded){
        let issueCards = state.issueList.map((issue, index) => {
            return (
                    <Container fluid key={index} className="mb-2">
                        <Card key={index} className="text-center">
                            <Card.Body>
                                <Row className="mb-3">
                                    <Col>
                                        <Container fluid>
                                            <Card.Title><b>Issue title:</b> {issue.issue_title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{issue.status_text ? `Status: ${issue.status_text}` : ""}</Card.Subtitle>

                                            <Card.Text>
                                                {issue.issue_text ? (
                                                    <span><b>Summary:</b> {issue.issue_text}</span>
                                                ) : (
                                                    "Click button for more details"
                                                )}
                                            </Card.Text>
                                            <Card.Text><Badge pill bg="success">{!issue.open ? `This issue is solved!` : ""}</Badge></Card.Text>
                                        </Container>    
                                    </Col>
                                </Row>
                                <Row >
                                    <Container>
                                        <ButtonGroup className="flex-wrap">
                                            <Card.Link as={Button} className="btn btn-dark">
                                                <Issue props={issue}/>
                                            </Card.Link>
                                            <Card.Link as={Button} className={`btn ${issue.open ? "btn-success" : "btn-primary"}`}>
                                                <span onClick={() => closeIssue({_id: issue._id , open: !issue.open})} >{issue.open ? "Close this issue" : "Re-open issue"}</span>
                                            </Card.Link>                     
                                            <Card.Link as={Button} className="btn btn-secondary">
                                                <UpdateIssueForm  props = {issue}>Update issue</UpdateIssueForm>
                                            </Card.Link>
                                        </ButtonGroup>
                                    </Container>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
            )
        })

        //if the list issue is a project's...
        if(Object.keys(queryParams).length === 1 && Object.keys(queryParams).pop() === "project"){
            return (         
                <Container fluid className="mb-5">
                    <Row>
                        <Col lg={7}>
                            <Container fluid className="mt-2 p-3 border bg-light">
                                <h3>Project {queryParams.project}'s issues:</h3>
                            </Container>
                            <Container fluid className="border">
                                <CardGroup className="mt-2">
                                    {issueCards}
                                </CardGroup>
                            </Container>
                        </Col>
                        <Col lg={5}>
                            <Container fluid className="mt-2">
                                <CreateIssueForm state={queryParams.project} />
                            </Container>
                            <ReturnButton/>
                        </Col>
                    </Row>
                </Container>
            )
        }else{   
            return (
                <>
                    <Container fluid className="mt-2 p-3  col-lg-8 border bg-light">
                        <h3>Search results:</h3>
                    </Container>
                    <Container className="border col-md-12 col-lg-8 mb-5" >
                        <CardGroup className="mt-3">
                            {issueCards}
                        </CardGroup>
                        <Container className="mb-3">
                            <ReturnButton  />
                        </Container>
                    </Container>
                </>
            ) 
        }

    }

    let message = "Please wait..."

    if(state.message){
        message = state.message
    }

    return (
        <Container fluid className="mt-2 p-4  col-lg-8 border bg-light">
            <h1>{message}</h1>
        </Container>
    )
}