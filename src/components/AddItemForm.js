import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/AddItemForm.css'

//Define AddItemForm component with onAdd as property
function AddItemForm({ onAdd }) {
  //State for storing the item name
  const [name, setName] = useState('');
  //State for storing the selected date
  const [date, setDate] = useState(null);

  //Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent default form submission behavior (page refresh)
    //if statement to check if both name and date are provided
    if (date && name) {
      //Call the onAdd function passed as a property with name and date
      onAdd(name, date);
      //Reset field to empty
      setName('');
      //Reset field to empty
      setDate(null);
    }
  };
  //Display the form
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Add a product</h2>
        <div className="form-group">
          <label htmlFor="productName" className="form-label">Product name</label>
          <input
            id="productName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. chicken breast"
            required
            className="form-input"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="useByDate" className="form-label">Use by date</label>
          <DatePicker
            id="useByDate"
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy" 
            placeholderText="Select a date"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add item</button>
      </form>
    </div>
  );
}

export default AddItemForm;
