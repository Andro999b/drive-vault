import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { exportJsonVault } from 'actions/sagas';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import { ListItem } from 'material-ui/List';
import GroupsList from './GroupsList';
import ChangePasswordDialog from './dialogs/ChangePasswordDialog';
import ExportDailog from 'components/dialogs/ExportDialog';
import ImportDialog from 'components/dialogs/ImportDialog';

import ActionKeyIcon from 'material-ui/svg-icons/communication/vpn-key';
import ExportIcon from 'material-ui/svg-icons/content/unarchive';
import ImportIcon from 'material-ui/svg-icons/content/archive';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DialpadIcon from 'material-ui/svg-icons/communication/dialpad';

import { showChangePasswordDialog, showPinDialog, showExportDialog, showImportDialog } from 'actions/dialogs';
import { selectGroup, closeValut } from 'actions/sagas';
import PinDialog from 'components/dialogs/PinDialog';

import { isTablet } from 'service/utils';

@connect(
    () => ({}),
    (dispatch) => ({
        showSetPinDialog: () => dispatch(showPinDialog()),
        showChangePasswordDialog: () => dispatch(showChangePasswordDialog()),
        selectGroup: (group) => dispatch(selectGroup(group)),
        showExportDialog: () => dispatch(showExportDialog()),
        showImportDialog: () => dispatch(showImportDialog()),
        closeVault: () => dispatch(closeValut()),
        exportJsonVault: () => dispatch(exportJsonVault())
    })
)
class ListSideBar extends Component {
    static propTypes = {
        showSetPinDialog: PropTypes.func.isRequired,
        showChangePasswordDialog: PropTypes.func.isRequired,
        selectGroup: PropTypes.func.isRequired,
        open: PropTypes.bool,
        onRequestChange: PropTypes.func.isRequired,
        showExportDialog: PropTypes.func.isRequired,
        showImportDialog: PropTypes.func.isRequired,
        closeVault: PropTypes.func.isRequired,
        exportJsonVault: PropTypes.func.isRequired
    };

    onSelectGroup(group) {
        const { selectGroup, onRequestChange } = this.props;

        selectGroup(group);
        onRequestChange();
    }

    render() {
        const {
            showSetPinDialog,
            showChangePasswordDialog,
            showExportDialog,
            showImportDialog,
            open,
            onRequestChange,
            closeVault,
            exportJsonVault
        } = this.props;

        const showPincode = isTablet();

        return (
            <Drawer open={open} docked={false} onRequestChange={onRequestChange}>
                <ListItem onClick={() => closeVault()} leftIcon={<BackIcon />} primaryText="Close vault" />
                <Divider />
                <GroupsList selectGroup={(group) => this.onSelectGroup(group)} />
                <Divider />
                <ListItem onClick={() => showChangePasswordDialog()} leftIcon={<ActionKeyIcon />} primaryText="Change password" />
                <ChangePasswordDialog />
                <Divider />
                <ListItem onClick={() => showExportDialog()} leftIcon={<ExportIcon />} primaryText="Export" />
                <ExportDailog />
                <ListItem leftIcon={<ExportIcon />} onClick={() => exportJsonVault()} primaryText="Export JSON"/>
                <ListItem onClick={() => showImportDialog()} leftIcon={<ImportIcon />} primaryText="Import" />
                <ImportDialog />
                {showPincode && <div>
                    <Divider />
                    <ListItem onClick={() => showSetPinDialog()} leftIcon={<DialpadIcon />} primaryText="Set Pin" />
                    <PinDialog />
                </div>}
            </Drawer>
        );
    }
}

export default ListSideBar;