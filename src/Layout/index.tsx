/* eslint-disable react-refresh/only-export-components */
import { Row } from "antd";
import { memo } from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
    const navigatorHasShare = !!navigator.share

    return (
        <div>
            <Row gutter={[16, 16]} align={'middle'} justify={'space-between'} >
                <Link to={'/'}>
                    <div><strong>Voltar</strong></div>
                </Link>
                <h1>PWA News DIO</h1>
                <div><strong>{navigatorHasShare ? 'Share' : 'Copy'}</strong></div>
            </Row>
            <Outlet />
        </div>
    );
}

export default memo(Layout)