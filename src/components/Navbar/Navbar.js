import React, { useState } from "react";
import "../../index.css";
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import logo from "../../assets/pescticide1.jpg";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../../index.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { CSSTransition } from "react-transition-group";

import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
import ChevronRightSharpIcon from "@material-ui/icons/ChevronRightSharp";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CategorySharpIcon from "@material-ui/icons/CategorySharp";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";

const Navbar1 = ({ totalItems }) => {
    const [open, setOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("main");
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleClose = () => {
        setOpen(false);
    };

    const Navbar = (props) => {
        return (
            <nav className="navbar">
                <ul className="navbar-nav">{props.children} </ul>
            </nav>
        );
    };

    const NavItem = (props) => {
        return (
            <li className="nav-item">
                <a href="/" className="icon-button">
                    {props.icon}
                </a>

                {open && props.children}
            </li>
        );
    };

    const DropDownMenu = () => {
        function DropDownItem(props) {
            return (
                <div
                    className="menu-item"
                    onClick={(e) => {
                        e.preventDefault();
                        props.goToMenu && setActiveMenu(props.goToMenu);
                        props.urlFac && history.push(props.urlFac);
                        props.closeFac && handleClose();
                    }}
                >
                    <span style={{ marginRight: "5%" }} className="icon-button">
                        {props.leftIcon}
                    </span>
                    {props.children}
                    <span className="icon-right">{props.rightIcon}</span>
                </div>
            );
        }

        return (
            <div className="dropdown">
                <CSSTransition
                    in={activeMenu === "main"}
                    unmountOnExit
                    timeout={500}
                    classNames="menu-primary"
                >
                    <div className="menu">
                        <DropDownItem
                            leftIcon={
                                <HomeSharpIcon
                                    style={{ paddingRight: "1px" }}
                                    className="arrowdown"
                                />
                            }
                            urlFac="/"
                            closeFac="some"
                        >
                            HOME
                        </DropDownItem>
                        <DropDownItem
                            leftIcon={
                                <CategorySharpIcon className="arrowdown" />
                            }
                            rightIcon={<ChevronRightSharpIcon />}
                            goToMenu="categories"
                        >
                            CATEGORIES
                        </DropDownItem>
                        <DropDownItem
                            leftIcon={<PersonSharpIcon className="arrowdown" />}
                            urlFac="/profile"
                            closeFac="some"
                        >
                            PROFILE
                        </DropDownItem>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={activeMenu === "categories"}
                    unmountOnExit
                    timeout={500}
                    classNames="menu-secondary"
                >
                    <div className="menu">
                        <DropDownItem
                            leftIcon={<ArrowBack className="arrowdown" />}
                            goToMenu="main"
                        >
                            CATEGORIES
                        </DropDownItem>
                        <DropDownItem
                            leftIcon={
                                <DoubleArrowSharpIcon className="arrowdown" />
                            }
                            urlFac="/seeds"
                            closeFac="some"
                        >
                            Seeds
                        </DropDownItem>
                        <DropDownItem
                            leftIcon={
                                <DoubleArrowSharpIcon className="arrowdown" />
                            }
                            urlFac="/fertilizers"
                            closeFac="some"
                        >
                            Fertilizers
                        </DropDownItem>
                        <DropDownItem
                            leftIcon={
                                <DoubleArrowSharpIcon className="arrowdown" />
                            }
                            urlFac="/pecticides"
                            closeFac="some"
                        >
                            Pecticides
                        </DropDownItem>
                    </div>
                </CSSTransition>
            </div>
        );
    };

    return (
        <>
            <AppBar position="fixed" className="classes.appBar" color="inherit">
                {isMobile ? (
                    //
                    // Mobile Version
                    <>
                        <Navbar>
                            <Typography variant="h5" className="mob-title">
                                AGRITECH
                            </Typography>
                            {!(
                                location.pathname === "/login" ||
                                location.pathname === "/signup" ||
                                location.pathname === "/forgot-password"
                            ) && (
                                <>
                                    <div style={{ flexGrow: 1 }} />
                                    <NavItem
                                        icon={
                                            location.pathname === "/cart" ? (
                                                <IconButton
                                                    className="icon-button"
                                                    component={Link}
                                                    to="/"
                                                    aria-label="Go back to Home"
                                                    color="inherit"
                                                >
                                                    <HomeSharpIcon />
                                                </IconButton>
                                            ) : (
                                                <IconButton
                                                    className="icon-button"
                                                    component={Link}
                                                    to="/cart"
                                                    aria-label="Show Cart items"
                                                    color="inherit"
                                                >
                                                    <Badge
                                                        badgeContent={
                                                            totalItems
                                                        }
                                                        color="secondary"
                                                    >
                                                        <ShoppingCart />
                                                    </Badge>
                                                </IconButton>
                                            )
                                        }
                                    />

                                    <NavItem
                                        icon={
                                            <IconButton
                                                style={{ color: "white" }}
                                                className="icon-button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpen(!open);
                                                }}
                                            >
                                                {open ? (
                                                    <ArrowDropUpSharpIcon className="arrowdown" />
                                                ) : (
                                                    <ArrowDropDownIcon className="arrowdown" />
                                                )}
                                            </IconButton>
                                        }
                                    >
                                        <DropDownMenu />
                                    </NavItem>
                                </>
                            )}
                        </Navbar>
                    </>
                ) : (
                    // DeskTop Version
                    <>
                        <Toolbar>
                            <Typography
                                variant="h6"
                                className={classes.title}
                                color="inherit"
                            >
                                <img
                                    src={logo}
                                    alt="AgriTech"
                                    height="25px"
                                    style={{
                                        borderRadius: "50%",
                                        marginRight: "5px",
                                    }}
                                    className="classes.image"
                                />
                                <Link to="/" style={{ color: "#dd2288" }}>
                                    AGRITECH
                                </Link>
                            </Typography>
                            <div className={classes.grow} />
                            {!(
                                location.pathname === "/login" ||
                                location.pathname === "/signup" ||
                                location.pathname === "/forgot-password"
                            ) && (
                                <>
                                    <div className={classes.navBar}>
                                        <li
                                            className="curserOver"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => history.push("/")}
                                        >
                                            Home
                                        </li>
                                        <li
                                            className="curserOver"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                history.push("/seeds")
                                            }
                                        >
                                            Seeds
                                        </li>
                                        <li
                                            className="curserOver"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                history.push("/fertilizers")
                                            }
                                        >
                                            Fertilizers
                                        </li>
                                        <li
                                            className="curserOver"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                history.push("/pecticides")
                                            }
                                        >
                                            Pecticides
                                        </li>
                                    </div>
                                    {location.pathname === "/cart" ? (
                                        ""
                                    ) : (
                                        <div className={classes.button}>
                                            <IconButton
                                                component={Link}
                                                to="/cart"
                                                aria-label="Show Cart items"
                                                color="inherit"
                                            >
                                                <Badge
                                                    badgeContent={totalItems}
                                                    color="secondary"
                                                >
                                                    <ShoppingCart />
                                                </Badge>
                                            </IconButton>
                                        </div>
                                    )}
                                </>
                            )}
                        </Toolbar>
                    </>
                )}
            </AppBar>
        </>
    );
};

export default Navbar1;
