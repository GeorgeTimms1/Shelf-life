import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Item.css';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

//CSS classes for different expiration statuses/Colours
const EXPIRATION_CLASSES = {
  normal: 'normal',
  expired: 'expired',
  soon: 'soon',
};

//Function to determine the expiration status based on the expiry date
function getExpirationStatus(expiryDate) {
  const currentDate = new Date();
  //if expiryDate is less than currentDate its expired
  if (expiryDate < currentDate) { 
    return 'expired';
    //if expiryDate is less than 7 days from the currentDate expires soon(7 days might be too long)
  } else if (expiryDate < new Date(currentDate.setDate(currentDate.getDate() + 7))) {
    return 'soon';
  }
  //otherwise set status to normal 
  return 'normal';
}

//The Item component receives props to display product info and a remove button
function Item({ name, date, onRemove }) {
  //Parse the date string into a JavaScript Date object
  const expiryDate = parseISO(date); 
  //Calculate the time difference between now and the expiry date
  const daysToExpiry = formatDistanceToNow(expiryDate, { addSuffix: true });
  const formattedDate = format(expiryDate, 'dd/MM/yyyy'); 
  //Determine the CSS class for the item based on its expiration status
  const expiryClass = getExpirationStatus(expiryDate);

  return (
    //display the item container with a CSS class based on the expiration status
    <div className={`item-container ${EXPIRATION_CLASSES[expiryClass]}`}>
      <div className='item-details'>
        <span className='item-name'>{name}</span>
        <span className='date'>{formattedDate} (Expires {daysToExpiry})</span>
      </div>
      <button onClick={onRemove} className='remove-button'>
        Remove
      </button>
    </div>
  );
}

//Define propTypes to specify which props are required for item component
Item.propTypes = {
  //Name should be a string and is required
  name: PropTypes.string.isRequired, 
  //Date should be a string and is required
  date: PropTypes.string.isRequired, 
  //onRemove should be a function and is required
  onRemove: PropTypes.func.isRequired,
};

export default Item;
