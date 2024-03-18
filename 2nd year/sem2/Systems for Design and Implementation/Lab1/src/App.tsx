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
  const [lists, setLists] = useState<any>([])
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

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
