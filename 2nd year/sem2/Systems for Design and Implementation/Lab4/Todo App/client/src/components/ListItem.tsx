import { Link } from 'react-router-dom';
import RequireRole from './RequireRole';

const ListItem = ({ list, onCheckboxChange, onExport, onDelete, onEdit }: { 
    list: any, 
    onCheckboxChange: any, 
    onExport: any, 
    onDelete: any, 
    onEdit: any,
}) => {
    return (
        <li key={list.id} className="list-item-container">
            <input 
                type="checkbox" 
                onChange={() => onCheckboxChange(list.id)}
            />
            <Link to={'/lists/' + list.id}>
                {list.name}
            </Link>
            <p>Tasks: {list.taskCount || 0}</p>
            <RequireRole role={2022}>
                <button className="cool-btn" type="button" onClick={() => onExport(list.id)}>Export</button>
                <button className="cool-btn" type="button" onClick={() => onDelete(list.id)}>Delete</button>
                <button className="cool-btn" type="button" disabled={list.existed === false} onClick={() => onEdit(list.id)}>Edit</button>
            </RequireRole>
        </li>
    )
}

export default ListItem;