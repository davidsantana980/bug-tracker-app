import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import { Routes, Route } from 'react-router-dom';

import GetIssueForm from "./pages/search.js"
import IssueCards from './pages/index.js';
import DeleteIssueForm from './pages/delete.js';
import IssueList from "./pages/issueList.js";
import Issue from './pages/issueDetails.js';

class AppRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path='*' element={<IssueCards />} />
        <Route path='/search' element={<GetIssueForm/>}/>
        <Route path='/delete' element={<DeleteIssueForm/>}/>
        <Route path='/see-issues' element={<IssueList />}/>
        <Route path='/issue' element={<Issue />}/>
      </Routes>
    )
  }
}


export default AppRoutes;
