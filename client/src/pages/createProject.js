import { Container, Form, Button, FormGroup } from "react-bootstrap";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProjectForm(){
    let nav = useNavigate();

    const [state, setState] = useState({
      issue_project: "",
      issue_title: "Sample issue",
      issue_text: "This is a sample issue", 
      created_by: "System",
      assigned_to: "You", 
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
            <Form id="testForm" validated={validated}>
                <FormGroup className="mb-2">
                  <Form.Control required value={state.issue_project} onChange={handleChange} type="text" name="issue_project" placeholder="Project name" />
                </FormGroup>       
                <Button type="submit" size="sm" onClick={handleSubmit}>Create</Button>
            </Form>
        </Container>
    )
  }
  