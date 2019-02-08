import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

class SearchFloor extends Component {
  state = {
    value: ''
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  onKeyPress = event => {
    const { history } = this.props;
    const { value } = this.state;
    if (event.key === 'Enter') {
      history.push(`/floor/${value}`);
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <TextField
          label="Søk"
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          value={value}
          onChange={this.handleChange}
          onKeyPress={this.onKeyPress}
        />
      </div>
    );
  }
}

export default withRouter(SearchFloor);
