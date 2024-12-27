import React from "react";

import {Col, Row,} from "antd";
import {ProCard} from "@ant-design/pro-components";
import OS from "../OS/index.jsx";
import GameLevels from "../GameLevels/index.jsx";
import GameArchive from "../GameArchive/index.jsx";
import ServerLog from "../ServerLog/index.jsx";
import OnlinePlayers from "../OnlinePlayers/index.jsx";

export default () => {

    return (
        <>
            <OS />
            <br/>
            <Row gutter={[16,16]}>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <ProCard>
                        <GameArchive/>
                    </ProCard>
                    <br/>
                    <ProCard>
                        <GameLevels/>
                    </ProCard>
                </Col>
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>

                    <ServerLog/>
                    <br/>
                    <ProCard>
                        <OnlinePlayers/>
                    </ProCard>
                </Col>

            </Row>
        </>
    )
}