import InfiniteScroll from 'react-infinite-scroll-component';
import ListItem from './ListItem';

const ListsDisplay = ({ lists, onCheckboxChange, onExport, onDelete, onEdit, fetchData }: {
    lists: any[];
    onCheckboxChange: (id: string) => void;
    onExport: (list: any) => void;
    onDelete: (list: any) => void;
    onEdit: (list: any) => void;
    fetchData: () => void;
}) => {
  return (
    <div className="lists">
      <InfiniteScroll
        dataLength={lists.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <ul>
          {lists?.length 
            ? (
              lists.map((list) => (
                <ListItem 
                    key = {list.id}
                    list = {list}
                    onCheckboxChange = {onCheckboxChange}
                    onExport = {onExport}
                    onDelete = {onDelete}
                    onEdit = {onEdit}
                />
              ))
            ) : <p>No lists to display</p>
          }
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default ListsDisplay;