import { Route, Routes } from 'react-router';
import { NavBar } from '@/components/NavBar';
import SubmitInquiryPage from '@/pages/SubmitInquiryPage';
import InquiriesPage from '@/pages/InquiriesPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SubmitInquiryPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
      </Routes>
    </>
  );
}

export default App;
