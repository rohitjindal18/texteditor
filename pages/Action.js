import React from 'react';

export default class Action extends React.Component {
    onActionClick = () => {
        const {
            action,
            onActionClick
        } = this.props;
        onActionClick(action);
    }
    render() {
        const {
            action
        } = this.props;

        return (
            <div onClick={this.onActionClick}>
                {action.substring(0, 1).toUpperCase()}
                <style jsx>{`
                    div {
                        width: 20px;
                        height: 20px;
                        border: 1px solid lightgray;
                        text-align: center;
                    }
                `}</style>
            </div>
        );
    }
}