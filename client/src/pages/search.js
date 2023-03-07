import { Form, Button, Container } from "react-bootstrap";
import {useState} from "react";

export default function GetIssueForm() {
    const [projectObj, setProject] = useState({
      project: "",
      assigned_to: "",
      status_text: "",
      open: undefined,
      _id: "",
      issue_title: "",
      issue_text: "",
      created_by: ""
    });
  
    const handleChange = (event) => {
      const inputName = event.target.name
      const inputValue = event.target.value;
  
      setProject({
        ...projectObj,
        [inputName]: inputValue
      });
    }
  
    const handleCheck = () => {
  
      setProject({
        ...projectObj,
        open : projectObj.open === undefined ? false : !projectObj.open
      })  
  
      console.log(projectObj.open)
    }
  
    let handleSubmit = (event) => {
      event.preventDefault()
      let queryParams = {...projectObj}
  
      //delete undefined body parameters EXCEPT FOR "open", which is a boolean and can be falsy
      Object.keys(projectObj).forEach(key => {
        return !queryParams[key] && typeof(queryParams[key]) !== "boolean" ? delete queryParams[key] : {}
      });
  
      let url = `http://localhost:5000/api/issues?${new URLSearchParams(queryParams).toString()}` 
  
      fetch(url)
      .then((res) =>  res.json())
      .then(result => {
        console.log(result[0])
      })
    
    }
  
    return (
    <Container>
        <Form>
            <Form.Label>Get all issues in a project, or specify with extra fields</Form.Label>
            <Form.Control value={projectObj.project} onChange={handleChange} type="text" placeholder="Project name" name='project' />
            <Form.Control value={projectObj._id} onChange={handleChange} type="text" name="_id" placeholder="*_id" required=''/>
            <Form.Control value={projectObj.issue_title} onChange={handleChange} type="text" name="issue_title" placeholder="(opt)Title" required=''/>
            <Form.Control value={projectObj.issue_text} onChange={handleChange} as="textarea" name="issue_text" placeholder="(opt)Text" required=''/>
            <Form.Control value={projectObj.created_by} onChange={handleChange} type="text" name="created_by" placeholder="(opt)Created by" required=''/>
            <Form.Control value={projectObj.assigned_to} onChange={handleChange} type="text" name="assigned_to" placeholder="(opt)Assigned to" />
            <Form.Control value={projectObj.status_text} onChange={handleChange} type="text" name="status_text" placeholder="(opt)Status text" />
            <Form.Check value={projectObj.open} onChange={handleCheck} name="open" type='checkbox' label="Are the issues closed?"/>      
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    </Container>
    );
  }
  