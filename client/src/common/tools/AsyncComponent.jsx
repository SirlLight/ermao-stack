import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                resultComp: null
            };
        }

        static async getComponent() {
            const { default: component } = await importComponent();
            return component;
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                resultComp: component
            });
        }

        render() {
            const { resultComp } = this.state;

            return resultComp ? <Component {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}
