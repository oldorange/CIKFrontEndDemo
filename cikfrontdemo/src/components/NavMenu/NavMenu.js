import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = props => {
    const { t, i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const [isScroll, setIsScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
        let scrollValue = document.documentElement.scrollTop;
        if (scrollValue > 50) {
            setIsScroll(true);
        } else {
            setIsScroll(false);
        }

    };

    return (

        <Navbar className={`navbar-expand-sm navbar-toggleable-sm ${isScroll ? "sticky-top bg-dark text-light" : "fixed-top  navbar-light  text-dark"}`} >
                <Container>
                    <NavbarBrand tag={Link} to="/">CIKDemo</NavbarBrand>
                    <NavbarToggler onClick={toggle} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/counter">Counter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/fetch-data">Fetch data</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {t('current_language')}
                                     </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => changeLanguage('en-ca')}>
                                        English
                                    </DropdownItem>
                                    <DropdownItem onClick={() => changeLanguage('zh-cn')}>
                                        中文简体
                                    </DropdownItem>
                                    <DropdownItem onClick={() => changeLanguage('zh-tw')}>
                                        中文繁体
                                    </DropdownItem>
                                    <DropdownItem onClick={() => changeLanguage('fr-ca')}>
                                        Français
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
    );
}

export default NavMenu;
