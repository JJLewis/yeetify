import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import BigTextField from './BigTextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function CenteredGrid(props) {
  const { classes } = props;
  const heightStyler = theme => ({
    heightStyle:{
        height:window.innerHeight-168,
    },
  });
  const HeightedBigTextField = withStyles(heightStyler)(BigTextField);
  return (
    <div className={classes.root} style={{padding: 20}}>
      <Grid container spacing={24}>
        <Grid item xs={5}>
          <HeightedBigTextField />
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs=2</Paper>
        </Grid>
        <Grid item xs={5}>
            <HeightedBigTextField />
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
