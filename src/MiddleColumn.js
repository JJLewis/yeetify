import React from 'react';
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
                    <Button fullWidth variant="contained" color="primary" onClick={this.props.yeetify}>Yeet &gt;</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="secondary" onClick={this.props.deyeetify}>&lt; Deyeet</Button>
                </Grid>
            </Grid>
        );
    }
}

export default MiddleColumn;
