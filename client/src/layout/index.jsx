import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Main = (props) => (
    <Layout>
        <Content style={{ background: "#fff", padding: 20 }}>
            { props.children ? props.children : null}
        </Content>
    </Layout>
);

export default Main;