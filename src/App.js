
import './App.css';
import React, {useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo'
import { db } from './firebase';
import firebase from "firebase";


function App() {
  const [todos, setTodos] = useState(['study programming','read book'])
  const [input, setInput] = useState([])

  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) =>{
       event.preventDefault();
       
       db.collection('todos').add({
         todo: input,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
       })
       setInput('');
  }

  return (
    <div className="App">
        <h4>Todo App</h4>
        <form>  
          <FormControl>
            <InputLabel htmlFor="my-input">Wright your todo</InputLabel>
            <Input  value ={input} onChange = {event => setInput(event.target.value)} />
            <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="primary">
            Add todo
            </Button>
         </FormControl>
       </form>
        <ul>
             { todos.map(todo => (
                <Todo todo={todo}/>
              ))}
        </ul>
      
    </div>
  );
}

export default App;
