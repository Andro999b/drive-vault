import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import { ListItem } from 'material-ui/List';
import GroupsList from './GroupsList';
import ChangePasswordDialog from './dialogs/ChangePasswordDialog';
import ExportDailog from './dialogs/ExportDialog';
//import ImportDialog from './dialogs/ImportDialog';

import ActionKeyIcon from 'material-ui/svg-icons/communication/vpn-key';
import ExportIcon from 'material-ui/svg-icons/content/unarchive';
import ImportIcon from 'material-ui/svg-icons/content/archive';

import { showChangePasswordDialog, showExportDialog, showImportDialog } from '../actions/dialogs';
import { selectGroup } from '../actions/sagas';

@connect(
    () => ({}),
    (dispatch) => ({
        showChangePasswordDialog: () => dispatch(showChangePasswordDialog()),
        selectGroup: (group) => dispatch(selectGroup(group)),
        showExportDialog: () => dispatch(showExportDialog()),
        showImportDialog: () => dispatch(showImportDialog())
    })
)
class ListSideBar extends Component {
    static propTypes = {
        showChangePasswordDialog: PropTypes.func.isRequired,
        selectGroup: PropTypes.func.isRequired,
        open: PropTypes.bool,
        onRequestChange: PropTypes.func.isRequired,
        showExportDialog: PropTypes.func.isRequired,
        showImportDialog: PropTypes.func.isRequired,
    };

    onSelectGroup(group) {
        const {selectGroup, onRequestChange}  = this.props;

        selectGroup(group);
        onRequestChange();
    }

    render() {
        const { 
            showChangePasswordDialog, 
            showExportDialog, 
            showImportDialog, 
            open, 
            onRequestChange 
        } = this.props;

        return (
            <Drawer open={open} docked={false} onRequestChange={onRequestChange}>
                <GroupsList selectGroup={(group) => this.onSelectGroup(group)} />
                <Divider />
                <ListItem onTouchTap={() => showChangePasswordDialog()} leftIcon={<ActionKeyIcon />} primaryText="Change password" />
                <ChangePasswordDialog />
                <Divider />
                <ListItem onTouchTap={() => showExportDialog()} leftIcon={<ExportIcon />} primaryText="Export" />
                <ExportDailog/>
                <ListItem onTouchTap={() => showImportDialog()} leftIcon={<ImportIcon />} primaryText="Import" />
                {/* <ImportDialog/> */}
            </Drawer>
        );
    }
}

export default ListSideBar;