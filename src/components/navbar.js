import * as React from "react"
import { useEffect, useState, createPage }  from 'react' 
import laCavaLogo from '../images/La_Cava_Logo.jpg'
import '../styles/app.css'; 




const Navbar = () => {
    
    const logo = {"margin":"0 auto","height":"80px","padding":"10px 0","display":"block"}
    const burgerButtonAnchor = {"display":"flex","width":"40px","height":"32px","position":"relative","cursor":"pointer", "zIndex": '999999', "position": "absolute"}

    const [navbarMenuOpen, setNavbarMenuOpen] = useState(false);
    
    const handleOnClickContacto = () => {
        const element = document?.querySelector("#contact");
        const offsetTop = 100;
      
        const total = element.offsetTop - offsetTop;
        window.scrollTo({ top: total, behavior: 'smooth' });
    }
    
 
    
    return (<>
        <div className="navbar-container">
            <div className='navbar-button-container'>
                <a style={burgerButtonAnchor} onClick={() => setNavbarMenuOpen((prev) => !prev)}>
                    <span className={navbarMenuOpen ? 'burger-button-line-top display-close-navbar-icon-line-top' : 'burger-button-line-top'}></span> 
                    <span className={navbarMenuOpen ? 'burger-button-line-bottom display-close-navbar-icon-line-bottom' : 'burger-button-line-bottom'}></span>
                </a>
            </div> 
            <div className="navbar-logo-container">
                <a href="/"> 
                    <img style={logo} src={laCavaLogo}/>
                </a>
            </div> 
            <div className="navbar-cta-container">
                <a className="navbar-cta" onClick={handleOnClickContacto}>Contacto</a>
            </div>
        </div>
        <div className={navbarMenuOpen ? 'mobile-navbar-menu show-navbar-menu' : 'mobile-navbar-menu'}></div>        
        </>
    ) 
    
    
}

export default Navbar