
export default function IssueList(props){
    // const {issueList} = props

    //this is supposed to be an array de objetos donde project === el nombre del label de la projectCard
    const issueList = [{
            "_id": "6399def2b8de7be5d8451ae2",
            "project": "proyeye",
            "issue_title": "Test",
            "issue_text": "Text",
            "created_on": "Wed Dec 14 2022 10:34:26 GMT-0400 (hora de Venezuela)",
            "updated_on": "Wed Dec 14 2022 10:34:25 GMT-0400 (hora de Venezuela)",
            "created_by": "Salvador",
            "assigned_to": "Sabrina",
            "open": true,
            "status_text": "191",
            "__v": 0
        }, 
        {
            "_id": "824u285772458dakfbbla32",
            "project": "proyeye",
            "issue_title": "Test",
            "issue_text": "Text",
            "created_on": "Wed Dec 14 2022 10:34:26 GMT-0400 (hora de Venezuela)",
            "updated_on": "Wed Dec 14 2022 10:34:25 GMT-0400 (hora de Venezuela)",
            "created_by": "Sabrina",
            "assigned_to": "Salvador",
            "open": true,
            "status_text": "191",
            "__v": 0
        }
    ]
  
    let issueCards = issueList.map((issue, index) => {
            return (
                <tr key={index}>
                    <td key={0}>{issue._id}</td>
                    <td key={1}>{issue.issue_title}</td>
                    <td key={2}>{issue.issue_text}</td>
                    <td key={3}>{issue.created_on}</td>
                    <td key={4}>{issue.updated_on}</td>
                    <td key={5}>{issue.created_by}</td>
                    <td key={6}>{issue.assigned_to}</td>
                    <td key={7}>{issue.open ? "In progress" : "Closed"}</td>
                    <td key={8}>{issue.status_text}</td>
                </tr>
            )
        }
    )

    return (
        <table>
            <tbody>
                {issueCards}
            </tbody>
        </table>
    )
}