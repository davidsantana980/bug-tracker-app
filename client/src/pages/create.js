import { Container, Form, Button, FormGroup } from "react-bootstrap";
import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateIssueForm(){
    let {state : info} = useLocation()
    let nav = useNavigate();

    const [state, setState] = useState({
      issue_project: info.project,
      issue_title: "",
      issue_text: "", 
      created_by: "",
      assigned_to: "", 
      status_text: ""
    });

    const [validated, setValidated] = useState(false);
  
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

      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        return
      }
      
      setValidated(true)
      fetch(process.env.REACT_APP_API_LINK, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
      .then((res) => res.json())
      .then(result => {
        return nav("/see-issues", {replace : true, state: {project : state.issue_project}})
      })
      .catch(error => {
        console.log(error)
      })
    }
  
    return (
        <Container>
            <Container fluid className="p-3 border bg-light">
              <h3>
                Submit a new issue to this project
              </h3>
            </Container>
            <Container className="border">
              <Form id="testForm" className="mb-2 mt-2" validated={validated}>
                  <Form.Label visuallyHidden>
                        Submit a new issue to this project
                  </Form.Label>
                  <FormGroup>
                    <Form.Control required value={state.issue_title} onChange={handleChange} type="text" name="issue_title" placeholder="Title" />
                  </FormGroup>   
                  <FormGroup>
                    <Form.Control required value={state.issue_text} onChange={handleChange} as="textarea" name="issue_text" placeholder="Text" />
                  </FormGroup>  
                  <FormGroup>
                    <Form.Control required value={state.created_by} onChange={handleChange} type="text" name="created_by" placeholder="Created by" />
                  </FormGroup>  
                  <FormGroup>
                    <Form.Control required value={state.assigned_to} onChange={handleChange} type="text" name="assigned_to" placeholder="Assigned to"/>
                  </FormGroup>      
                  <FormGroup className="mb-2">
                    <Form.Control value={state.status_text} onChange={handleChange} type="text" name="status_text" placeholder="Optional status text"/>
                  </FormGroup>  
                  <Container fluid className="d-grid mt-2">
                    <Button type="submit" size="lg" onClick={handleSubmit}>Submit Issue</Button>
                  </Container>
              </Form>
            </Container>
        </Container>
    )
  }
  