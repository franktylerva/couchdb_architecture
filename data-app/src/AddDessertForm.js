import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { usePouch } from 'use-pouchdb';

export default function FormDialog(props) {
  const initialFormState = { name: '', calories: 0, fat: 0, carbs: 0, protein: 0 }
  const [dessert, setDessert] = useState(initialFormState)
  const db = usePouch()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDessert({ ...dessert, [name]: value })
  }

  const addDessert = async () => {
    await db.post(dessert);
    props.onClose();
  }

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title" maxWidth="xs">
        <DialogTitle id="form-dialog-title">Add Dessert</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Add your favorite Dessert
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name" 
            label="Dessert Name"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="calories" 
            name="calories" 
            label="calories"
            type="text"
            fullWidth 
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="fat" 
            name="fat" 
            label="Fat"
            type="text"
            fullWidth 
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="carbs" 
            name="carbs" 
            label="Carbs"
            type="text"
            fullWidth 
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="protein" 
            name="protein" 
            label="Protein"
            type="text"
            fullWidth 
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addDessert} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}