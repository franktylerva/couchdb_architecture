import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRounded from '@material-ui/icons/EditRounded';
import AddIcon from '@material-ui/icons/Add';
import AddDessertForm from './AddDessertForm';
import { useAllDocs } from 'use-pouchdb';
import { usePouch } from 'use-pouchdb';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  headerBar: {
      textAlign: 'right',
      marginTop: 10,
      marginBottom: 20
  }
});

export default function DenseTable(props) {
  const classes = useStyles();

  const db = usePouch();

  const defaultValues = { name: '', calories: 0, fat: 0, carbs: 0, protein: 0 };
  const [currentDoc,setCurrentDoc] = useState(defaultValues);

  const [open, setOpen] = useState(false);

  const { rows: desserts } = useAllDocs({
    include_docs: true, // Load all document bodies
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentDoc(defaultValues);
    setOpen(false);
  };

  const handleEdit = async (id) => {

    try {
      const doc = await db.get(id);
      setCurrentDoc(doc);
      setOpen(true);
    }
    catch(err) {
      console.err(err);
    }
  };

  const handleDelete = async (id,rev) => {
    await db.put({"_deleted": true, "_id": id, "_rev": rev});
  }

  return (

    <Grid>
        <Grid item xs={12} className={classes.headerBar}>
            <Fab size="small" color="primary" aria-label="add">
                <AddIcon onClick={handleClickOpen} />
                <AddDessertForm open={open} onClose={handleClose} onAdd={props.add} currentDoc={currentDoc}/>
            </Fab>
        </Grid>
        <Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell align="center">Actions&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {desserts.map((row) => (
                        <TableRow key={row.doc._id}>
                          <TableCell component="th" scope="row">
                              {row.doc.name}
                          </TableCell>
                          <TableCell align="right">{row.doc.calories}</TableCell>
                          <TableCell align="right">{row.doc.fat}</TableCell>
                          <TableCell align="right">{row.doc.carbs}</TableCell>
                          <TableCell align="right">{row.doc.protein}</TableCell>
                          <TableCell align="right" width={88}>
                            <IconButton onClick={() => handleDelete(row.doc._id,row.doc._rev)}>
                              <DeleteRoundedIcon fontSize="small" color="secondary"/>
                            </IconButton>
                            <IconButton onClick={() => handleEdit(row.doc._id)}>
                              <EditRounded fontSize="small" color="primary"/>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
    </Grid>
  );
}