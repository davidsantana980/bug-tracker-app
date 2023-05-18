import {  Container, Form, Button, Modal } from "react-bootstrap";
import {useState} from "react";
// import { useNavigate } from "react-router-dom"

let DetailsModal = (props) => {
  let info = {...props.props}
  // let navigate = useNavigate()

  let [state, setState] = useState({
    _id: info._id,
    issue_title: info.issue_title,
    issue_text: info.issue_text, 
    created_by: info.created_by,
    assigned_to : info.assigned_to, 
    status_text: info.status_text,
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   fetch(`http://localhost:5000/api/issues/`, {
  //     method: "PUT", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(state)
  //   })
  //   .then((res) =>  res.json())
  //   .then(result => {
  //     // return navigate("/see-issues", {state: result})
  //     return navigate("/see-issues", {project : state.issue_project})
  //   }) 
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

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
                  <Form.Label>Update issue on a project (Change any or all to update issue on the _id supplied)</Form.Label>
                  <Form.Control value={state._id} onChange={handleChange} type="text" name="_id" placeholder="*_id" required=''/>
                  <Form.Control value={state.issue_title} onChange={handleChange} type="text" name="issue_title" placeholder="(opt)Title" required=''/>
                  <Form.Control value={state.issue_text} onChange={handleChange} as="textarea" name="issue_text" placeholder="(opt)Text" required=''/>
                  <Form.Control value={state.created_by} onChange={handleChange} type="text" name="created_by" placeholder="(opt)Created by" required=''/>
                  <Form.Control value={state.assigned_to} onChange={handleChange} type="text" name="assigned_to" placeholder="(opt)Assigned to" />
                  <Form.Control value={state.status_text} onChange={handleChange} type="text" name="status_text" placeholder="(opt)Status text" />
                  {/* <Container className="d-grid mt-3">
                    <Button variant="primary" size="lg" onClick={handleSubmit} type="submit">Submit Issue</Button>
                  </Container> */}
              </Form>
            </Container>
          </Modal.Body>
      </Modal>
  )
} 

export default function UpdateIssueForm(props){
    let info = {...props.props};
    const [detailsModal, setDetailsModal] = useState({show: false, props : {}});
  
    // if(!info){
    //     return (
    //         <Container>
    //             <h1>Unexpected error, issue not found</h1>
    //         </Container>
    //     )
    // }

    return (
        <>
            <Button onClick={() => setDetailsModal({show: true, props: info})} variant="secondary">Update issue</Button>
            <DetailsModal 
                show={detailsModal.show}
                onHide={() => setDetailsModal({show :false})}
                props={detailsModal.props}
            />
        </>        
    )
  }