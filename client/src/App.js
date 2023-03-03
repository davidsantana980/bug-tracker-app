import 'bootstrap/dist/css/bootstrap.min.css';

import { Component, useState } from "react";
import { Container, Form, Button, FormGroup } from "react-bootstrap";

function GetIssueForm() {
  const [projectObj, setProject] = useState({
    project: "",
    assigned_to: "",
    status_text: "",
    //gonna look for open issues by default
    open: true,
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
      open : !projectObj.open
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

    console.log(url)
    fetch(url)
    .then((res) => {
      console.log(res.json())
    }) 
  }

  return (
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
  );
}

function PostIssueForm(){
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
    .then((res) => {
      console.log(res.json())
    }) 
    .catch(error => {
      console.log(error)
    })
  }

  return (
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
  )
}

function UpdateIssueForm(){

  const [state, setState] = useState({
    _id: "",
    issue_title: "",
    issue_text: "", 
    created_by: "",
    assigned_to: "", 
    status_text: "",
    open: true
  });

  const handleChange = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value;

    setState({
      ...state,
      [inputName]: inputValue
    });
  }

  const handleCheck = () => {
    setState({
      ...state,
      open : !state.open
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(JSON.stringify(state))
    fetch(`http://localhost:5000/api/issues/`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state)
    })
    .then((res) => {
      console.log(res.json())
    }) 
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <Form id="testForm2">
        <Form.Label>Update issue on a project (Change any or all to update issue on the _id supplied)</Form.Label>
        <Form.Control value={state._id} onChange={handleChange} type="text" name="_id" placeholder="*_id" required=''/>
        <Form.Control value={state.issue_title} onChange={handleChange} type="text" name="issue_title" placeholder="(opt)Title" required=''/>
        <Form.Control value={state.issue_text} onChange={handleChange} as="textarea" name="issue_text" placeholder="(opt)Text" required=''/>
        <Form.Control value={state.created_by} onChange={handleChange} type="text" name="created_by" placeholder="(opt)Created by" required=''/>
        <Form.Control value={state.assigned_to} onChange={handleChange} type="text" name="assigned_to" placeholder="(opt)Assigned to" />
        <Form.Control value={state.status_text} onChange={handleChange} type="text" name="status_text" placeholder="(opt)Status text" />
        <Form.Check value={state.open} onChange={handleCheck} name="open" type='checkbox' label="Check to close issue"/>
        <Button onClick={handleSubmit} type="submit">Submit Issue</Button>
    </Form>
  )
}


function DeleteIssueForm(){
  const [id, setId] = useState({_id : ""})

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(JSON.stringify(id))
    fetch(`http://localhost:5000/api/issues`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id)
    })
    .then((res) => {
      console.log(res.json())
    }) 
    .catch(error => {
      console.log(error)
    })
  }
  
  return (
    <Form id="testForm3">
        <Form.Label>Delete issue on a project</Form.Label>
        <Form.Control value={id._id} onChange={(event) => setId({_id: event.target.value})} type="text" name="_id" placeholder="_id" required=''/>
        <Button onClick={handleSubmit} type="submit">Delete Issue</Button>
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
