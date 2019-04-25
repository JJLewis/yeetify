import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import BigTextField from './BigTextField';
import MiddleColumn from './MiddleColumn';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class CenteredGrid extends React.Component {

    constructor() {
        super();
        this.state = {
            fieldHeight:  0,
        }
    }

    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
        this.setState({fieldHeight: window.innerHeight - 168});
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        const { classes } = this.props;
        const heightStyler = theme => ({
            heightStyle:{
                height:this.state.fieldHeight,
            },
        });
        const HeightedBigTextField = withStyles(heightStyler)(BigTextField); // TODO: Hacky but it works
        return (
            <div className={classes.root} style={{padding: 20}}>
            <Grid container justify="center" alignItems="center" spacing={24}>
                <Grid item xs={5}>
                <HeightedBigTextField label={"Code Here"}/>
                </Grid>
                <Grid item xs={2}>
                    <MiddleColumn />
                </Grid>
                <Grid item xs={5}>
                    <HeightedBigTextField label={"Yeeted Result"}/>
                </Grid>
            </Grid>
            </div>
        );
    }
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
