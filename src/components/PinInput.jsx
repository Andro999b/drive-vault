import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import BackSpaceIcon from 'material-ui/svg-icons/content/backspace';

class PinInput extends Component {
    static PIN_LENGTH = 4;
    static propTypes = {
        error: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: [],
            error: props.error
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ error: nextProps.error });
    }

    onInput(num) {
        this.setState((prevState) => {
            let { value } = prevState;

            if (value.length < PinInput.PIN_LENGTH) {
                value.push(num);
            }

            return { value, error: null };
        });
    }

    onBackspace() {
        this.setState((prevState) => {
            let { value } = prevState;

            if (value.length > 0) {
                value.pop();
            }

            return { value, error: null };
        });
    }

    onSubmit() {
        const { onSubmit } = this.props;
        const { value } = this.state;

        onSubmit(value.join(''));
    }

    render() {
        const { value, error } = this.state;
        const { onBack } = this.props;

        return (
            <div className="pin-input">
                <div className={'pin-input__nums' + (error ? ' pin-input__nums_error' : '')}>
                    {/* eslint-disable no-unused-vars */
                        Array.from(new Array(PinInput.PIN_LENGTH), (_, i) =>
                            /* eslint-enable no-unused-vars */
                            <span key={i} className="pin-input__num">{value.length > i ? '*' : '_'}</span>
                        )}
                    {value.length > 0 && <span className="pin-input__backspace">
                        <IconButton onClick={() => this.onBackspace()}>
                            <BackSpaceIcon />
                        </IconButton>
                    </span>}
                </div>
                <div className="pin-input__error">{error}</div>
                <div className="pin-input__dial-panel">
                    {
                        /* eslint-disable no-unused-vars */
                        Array.from(new Array(9), (_, i) =>
                            /* eslint-enable no-unused-vars */
                            <RaisedButton key={i} primary label={i + 1} onClick={() => this.onInput(i + 1)} />
                        )}
                    <FlatButton icon={<BackIcon />} onClick={() => onBack()} />
                    <RaisedButton primary label="0" onClick={() => this.onInput(0)} />
                    <FlatButton icon={<DoneIcon />} onClick={() => this.onSubmit()} disabled={value.length < PinInput.PIN_LENGTH} />
                </div>
            </div>
        );
    }
}

export default PinInput;