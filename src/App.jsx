import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import AppRouter from './AppRouter';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightBlue500, lightBlue700 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: lightBlue500,
        primary2Color: lightBlue700,
        accent1Color: lightBlue500
    }
});

class App extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    render() {
        const { store } = this.props;
        const { error } = store.getState().init;
    
        return (
            <div>
                {error != null && <div className="fail-to-start">{error}</div>}
                {!error &&
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Provider store={store}>
                            <div>
                                <AppRouter />
                            </div>
                        </Provider>
                    </MuiThemeProvider>
                }
            </div>
        );
    }
}

export default App;