import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(
    (state) => ({
        keystore: state.keystore
    })
)
class ListView extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        keystore: PropTypes.array
    }

    componentWillMount() {
        const { keystore } = this.props;
        const { router } = this.context;

        if(!keystore) {
            router.push('/');
        }
    }

    render() {
        return (
            <div>
                list
            </div>
        );
    }
}

export default ListView;