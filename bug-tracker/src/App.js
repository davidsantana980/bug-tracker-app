import 'bootstrap/dist/css/bootstrap.min.css';

import { Component, useState } from "react";
import { Container, Form, Button, FormGroup } from "react-bootstrap";

function GetIssueForm() {
  const [project, setProject] = useState("");

  let handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:5000/api/issues/${project}/`)
    .then((res) => {
      console.log(res.json())
    }) 
  }

  let handleChange = (event) => setProject(event.target.value)

  return (
    <Form>
      <Form.Label>Get all issues in a project...</Form.Label>
      <Form.Control type="text" placeholder="Check console for results!" onChange={handleChange} value={project}/>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

function PostIssueForm(){
  return (
    <Form id="testForm">
      <Form.Label>Submit new issue to database</Form.Label>
      <Form.Control type="text" name="issue_project" placeholder="Project of which an issue is to be submitted"/>
      <Form.Control type="text" name="issue_title" placeholder="*Title" required=''/>
      <Form.Control as="textarea" name="issue_text" placeholder="*Text" required=''/>
      <Form.Control type="text" name="created_by" placeholder="*Created by" required=''/>
      <Form.Control type="text" name="assigned_to" placeholder="(opt)Assigned to"/>
      <Form.Control type="text" name="status_text" placeholder="(opt)Status text"/>
      <Button type="submit">Submit Issue</Button>
  </Form>
  )
}

function UpdateIssueForm(){
  return (
    <Form id="testForm2">
        <Form.Label>Update issue on a project (Change any or all to update issue on the _id supplied)</Form.Label>
        <Form.Control type="text" name="issue_project" placeholder="Project of which an issue is to be updated"/>
        <Form.Control type="text" name="_id" placeholder="*_id" required=''/>
        <Form.Control type="text" name="issue_title" placeholder="(opt)Title" required=''/>
        <Form.Control as="textarea" name="issue_text" placeholder="(opt)Text" required=''/>
        <Form.Control type="text" name="created_by" placeholder="(opt)Created by" required=''/>
        <Form.Control type="text" name="assigned_to" placeholder="(opt)Assigned to" />
        <Form.Control type="text" name="status_text" placeholder="(opt)Status text" />
        <Form.Check value="false" name="open" type='checkbox' label="Check to close issue"/>
        <Button type="submit">Submit Issue</Button>
    </Form>
  )
}


function DeleteIssueForm(){
  return (
    <Form id="testForm3">
        <Form.Label>Delete issue on a project</Form.Label>
        <Form.Control type="text" name="issue_project" placeholder="Project of which an issue is to be deleted"/>
        <Form.Control type="text" name="_id" placeholder="_id" required=''/>
        <Button type="submit">Delete Issue</Button>
    </Form>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Container>  
        <FormGroup>

          <GetIssueForm/>
          <hr/>
          <PostIssueForm/>
          <hr/>
          <UpdateIssueForm/>
          <hr/>
          <DeleteIssueForm/>

        </FormGroup>
        <br/>
      </Container>
    )
  }
}


export default App;
