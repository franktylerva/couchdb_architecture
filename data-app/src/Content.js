import React from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import AddDessertForm from './AddDessertForm';
import { useAllDocs } from 'use-pouchdb';


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

  const [open, setOpen] = React.useState(false);

  const { rows: desserts } = useAllDocs({
    include_docs: true, // Load all document bodies
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(desserts);
    setOpen(false);
  };

  return (

    <Grid>
        <Grid item xs={12} className={classes.headerBar}>
            <Fab size="small" color="primary" aria-label="add">
                <AddIcon onClick={handleClickOpen} />
                <AddDessertForm open={open} onClose={handleClose} onAdd={props.add}/>
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
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
    </Grid>
  );
}