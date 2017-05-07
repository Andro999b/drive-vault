import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import GroupsList from './GroupsList';

class ListViewHeader extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            groupsMenu: false
        };
    }

    toggleGroupMenu = () => this.setState({ groupsMenu: !this.state.groupsMenu });

    render() {
        const { groupsMenu } = this.state;

        return (
            <div>
                <AppBar
                    title="All groups"
                    onLeftIconButtonTouchTap={this.toggleGroupMenu}
                    iconElementRight={<FlatButton label="New" icon={<ContentAddIcon />} />}
                />
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