import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import { LoginPage } from './pages/LoginPage';


const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<Main />} />
      <Route path="api/jobs/:id" element={<JobDetailPage />} />
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  </Router>
);

export default App;
