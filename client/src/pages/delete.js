import { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";

export default function DeleteIssueForm(){
    let {state : obj} = useLocation()
    let nav = useNavigate()
  
    useEffect(() => {
      if(obj._id){
        fetch(`http://localhost:5000/api/issues`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({_id: obj._id})
        })
        .then((res) =>  res.json())
        .then(result => console.log(result)) 
        .catch(error => {
          console.log(error)
        })
  
        return (
          //redirect to project issue list
          nav("/see-issues", {replace : true, state: {project : obj.project}})
        )
      }
    }, [obj._id, nav, obj.project]
  )
}
  