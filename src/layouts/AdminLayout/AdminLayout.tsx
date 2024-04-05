import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, Button, Modal } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

import LogoHeader from "../../assets/images/logo-header.png";
import CalendatTick from "../../assets/icons/calendar-tick.png";
import Data2 from "../../assets/icons/data-2.png";
import GlobalEdit from "../../assets/icons/global-edit.png";
import NoteRemove from "../../assets/icons/note-remove.png";
import ReceiptItem from "../../assets/icons/receipt-item.png";
import BrifecaseTick from "../../assets/icons/brifecase-tick.png";
import UserEdit from "../../assets/icons/user-edit.png";
import "./adminLayout.css";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(
        "Attendance Management",
        "1",

        <div className="menu-icon">
            <img src={CalendatTick} />
        </div>
    ),
    getItem(
        "Leave Management",
        "2",
        <div className="menu-icon">
            <img src={NoteRemove} />
        </div>
    ),
    getItem(
        "Payroll Management",
        "3",
        <div className="menu-icon">
            <img src={ReceiptItem} />
        </div>
    ),
    getItem(
        "Employee Management",
        "4",
        <Link to={"/employee"}>
            <div className="menu-icon">
                <img src={Data2} />
            </div>
        </Link>
    ),
    getItem(
        "User Management",
        "5",
        <div className="menu-icon">
            <img src={UserEdit} />
        </div>
    ),
    getItem(
        "Master Management",
        "6",
        <div className="menu-icon">
            <img src={BrifecaseTick} />
        </div>
    ),
    getItem(
        "Global Settings",
        "7",
        <div className="menu-icon">
            <img src={GlobalEdit} />
        </div>
    ),
];

const AdminLayout = () => {
    const dispatch = useDispatch();
    // BreadCumb
    const location = useLocation();
    const crumbs = location.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb, index, array) => {
            const path = `/${array.slice(0, index + 1).join("/")}`;
            let crumbText = "";
            // Thay đổi text cho từng crumb dựa vào đường dẫn (path)
            switch (path) {
                case "/employee":
                    crumbText = "Employee Management";
                    break;
                case "/employee/create-or-update":
                    crumbText = "Add new employee";
                    break;
                default:
                    crumbText = crumb;
                    break;
            }
            const isCurrent = path === location.pathname;

            return (
                <Breadcrumb.Item key={path}>
                    <Link
                        to={path}
                        className={isCurrent ? "breadcrumb-active" : ""}
                    >
                        {crumbText}
                    </Link>
                </Breadcrumb.Item>
            );
        });

    // Dispath
    // const user = useSelector((state: RootState) => state.auth.user);
    // Layout
    const [collapsed, setCollapsed] = useState(false);

    const { Header, Content, Footer, Sider } = Layout;

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.clear();
        dispatch(logout());
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Header className="header">
                <div className="header__logo">
                    <img src={LogoHeader} alt="Logo" />
                    <h3 className="header__title">HR Management System</h3>
                </div>
                <div className="header__gear">
                    {/* <img src="" alt="" /> */}

                    <Button className="header__profile" onClick={showModal}>
                        AD
                    </Button>
                    <Modal
                        className="profile__modal"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div className="profile__modal-head">
                            <div className="header__profile">AD</div>
                            <h3 className="profile__modal-username">Admin</h3>
                        </div>
                        <p className="profile__modal-nik">PGA001</p>

                        <Button
                            className="profile__modal-signout"
                            onClick={handleOk}
                        >
                            Sign Out
                        </Button>

                        <div>
                            <Link
                                to={"/change-password"}
                                className="profile__modal-reset"
                            >
                                Reset Password
                            </Link>
                        </div>
                    </Modal>
                </div>
            </Header>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    className="sider"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    style={{
                        backgroundColor: "#fff",
                    }}
                    width={300}
                >
                    <Menu
                        className="sider-menu"
                        theme="light"
                        // defaultSelectedKeys={["1"]}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>
                                <Link to="/">Management</Link>
                            </Breadcrumb.Item>
                            {crumbs}
                        </Breadcrumb>
                        {/* <Outlet /> */}
                        <Outlet></Outlet>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Copyright © 2022. All Rights Reserved
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default AdminLayout;
