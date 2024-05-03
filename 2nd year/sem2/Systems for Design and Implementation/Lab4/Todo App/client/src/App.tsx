import './App.css';
import ListsPage from './components/ListsPage';
import TasksPage from './components/TasksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ListsPage />}
        />
        <Route
          path="/lists/:id"
          element={<TasksPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
