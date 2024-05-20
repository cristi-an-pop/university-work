import './App.css';
import Layout from './components/Layout';
import ListsPage from './components/ListsPage';
import TasksPage from './components/TasksPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 1011,
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* private routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
            <Route path="/lists" element={<ListsPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
            <Route path="/tasks/:listid" element={<TasksPage />} />
          </Route>

          {/* catch all route */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
