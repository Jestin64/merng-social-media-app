import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { AuthContext } from "../context/auth.context"


export default function Navbar() {
    const context = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = React.useState(path)

    function handleClick(e, { name }) {
        setActiveItem(name)
    }

    return (
        context.user
            ? (
                <div>
                    <Menu pointing secondary size="massive" color="teal">
                        <Menu.Item
                            name="home"
                            onClick={handleClick}
                            active={activeItem === 'home'}
                            as={Link}
                            to="/"
                        />
                        <Menu.Menu position="right">
                            <Menu.Item
                                name={context.user.username}
                                onClick={handleClick}
                                active={activeItem === 'profile'}
                                as={Link}
                                to="/profile"
                            />

                            <Menu.Item
                                name="logout"
                                onClick={context.logout}
                                active={activeItem === 'logout'}
                                as={Link}
                                to="/login"
                            />
                        </Menu.Menu>
                    </Menu>
                </div>
            )
            : (
                <div>
                    <Menu pointing secondary size="massive" color="teal">
                        <Menu.Item
                            name="home"
                            onClick={handleClick}
                            active={activeItem === 'home'}
                            as={Link}
                            to="/"
                        />

                        <Menu.Menu position="right">
                            <Menu.Item
                                name="login"
                                onClick={handleClick}
                                active={activeItem === 'login'}
                                as={Link}
                                to="/login"
                            />

                            <Menu.Item
                                name="register"
                                onClick={handleClick}
                                active={activeItem === 'register'}
                                as={Link}
                                to="/register"
                            />
                        </Menu.Menu>
                    </Menu>
                </div>
            )
    )
}
