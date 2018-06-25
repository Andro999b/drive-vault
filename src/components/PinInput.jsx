import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import BackSpaceIcon from 'material-ui/svg-icons/content/backspace';

class PinInput extends Component {
    static PIN_LENGTH = 4;
    static propTypes = {
        error: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        stylle: PropTypes.object,
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
        }, () => {
            this.props.onChange(this.state.value.join(''));
        });
    }

    onBackspace() {
        this.setState((prevState) => {
            let { value } = prevState;

            if (value.length > 0) {
                value.pop();
            }

            return { value, error: null };
        }, () => {
            this.props.onChange(this.state.value.join(''));
        });
    }

    render() {
        const { value, error } = this.state;

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
                    <div/>
                    <RaisedButton primary label="0" onClick={() => this.onInput(0)} />
                    <div/>
                </div>
            </div>
        );
    }
}

export default PinInput;