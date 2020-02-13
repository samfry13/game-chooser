import React, {Component} from "react";

export default class Modal extends Component {
    render() {
        const {children, open} = this.props;
        return (
            <div className={open ? "modal active" : "modal"}>
                <div className="content">
                    {children}
                </div>
            </div>
        );
    }
}