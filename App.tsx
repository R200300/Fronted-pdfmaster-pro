
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Editor from './pages/Editor';
import ResumeBuilder from './pages/ResumeBuilder';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Security from './pages/Security';
import ScrollToTop from './components/ScrollToTop';
import { PrivacyPolicy, TermsConditions } from './pages/Legal';
import { SubscriptionProvider } from './context/SubscriptionContext';

const App: React.FC = () => {
  return (
    <SubscriptionProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:toolId" element={<Editor />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
          </Routes>
        </Layout>
      </Router>
    </SubscriptionProvider>
  );
};

export default App;
