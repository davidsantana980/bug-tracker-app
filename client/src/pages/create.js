import { Container, Form, Button } from "react-bootstrap";
import {useState} from "react";

export default function CreateIssueForm(){
    const [state, setState] = useState({
      issue_project: "",
      issue_title: "",
      issue_text: "", 
      created_by: "",
      assigned_to: "", 
      status_text: ""
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
      event.preventDefault()
      fetch(`http://localhost:5000/api/issues`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
      .then((res) => res.json())
      .then(result => console.log(result)) 
      .catch(error => {
        console.log(error)
      })
    }
  
    return (
        <Container>
            <Form id="testForm">
                <Form.Label>Submit new issue to database</Form.Label>
                <Form.Control value={state.issue_project} onChange={handleChange} type="text" name="issue_project" placeholder="Project of which an issue is to be submitted"/>
                <Form.Control value={state.issue_title} onChange={handleChange} type="text" name="issue_title" placeholder="*Title" required=''/>
                <Form.Control value={state.issue_text} onChange={handleChange} as="textarea" name="issue_text" placeholder="*Text" required=''/>
                <Form.Control value={state.created_by} onChange={handleChange} type="text" name="created_by" placeholder="*Created by" required=''/>
                <Form.Control value={state.assigned_to} onChange={handleChange} type="text" name="assigned_to" placeholder="(opt)Assigned to"/>
                <Form.Control value={state.status_text} onChange={handleChange} type="text" name="status_text" placeholder="(opt)Status text"/>
                <Button type="submit" onClick={handleSubmit}>Submit Issue</Button>
            </Form>
        </Container>
    )
  }
  