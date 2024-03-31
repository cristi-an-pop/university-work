import { useState, useEffect } from 'react';
import './App.css';
import ListsPage from './components/ListsPage';
import TasksPage from './components/TasksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [lists, setLists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/lists')
      .then(response => response.json())
      .then(data => {
        setLists(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ListsPage lists={lists} setLists={setLists}/>}
        />
        <Route
          path="/lists/:id"
          element={<TasksPage lists={lists} setLists={setLists} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
