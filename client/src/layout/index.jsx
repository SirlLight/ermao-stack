import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"

const { Header, Sider, Content } = Layout

export default class Main extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Layout>
                <Content style={{ background: '#fff', padding: 20 }}>
                    { this.props.children ? this.props.children : null}
                </Content>
            </Layout>
        ) 
    }
}