import React from "react";
import { Layout } from "antd";
import LayoutHeader from "./home-nav";
import "./index.less";

const { Header, Content, Footer } = Layout;

const Main = (props) => (
    <Layout className="main-layout">
        <Header className="layout-header">
            <LayoutHeader history={props.history} />
        </Header>
        <Content className="layout-content">
            { props.children ? props.children : null}
        </Content>
        <Footer className="layout-footer">
            ©2018 这里是一只火辣辣的二毛
        </Footer>
    </Layout>
);

export default Main;