import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { usePouch } from 'use-pouchdb';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  paper: { 
    width: 500,
    padding: 20,
    height: 'calc(50% - 64px)',
    top: 64
  },
  footer: {
    textAlign: 'right',
    paddingTop: 10
  },
  typographyStyles: {
    flex: 1,
    fontSize: 10
  }
});

const DessertDrawer = (props) => {

  const classes = useStyles();
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
    <Drawer classes={{ paper: classes.paper }} anchor="right" open={props.open} onClose={props.onClose}>
      <Grid container direction="column">
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveDessert} color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  )
}

export default DessertDrawer;