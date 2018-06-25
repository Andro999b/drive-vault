import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class CredentialSingleValue extends Component {
    static propTypes = {
        values: PropTypes.array,
        errors: PropTypes.array,
        onChange: PropTypes.func.isRequired
    };

    handleChange(e) {
        const { onChange } = this.props;
        onChange([{value: e.target.value}]);
    }

    render() {
        const { values, errors, } = this.props;

        const value = values && values[0] && values[0].value || '';
        const error = errors && errors[0] && errors[0].error;

        return (
            <TextField 
                multiLine
                floatingLabelText="Enter value"
                floatingLabelFixed
                autoComplete="new-password" 
                errorText={error}
                fullWidth 
                type="password"
                value={value} 
                onChange={this.handleChange.bind(this)} />
        );
    }
}

export default CredentialSingleValue;