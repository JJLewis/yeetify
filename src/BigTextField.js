import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

class OutlinedTextFields extends React.Component {
  state = {
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          fullWidth
          rows={2}
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputProps={{ classes: { input: classes.heightStyle } }}
        />
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);