import Image from 'next/image';
import { useRouter } from 'next/router';
import { Sidenav, Nav, Dropdown } from 'rsuite';
import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

const sidebarStyle = css`
    max-width: 150px;
    margin-top: 10%;

`

const Navbar = () => {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const [activeKey, setActiveKey] = useState('list');

    return (
        <div css={sidebarStyle}>

            <Sidenav
                expanded={true}
                activeKey={activeKey}
                onSelect={setActiveKey}
            >
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="list">
                            Pokelist
                        </Nav.Item>
                        <Nav.Item eventKey="mylist">
                            My Pokemon
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    )
}

export default Navbar;