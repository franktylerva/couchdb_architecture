import React, {useState} from 'react';
import { Grid } from '@material-ui/core';
import Header from "./Header"
import DenseTable from "./Content"

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function App() {

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const [data, setData] = useState(rows);

  const addDessert = (dessert) => {
    setData([...data, dessert]);
  }


  return (
    <Grid container direction="column">
      <Grid item>
        <Header/>
      </Grid>
      <Grid item container>
        <Grid item sm={2}/>
        <Grid item xs={12} sm={8}>
          <DenseTable data={data} add={addDessert}/>
        </Grid>
        <Grid item sm={2}/>
      </Grid>
    </Grid>
  );
}

export default App;
