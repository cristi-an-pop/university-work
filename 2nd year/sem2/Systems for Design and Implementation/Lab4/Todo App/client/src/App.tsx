import './App.css';
import Layout from './components/Layout';
import ListsPage from './components/ListsPage';
import TasksPage from './components/TasksPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import Missing from './components/Missing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/lists/:id" element={<TasksPage />} />
          </Route>

          {/* catch all route */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
