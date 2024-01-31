import React from 'react';
import Item from './Item';
import PropTypes from 'prop-types';
import '../styles/ItemList.css'

// This component represents a list of items and the search bar
function ItemList({ items, onRemoveItem, searchQuery, setSearchQuery }) {
  return (
    <div>
      <h2 className="section-title">What's in your fridge</h2>
      <div className="item-list">
        {items.map(item => (
          <Item
            key={item.id}
            name={item.name}
            date={item.date}
            onRemove={() => onRemoveItem(item.id)}
          />
        ))}
      </div>
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
    </div>
  );
}
//Define propTypes to specify which props are required for item component
ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default ItemList;
