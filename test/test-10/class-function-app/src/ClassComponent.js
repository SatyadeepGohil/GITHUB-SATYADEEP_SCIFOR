import React, { Component } from "react";

class ClassComponent extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Hello from the Class Component',
        };
    }

    changeMessage = () => {
        this.setState({
            message: 'Message has been updated!',
        });
    };

    render() {
        return (
            <div>
                <h2>Class Component</h2>
                <p>{this.state.message}</p>
                <button onClick={this.changeMessage}>changeMessage</button>
            </div>
        )
    }
}

export default ClassComponent;