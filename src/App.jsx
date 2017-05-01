import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import AppRouter from './AppRouter';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightBlue500, lightBlue700, purpleA200 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: lightBlue500,
        primary2Color: lightBlue700,
        accent1Color: purpleA200
    }
});

class App extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    render() {
        const { store } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={store}>
                    <div>
                        <AppRouter />
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;