import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class MiddleColumn extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <Grid container alignItems="center" spacing={24}>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary">Yeet &gt;</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="secondary">&lt; Deyeet</Button>
                </Grid>
            </Grid>
        );
    }
}

MiddleColumn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MiddleColumn;
