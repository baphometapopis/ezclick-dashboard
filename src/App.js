import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppLayout from './AppLayout';
import HomePage from './Pages/Home/Home';
import LoginPage from './Pages/Login/Login';
import ProposalListPage from './Pages/ProposalList';
import ProposalPage from './Pages/ProposalPage/ProposalPage';
import SuccessPage from './Pages/SuccessPage/SuccessPage';
import ViewReportPage from './Pages/View Report /ViewReport';
import { fetchDataLocalStorage } from './Util/LocalStorage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token is present in local storage
    const token =fetchDataLocalStorage('claim_loginDashboard');
    if (token) {
      setIsLoggedIn(true);


    }
  }, []);

  return (
    <div className='appContainer'>
                <ToastContainer />

      <Router>
        <Routes>
          {/* If logged in successfully, navigate to Home page */}
          {isLoggedIn ? (
            <>
            {/* <Route path="/Home" element={<AppLayout><Navigate to="/Home" /></AppLayout>} /> */}
            <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
            <Route path="/proposal" element={<AppLayout><ProposalPage /></AppLayout>} />
            <Route path="/proposalList" element={<AppLayout><ProposalListPage /></AppLayout>} />
            <Route path="/ViewReportPage" element={<AppLayout><ViewReportPage /></AppLayout>} />
            <Route path="/SuccessPage" element={<AppLayout><SuccessPage /></AppLayout>} />


            </>
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
