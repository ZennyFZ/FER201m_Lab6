import Navigation from './components/Navigation';
import AddContact from "./components/AddContact";
import User from "./components/User";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


function App() {
  return (
    <div className='background'>
      <Navigation />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={5}>
              <AddContact />
          </Grid>
          <Grid item xs={11}>
              <User />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
