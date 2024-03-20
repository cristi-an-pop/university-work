import './App.css'
import { useState } from 'react'
import ListsPage from './components/ListsPage'
import TasksPage from './components/TasksPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('lists');
    if (savedLists) {
      return JSON.parse(savedLists);
    } else {
      return [];
    }
  });
  const [selectedListId, setSelectedListId] = useState<string | null>(() => {
    const savedSelectedListId = localStorage.getItem('selectedListId');
    if (savedSelectedListId) {
      return savedSelectedListId;
    } else {
      return null;
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListsPage lists={lists} setLists={setLists} setSelectedListId={setSelectedListId} />} />
        <Route path="/lists/:id" element={<TasksPage lists={lists} selectedListId={selectedListId} setLists={setLists} />} />
      </Routes>
    </Router>
  )
}

export default App
