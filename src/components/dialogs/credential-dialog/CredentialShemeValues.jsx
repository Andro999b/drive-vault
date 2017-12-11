import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class CredentialShemeValues extends Component {
    static propTypes = {
        values: PropTypes.array,
        errors: PropTypes.array,
        schema: PropTypes.array,
        onChange: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = this.convertPropsToState(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.convertPropsToState(nextProps));
    }

    convertPropsToState(props) {
        const { schema, values } = props;
        const getValue = (name) => values && values.find((item) => item.name == name) || {};

        const correctValues = schema.map(({ name }) => {
            const { value } = getValue(name);
            return { name, value: value || '' };
        });

        return {
            values: correctValues
        };
    }

    onValueChange(name, value) {
        const { onChange } = this.props;
        this.setState(
            (state) => {
                const { values } = state;
                const item = values.find((item) => item.name == name);
                item.value = value;
                return { values: values.concat([]) };
            },
            () => onChange(this.state.values)
        );
    }

    render() {
        const { errors } = this.props;
        const { values } = this.state;

        const getError = (name) => {
            if (errors) {
                const item = errors.find((item) => item.name == name);
                if (item) return item.error;
            }
        };

        return (
            <div>
                {values.map(({ name, value }) => (
                    <TextField
                        key={name}
                        fullWidth
                        multiLine
                        floatingLabelText={`Enter ${name}`}
                        floatingLabelFixed
                        errorText={getError(name)}
                        onChange={(e) => this.onValueChange(name, e.target.value)}
                        value={value} />
                ))}
            </div>
        );
    }
}

export default CredentialShemeValues;