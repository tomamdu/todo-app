import React, {useState} from 'react'
import { Button, Modal, List, ListItem, ListItemText, ListItemAvatar, Avatar,  } from '@material-ui/core';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
//import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('')
    const handleOpen =() =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    const update_todo =() => {
        db.collection('todos').doc(props.todo.id).set({
           todo: input
        },{merge:true});

        setOpen(false);
    }

    return (
        <div className="todo_list">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div  className={classes.paper}>
                    <h1>Edit</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={event =>setInput(event.target.value)} />
                    <Button  onClick={e => setOpen(false)}>close</Button>
                    <Button variant="contained" color="primary" onClick={update_todo}>Save</Button>
                </div>

            </Modal>
            <List>
                <ListItem >
                    <ListItemAvatar>
                        <Avatar>
                            {/*<ImageIcon/>*/}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText  primary={props.todo.todo} secondary="dead line" />
                    <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
                        Edit
                    </Button>
                    <Button onClick = {(event => db.collection('todos').doc(props.todo.id).delete())}>Delete</Button>
                </ListItem >
                    
                
            </List>
           
        </div>
    )
}

export default Todo
