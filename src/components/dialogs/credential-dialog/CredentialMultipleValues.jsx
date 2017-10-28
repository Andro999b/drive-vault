import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { isMobile } from 'service/utils';

class CredentialMultipleValues extends Component {
    static propTypes = {
        values: PropTypes.array,
        errors: PropTypes.array,
        onChange: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

        const values = props.values || [{ name: '', value: '' }];

        this.state = { values };
    }

    addRow() {
        const { onChange } = this.props;
        this.setState(
            (state) => ({ values: state.values.concat({ name: '', value: '' }) }),
            () => onChange(this.state.values)
        );
    }

    removeRow(index) {
        const { onChange } = this.props;
        this.setState(
            ({ values }) => {
                values.splice(index, 1);
                return { values: values.concat([]) };
            },
            () => onChange(this.state.values)
        );
    }

    onNameChange(index, name) {
        const { onChange } = this.props;
        this.setState(
            ({ values }) => {
                values[index].name = name;
                return { values: values.concat([]) };
            },
            () => onChange(this.state.values)
        );
    }

    onValueChange(index, value) {
        const { onChange } = this.props;
        this.setState(
            ({ values }) => {
                values[index].value = value;
                return { values: values.concat([]) };
            },
            () => onChange(this.state.values)
        );
    }

    render() {
        const { values } = this.state;
        const { errors } = this.props;

        const lastValuesIndex = values.length - 1;

        const getError = (index) => errors && errors.find((item) => item.index == index) || {};
        const isLast = (index) => index == lastValuesIndex;

        return (
            <div>
                {values.map(({ name, value }, index) =>
                    this.renderRow(index, name, value, getError(index), isLast(index))
                )}
                <div className="text-right">
                    <RaisedButton label="Add Value" onTouchTap={this.addRow.bind(this)} />
                </div>
            </div>
        );
    }

    renderRow(index, name, value, error, isLast) {
        const mobile = isMobile();
        return (
            <div key={index}>{/*there is now predictable key for this case*/}
                <TextField
                    fullWidth={mobile}
                    floatingLabelText="Enter name"
                    value={name}
                    errorText={error.nameError}
                    onChange={(e) => this.onNameChange(index, e.target.value)}
                    className="row-first-cell" />
                <TextField
                    fullWidth={mobile}
                    floatingLabelText="Enter value"
                    errorText={error.error}
                    onChange={(e) => this.onValueChange(index, e.target.value)}
                    value={value} />
                {!isLast &&
                    <div className="text-right">
                        <RaisedButton label="Remove Value" onTouchTap={() => this.removeRow(index)} />
                    </div>}
            </div>
        );
    }
}

export default CredentialMultipleValues;