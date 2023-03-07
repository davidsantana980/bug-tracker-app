import {  Container, Form, Button } from "react-bootstrap";
import {useState} from "react";

export default function DeleteIssueForm(){
    const [id, setId] = useState({_id : ""})
  
    const handleSubmit = (event) => {
      event.preventDefault()
      fetch(`http://localhost:5000/api/issues`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
      })
      .then((res) =>  res.json())
      .then(result => console.log(result)) 
      .catch(error => {
        console.log(error)
      })
    }
    
    return (
        <Container>
            <Form id="testForm3">
                <Form.Label>Delete issue on a project</Form.Label>
                <Form.Control value={id._id} onChange={(event) => setId({_id: event.target.value})} type="text" name="_id" placeholder="_id" required=''/>
                <Button onClick={handleSubmit} type="submit">Delete Issue</Button>
            </Form>
        </Container>
    )
  }
  