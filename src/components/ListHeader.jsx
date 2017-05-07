import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import ActionDeleteIcon from 'material-ui/svg-icons/action/delete';
import { ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class ListHeader extends Component {
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
                    <div>
                        <ListItem
                            primaryText="All groups"
                            rightIconButton={
                                <IconButton>
                                    <ActionDeleteIcon/>
                                </IconButton>
                            }
                        />
                    </div>
                    <FlatButton
                        label="New group"
                        fullWidth
                        style={{
                            position: 'absolute',
                            bottom: 0
                        }} />
                </Drawer>
            </div>
        );
    }
}

export default ListHeader;