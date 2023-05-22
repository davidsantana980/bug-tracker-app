import {  Container, Form, Button, Modal, Badge } from "react-bootstrap";
import {useState} from "react";
import { useNavigate } from "react-router-dom"

let DetailsModal = (props) => {
  let info = {...props.props}
  let nav = useNavigate();

  let [state, setState] =  useState({
    _id:  info._id,
    issue_title:  info.issue_title,
    issue_text:   info.issue_text, 
    created_by:  info.created_by,
    assigned_to :  info.assigned_to, 
    status_text: info.status_text,
    ...info
  });

  let [updatedStatus, setStatus] = useState(false);

  const handleChange = (event) => {
      const inputName = event.target.name
      const inputValue = event.target.value;
  
      return setState({
        ...state,
        [inputName]: inputValue
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let content = {...state};

    fetch(`http://localhost:5000/api/issues/`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content)
    })
    .then((res) =>  res.json())
    .then(result => {
      return nav("/see-issues", {state : {project : content.project} , replace:true})
    }) 
    .catch(error => {
      console.log(error)
    })
    
    setStatus(true);
  }

  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-deleteModal-title-vcenter"
        centered
      >
          <Modal.Body>
            <Container>
              <Form id="testForm2">
                  <Form.Control value={state.issue_title} onChange={handleChange} type="text" name="issue_title" placeholder="Title" required=''/>
                  <Form.Control value={state.issue_text} onChange={handleChange} as="textarea" name="issue_text" placeholder="(opt)Text" required=''/>
                  <Form.Control value={state.created_by} onChange={handleChange} type="text" name="created_by" placeholder="(opt)Created by" required=''/>
                  <Form.Control value={state.assigned_to} onChange={handleChange} type="text" name="assigned_to" placeholder="(opt)Assigned to" />
                  <Form.Control value={state.status_text} onChange={handleChange} type="text" name="status_text" placeholder="(opt)Status text" />
                  <Container className="d-grid mt-3">
                    <Badge pill bg="success" className="mb-2">{updatedStatus ? `Just updated!` : `Last updated on: ${state.updated_on}`}</Badge>
                    <Button variant="primary" size="lg" onClick={handleSubmit} type="submit">Update Issue</Button>
                  </Container>
              </Form>
            </Container>
          </Modal.Body>
      </Modal>
  )
} 

export default function UpdateIssueForm(props){
    let info = {...props.props};
    const [detailsModal, setDetailsModal] = useState({show: false, props : {...info}});
  
    if(!info){
        return (
            <Container>
                <h1>Unexpected error, issue not found</h1>
            </Container>
        )
    }

    return (
        <>
            <Button onClick={() => setDetailsModal({show: true})} variant="secondary">Update issue</Button>
            <DetailsModal 
                show={detailsModal.show}
                onHide={() => setDetailsModal({show :false})}
                props={detailsModal.props}
            />
        </>        
    )
  }