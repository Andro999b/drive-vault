import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import GroupsList from './GroupsList';

import { showCreateEditCredentialDialog } from '../actions/dialogs';

import { white, grey500 } from 'material-ui/styles/colors';

@connect(
    (state) => ({
        selectedGroup: state.selectedGroup
    }),
    (dispatch) => ({
        showCreateDialog: () => dispatch(showCreateEditCredentialDialog())
    })
)
class ListViewHeader extends Component {
    static propTypes = {
        showCreateDialog: PropTypes.func.isRequired,
        selectedGroup: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            groupsMenu: false,
            searchMode: false
        };
    }

    toggleGroupMenu = () => this.setState({ groupsMenu: !this.state.groupsMenu });
    enterSearchMode = () => this.setState({ searchMode: true})
    leaveSearchMode = () => this.setState({ searchMode: false})

    render() {
        const { showCreateDialog, selectedGroup } = this.props;
        const { groupsMenu, searchMode } = this.state;

        const rightElement = (
            <div style={{marginRight: -8}}>
                <IconButton  onTouchTap={showCreateDialog}>
                    <ContentAddIcon color={white}/>
                </IconButton>
                <IconButton onTouchTap={this.enterSearchMode}>
                    <ActionSearchIcon color={white}/>
                </IconButton>
            </div>
        );

        const appBar = (
            <AppBar
                title={selectedGroup == null ? 'All credentials' : selectedGroup.name}
                onLeftIconButtonTouchTap={this.toggleGroupMenu}
                iconElementRight={rightElement}
            />
        );

        const searchBar = (
            <Toolbar style={{height: 64}}>
                <ToolbarGroup firstChild style={{flexGrow: 1}}>
                    <div style={{padding: 12, marginTop: 4}}>
                        <ActionSearchIcon color={grey500}/>
                    </div>
                    <TextField 
                        hintText="Search"
                        name="searchbox" 
                        autoFocus 
                        fullWidth 
                        underlineShow={false}/>
                </ToolbarGroup>
                <ToolbarGroup lastChild>
                    <IconButton onTouchTap={this.leaveSearchMode}>
                        <BackIcon color={grey500}/>
                    </IconButton>
                </ToolbarGroup>
            </Toolbar>
        );

        return (
            <div>
                {searchMode ? searchBar : appBar}
                <Drawer
                    open={groupsMenu}
                    docked={false}
                    onRequestChange={(open) => this.setState({ groupsMenu: open })}
                >
                    <GroupsList/>
                </Drawer>
            </div>
        );
    }
}

export default ListViewHeader;