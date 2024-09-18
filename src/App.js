import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { makeApiCall } from './Api/makeApiCall';
import AppLayout from './AppLayout';
import { DownTime } from './Pages/DowntinePage/DownTime';
import HomePage from './Pages/Home/Home';
import LoginPage from './Pages/Login/Login';
import ManualUpload from './Pages/ManualUploas/ManualUpload';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import ProposalListPage from './Pages/ProposalList';
import ProposalPage from './Pages/ProposalPage/ProposalPage';
import SuccessPage from './Pages/SuccessPage/SuccessPage';
import UpdateList from './Pages/Update Modal/UpdateList';
import ViewReportPage from './Pages/View Report /ViewReport';
import { fetchDataLocalStorage } from './Util/LocalStorage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [ip, setIp] = useState('');
  // const accesableIp = "59.152.55.202";

// const  fetchIP=async()=>{
//     try {
//       const response = await fetch('https://api.ipify.org?format=json');
//       const data = await response.json();
//       setIp(data.ip);
//     } catch (error) {
//       console.error("Error fetching the IP address: ", error);
//     }
  
// }

  // useEffect(() => {

    

  //   fetchIP();
  // }, []);

  useEffect(() => {
    // Check if token is present in local storage
    const token = fetchDataLocalStorage('claim_loginDashboard');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // if (ip && ip !== accesableIp) {
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="*" element={<DownTime />} />
  //       </Routes>
  //     </Router>
  //   );
  // }
  return (
    <div className='appContainer'>
    <ToastContainer />
    <Router>
      <Routes>
        {/* If logged in successfully, navigate to Home page */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
            <Route path="/proposal" element={<AppLayout><ProposalPage /></AppLayout>} />
            <Route path="/proposalList" element={<AppLayout><ProposalListPage /></AppLayout>} />
            <Route path="/ViewReportPage" element={<AppLayout><ViewReportPage /></AppLayout>} />
            <Route path="/SuccessPage" element={<AppLayout><SuccessPage /></AppLayout>} />
            <Route path="/ManualUpload" element={<AppLayout><ManualUpload /></AppLayout>} />
            <Route path="/UpdateList" element={<AppLayout><UpdateList /></AppLayout>} />

          </>
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
