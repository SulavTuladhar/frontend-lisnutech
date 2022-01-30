/* functional component */
import './Header.components.css';
import { Link, withRouter } from 'react-router-dom';

const logout = (history) =>{
    // Clearning Local storage
    localStorage.clear();
    history.push('/login')
    // Navigate to Loginpage
}

const HeaderComponent = (props)=>{
    const currentUser = JSON.parse(localStorage.getItem('user'))
    let content = props.isLoggedIn
        ?  <nav className="navbar bg-color pt-4 pb-4 loggedInNavBar" style={{zIndex: "1000", position: "fixed", width: '100vw'}}>
                <div className='container'>
                    <Link to="/dashboard"> <img src='./../images/logo.png' alt='logo' /> </Link>
                    <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navmenu"
                                    style={{outline: 'none'}}
                                >
                                    <span className="navbar-toggler-icon p-fixed"> 
                                        <div id="bar1" className="bar"></div>
                                        <div id="bar2" className="bar"></div>
                                        <div id="bar3" className="bar"></div>
                                    </span>
                                </button>       
                    <div className="collapse navbar-collapse" id='navmenu'>
                        <ul className="navbar-nav d-flex align-items-center pt-5">
                                <li className="nav-item text-color mb-3"> <h2> Hi, {currentUser.username} </h2> </li>
                                <li className="nav-item text-color mb-3"><Link className='text-color' to="/edit-home"> Home </Link> </li>
                                <li className="nav-item text-color mb-3"><Link className='text-color' to="/editSocialMedia"> Social Media Management </Link></li>
                                <li className="nav-item text-color mb-3"><Link className='text-color' to="/editWebDevelopment"> WEb Design & Development </Link> </li>
                                <li className="nav-item text-color mb-3"><Link className='text-color' to="/editdigitalMarketing"> Digital Marketing  </Link> </li>
                                <li className="nav-item text-color mb-3"><Link className='text-color' to="/editGraphicsDesign"> Graphics Design </Link> </li>
                                <li className="nav-item text-color mb-3"><Link className='text-color' to="/editBlog"> Blog </Link> </li>
                                <li className="nav-item text-color mb-5"><Link className='text-color' to="/contact"> Contact Us </Link> </li>
                                <li className="nav-item text-color mb-5" style={{cursor: 'pointer'}} onClick={()=>{logout(props.history)}}>Logout</li>
                        </ul> 
                            </div>
                </div>

        </nav>
        :   <nav className="navbar pt-4 pb-4 bg-color position-fixed container-fluid" style={{zIndex: '1000'}}>
                <div className='container'>
                    <img src='./images/logo.png' alt='logo' />
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navmenu"
                                >
                                    <span className="navbar-toggler-icon p-fixed"> 
                                        <div id="bar1" className="bar"></div>
                                        <div id="bar2" className="bar"></div>
                                        <div id="bar3" className="bar"></div>
                                    </span>
                                </button>
                    <div className="collapse navbar-collapse" id='navmenu'>
                        <ul className="navbar-nav d-flex align-items-center pt-5 pb-5">
                        <li className="nav-item mb-3"> <Link className='text-color' to="/"> Home </Link> </li>
                                <li className="nav-item mb-3"><Link className='text-color' to="/socialMediaManagement">Social Media Management </Link></li>
                                <li className="nav-item mb-3"><Link className='text-color' to="/webDevelopment"> Web Design & Development </Link> </li>
                                <li className="nav-item mb-3"><Link className='text-color' to="/digitalmarketing"> Digital Marketing </Link> </li>
                                <li className="nav-item mb-3"><Link className='text-color' to="/graphicsDesign"> Graphics Design </Link> </li>
                                <li className="nav-item mb-3"><Link className='text-color' to="/blog"> Blog </Link></li>
                                <li className="nav-item mb-3"><Link className='text-color' to="/contact"> Contact Us </Link> </li>
                                <li className="nav-item mb-3"><Link className='text-color' to="/login"> Login </Link> </li>
                        </ul> 
                            </div>
                            
                </div>

            </nav>   
       
    return(
        <div className="nav-bar">

            {content}

        </div>
    )
}

export const Header = withRouter(HeaderComponent) 