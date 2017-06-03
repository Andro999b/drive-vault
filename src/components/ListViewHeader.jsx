import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ContentCreateIcon from 'material-ui/svg-icons/content/create';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';
import ActionKeyIcon from 'material-ui/svg-icons/communication/vpn-key';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import GroupsList from './GroupsList';
import ChangePasswordDialog from './ChangePasswordDialog';

import { showSaveCredentialDialog, showChangePasswordDialog } from '../actions/dialogs';
import selectGroup from '../actions/selectGroup';
import setNameFilter from '../actions/setNameFilter';

import { white, grey500 } from 'material-ui/styles/colors';

@connect(
    (state) => ({
        selectedGroup: state.selectedGroup
    }),
    (dispatch) => ({
        showCahngePasswordDialog: () => dispatch(showChangePasswordDialog()),
        showCreateDialog: () => dispatch(showSaveCredentialDialog()),
        selectGroup: (group) => dispatch(selectGroup(group)),
        setNameFilter: (name) => dispatch(setNameFilter(name))
    })
)
class ListViewHeader extends Component {
    static propTypes = {
        showCahngePasswordDialog: PropTypes.func.isRequired,
        showCreateDialog: PropTypes.func.isRequired,
        selectedGroup: PropTypes.object,
        selectGroup: PropTypes.func.isRequired,
        setNameFilter: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            groupsMenu: false,
            searchMode: false,
            nameFilter: ''
        };
    }

    toggleGroupMenu = () => this.setState({ groupsMenu: !this.state.groupsMenu });
    enterSearchMode = () => this.setState({ searchMode: true })
    leaveSearchMode = () => this.setState({ searchMode: false, nameFilter: '' })

    onNameFilterChange(e) {
        const nameFilter = e.target.value;
        this.setState({ nameFilter });
        this.props.setNameFilter(nameFilter);
    }

    onSelectGroup(group) {
        this.props.selectGroup(group);
        this.setState({ groupsMenu: false });
    }

    render() {
        //TODO: decomposition here
        const { showCreateDialog, showCahngePasswordDialog, selectedGroup } = this.props;
        const { groupsMenu, searchMode, nameFilter } = this.state;

        const rightAppBarElement = (
            <div style={{ marginRight: -8 }}>
                <IconButton onTouchTap={showCreateDialog}>
                    <ContentCreateIcon color={white} />
                </IconButton>
                <IconButton onTouchTap={this.enterSearchMode}>
                    <ActionSearchIcon color={white} />
                </IconButton>
            </div>
        );

        const appBar = (
            <AppBar
                title={selectedGroup == null ? 'All credentials' : selectedGroup.name}
                onLeftIconButtonTouchTap={this.toggleGroupMenu}
                iconElementRight={rightAppBarElement}
            />
        );

        const searchBar = (
            <Toolbar style={{ height: 64 }}>
                <ToolbarGroup firstChild style={{ flexGrow: 1 }}>
                    <div style={{ padding: 12, marginTop: 4 }}>
                        <ActionSearchIcon color={grey500} />
                    </div>
                    <TextField
                        hintText="Search"
                        name="searchbox"
                        value={nameFilter}
                        onChange={(e) => this.onNameFilterChange(e)}
                        autoFocus
                        fullWidth
                        underlineShow={false} />
                </ToolbarGroup>
                <ToolbarGroup lastChild>
                    <IconButton onTouchTap={this.leaveSearchMode}>
                        <BackIcon color={grey500} />
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
                    <GroupsList 
                        selectGroup={(group) => this.onSelectGroup(group)} 
                        />
                    <Divider/>
                    <ListItem
                        onTouchTap={showCahngePasswordDialog}
                        leftIcon={<ActionKeyIcon/>}
                        primaryText="Change password"
                        />
                    <ChangePasswordDialog/>
                </Drawer>
            </div>
        );
    }
}

export default ListViewHeader;