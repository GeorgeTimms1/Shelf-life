/** 
Shelf Life App Component
 
This is the main component of my react app. It uses Firebase Firestore
to do operations on a database of items. This component manages the state
of items, handles user interactions for adding and removing items, and has search functionality.

Author: George Timms
*/

import React, { useState, useEffect } from 'react';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import { formatISO } from 'date-fns';
import { db } from './firebase';
import {collection,addDoc,deleteDoc,doc,onSnapshot,query,orderBy}
from "firebase/firestore";

function App() {
  //Items State for storing items from Firestore 
  //Initial Value Empty array
  const [items, setItems] = useState([]);
  //State for managing the search query input
  //Initial Value Empty String
  const [searchQuery, setSearchQuery] = useState('');

  //Effect hook to fetch and subscribe to items from Firestore
  useEffect(() => {
    //query to fetch items ordered by date
    const q = query(collection(db, "items"), orderBy("date"));
    //Set up a real time listener on the query
    //When Firestore data changes, this triggers and provides the current data
    const unsubscribe = onSnapshot(q, (snapshot) => {
      //changes Firestore documents to a usable format for the app
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      //Update the state with the received items
      setItems(itemsData);
    }); 
    //cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  //Handle adding an item
  const handleAddItem = async (name, date) => {
    //Firebase function to add a document
    await addDoc(collection(db, "items"), {
      name, date: formatISO(date) // Format date to standard (International date standard)
    });
  };

  //Handle removing items
  const handleRemoveItem = async (id) => {
    //Firebase function to delete a document
    await deleteDoc(doc(db, "items", id));
  };

  //Filter items based on the search 
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
    //checks whether searchQuery is contained within the item.name (all converted to lowercase)
  );

  //displaying the application UI
  return (
    //Main container for the app's interface
    <div className="app-container">
      <div className="left-panel">
        <AddItemForm onAdd={handleAddItem} //passed handle the addition of items
        /> 
      </div>
      <div className="right-panel">
        <ItemList 
          //The list of items to display, filtered based on the search query
          items={filteredItems} 
          //Function to handle the removal of an item
          onRemoveItem={handleRemoveItem}
          //The current search query
          searchQuery={searchQuery} 
          //Function to update the search query
          setSearchQuery={setSearchQuery} 
        />
      </div>
    </div>
  );
}
//Export the App component
export default App; 
