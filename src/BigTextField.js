import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class OutlinedTextFields extends React.Component {
  state = {
    multiline: 'Controlled',
  };

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
        <TextField
          id="outlined-multiline-static"
          label={this.props.label}
          multiline
          fullWidth
          rows={2}
          defaultValue=""
          className={this.props.classes.textField}
          margin="normal"
          variant="outlined"
          ref={input => this.input = input}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          InputProps={{ classes: { input: this.props.classes.textField } }}
        />
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default OutlinedTextFields;