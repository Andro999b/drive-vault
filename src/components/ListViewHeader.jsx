import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContentCreateIcon from 'material-ui/svg-icons/content/add';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import ListSideBar from './ListSideBar';

import { showSaveCredentialDialog } from 'actions/dialogs';
import { setNameFilter } from 'actions/sagas';

import { white, grey500 } from 'material-ui/styles/colors';

@connect(
    (state) => ({
        selectedGroup: state.main.selectedGroup
    }),
    (dispatch) => ({
        showCreateDialog: () => dispatch(showSaveCredentialDialog()),
        setNameFilter: (name) => dispatch(setNameFilter(name))
    })
)
class ListViewHeader extends Component {
    static propTypes = {
        showCreateDialog: PropTypes.func.isRequired,
        selectedGroup: PropTypes.object,
        setNameFilter: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            sideBar: false,
            searchMode: false,
            nameFilter: ''
        };
    }

    toggleSideBar() {
        this.setState((state) => ({ sideBar: !state.sideBar }));
    }

    enterSearchMode() {
        this.setState({ searchMode: true });
    }

    leaveSearchMode() {
        this.setState({ searchMode: false, nameFilter: '' });
        this.props.setNameFilter('');
    }

    onNameFilterChange(e) {
        const nameFilter = e.target.value;
        this.setState({ nameFilter });
        this.props.setNameFilter(nameFilter);
    }

    onNameFilterClear() {
        this.setState({ nameFilter: '' });
        this.props.setNameFilter('');
    }

    onKeyDown(e) {
        if (e.keyCode == 27) {
            this.leaveSearchMode();
        }
    }

    render() {
        const { showCreateDialog, selectedGroup } = this.props;
        const { sideBar, searchMode, nameFilter } = this.state;

        const rightAppBarElement = (
            <div style={{ marginRight: -8 }}>
                <IconButton onTouchTap={() => showCreateDialog()}>
                    <ContentCreateIcon color={white} />
                </IconButton>
                <IconButton onTouchTap={this.enterSearchMode.bind(this)}>
                    <ActionSearchIcon color={white} />
                </IconButton>
            </div>
        );

        const appBar = (
            <AppBar
                title={selectedGroup == null ? 'All credentials' : selectedGroup.name}
                onLeftIconButtonTouchTap={this.toggleSideBar.bind(this)}
                iconElementRight={rightAppBarElement}
            />
        );

        const searchBar = (
            <Toolbar style={{ height: 64 }}>
                <ToolbarGroup firstChild style={{ flexGrow: 1 }}>
                    <IconButton onTouchTap={this.leaveSearchMode.bind(this)}>
                        <BackIcon color={grey500} />
                    </IconButton>
                    <TextField
                        hintText="Search"
                        name="searchbox"
                        value={nameFilter}
                        onKeyDown={(e) => this.onKeyDown(e)}
                        onChange={(e) => this.onNameFilterChange(e)}
                        autoFocus
                        fullWidth
                        underlineShow={false} />
                </ToolbarGroup>
                <ToolbarGroup lastChild>
                    <IconButton onTouchTap={this.onNameFilterClear.bind(this)}>
                        <ClearIcon color={grey500} />
                    </IconButton>
                </ToolbarGroup>
            </Toolbar>
        );

        return (
            <div>
                {searchMode ? searchBar : appBar}
                <ListSideBar open={sideBar} onRequestChange={this.toggleSideBar.bind(this)} />
            </div>
        );
    }
}

export default ListViewHeader;