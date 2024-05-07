// frontend/src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';

const App = () => {
  return (
    <Router>
      {/* Use Routes component instead of Switch */}
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post-list" element={<PostListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
