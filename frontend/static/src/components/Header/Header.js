import { NavLink } from 'react-router-dom'

function Header(props) {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/'>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/registration'>Register</NavLink>
                        </li>
                        {props.isAuth && (
                            <>
                            <li className='nav-item'>
                                <NavLink to='/articles/create'>Submit Article</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/articles/myarticles'>My Articles</NavLink>
                            </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Header;