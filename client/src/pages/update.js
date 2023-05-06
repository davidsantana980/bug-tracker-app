import {  Container, Form, Button } from "react-bootstrap";
import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap";

let ReturnButton = (props) => {
  return (
      <Container className="d-grid mt-3">
          <LinkContainer to={`/see-issues`} state={{project : props.project}}>
              <Button variant="primary" size="lg">
                  Go back to project menu
              </Button>
          </LinkContainer> 
      </Container>
  )
}

export default function UpdateIssueForm(){
    let {state : info} = useLocation()
    let navigate = useNavigate()


    const [state, setState] = useState({
      _id: "" || info._id,
      issue_title: "" || info.issue_title,
      issue_text: "" || info.issue_text, 
      created_by: "" || info.created_by,
      assigned_to: "" || info.assigned_to, 
      status_text: ""|| info.status_text,
      ...info
    });
  
    const handleChange = (event) => {
      const inputName = event.target.name
      const inputValue = event.target.value;
  
      setState({
        ...state,
        [inputName]: inputValue
      });
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();

      fetch(`http://localhost:5000/api/issues/`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state)
      })
      .then((res) =>  res.json())
      .then(result => {
        return navigate("/issue", {state: result})
      }) 
      .catch(error => {
        console.log(error)
      })
    }
  
    return (
        <Container>
            <Form id="testForm2">
                <Form.Label>Update issue on a project (Change any or all to update issue on the _id supplied)</Form.Label>
                <Form.Control value={state._id} onChange={handleChange} type="text" name="_id" placeholder="*_id" required=''/>
                <Form.Control value={state.issue_title} onChange={handleChange} type="text" name="issue_title" placeholder="(opt)Title" required=''/>
                <Form.Control value={state.issue_text} onChange={handleChange} as="textarea" name="issue_text" placeholder="(opt)Text" required=''/>
                <Form.Control value={state.created_by} onChange={handleChange} type="text" name="created_by" placeholder="(opt)Created by" required=''/>
                <Form.Control value={state.assigned_to} onChange={handleChange} type="text" name="assigned_to" placeholder="(opt)Assigned to" />
                <Form.Control value={state.status_text} onChange={handleChange} type="text" name="status_text" placeholder="(opt)Status text" />
                <Container className="d-grid mt-3">
                  <Button variant="primary" size="lg" onClick={handleSubmit} type="submit">Submit Issue</Button>
                </Container>
            </Form>
            <ReturnButton project={state.project}/>
        </Container>
    )
  }