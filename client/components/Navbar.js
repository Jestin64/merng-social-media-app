import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


export default function Navbar() {
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = React.useState(path)
    const isLogged = false

    function handleClick(e, { name }) {
        setActiveItem(name)
    }

    return (
        <div>
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name="home"
                    onClick={handleClick}
                    active={activeItem === 'home'}
                    as={Link}
                    to="/"
                />

                {/* if logged in then display profile instead of login  */}
                <Menu.Menu position="right">
                    {
                        isLogged ?      
                        (<Menu.Item
                            name="profile"
                            onClick={handleClick}
                            active={activeItem === 'profile'}
                            as={Link}
                            to="/Profile"
                        />)
                        : (<Menu.Item
                            name="login"
                            onClick={handleClick}
                            active={activeItem === 'login'}
                            as={Link}
                            to="/login"
                        />)
                    }

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
}
