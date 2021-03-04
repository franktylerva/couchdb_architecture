import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { usePouch } from 'use-pouchdb';

export default function FormDialog(props) {
  
  const [dessert, setDessert] = useState(props.currentDoc)
  const db = usePouch()

  useEffect(() => {
    if(props.currentDoc) {
      setDessert(props.currentDoc);
    }
  },[props.currentDoc])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDessert({ ...dessert, [name]: value })
  }

  const saveDessert = async () => {

    if(dessert._id) {
      await db.put(dessert);
    }
    else {
      await db.post(dessert);
    }
    props.onClose();
  }

  return (
    <div>
      <h1>{props.currentDocId}</h1>
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
            value={dessert.name}
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="calories" 
            name="calories" 
            label="calories"
            type="text"
            value={dessert.calories}
            fullWidth 
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="fat" 
            name="fat" 
            label="Fat"
            type="text"
            value={dessert.fat}
            fullWidth 
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="carbs" 
            name="carbs" 
            label="Carbs"
            type="text"
            value={dessert.carbs}
            fullWidth 
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="protein" 
            name="protein" 
            label="Protein"
            type="text"
            value={dessert.protein}
            fullWidth 
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveDessert} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}