import * as React from "react"
import { useEffect, useState }  from 'react'
import laCavaLogo from '../images/La_Cava_Logo.jpg'
import heroBannerImg from '../images/3604a3d6-f345-4ce3-8efd-bb41919601ba.jpeg' 
import '../styles/app.css';

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  margin: '-8px',
}

const logo = {"margin":"0 auto","height":"80px","padding":"10px 0","display":"block"}

const burgerButtonAnchor = {"display":"flex","width":"40px","height":"32px","position":"relative","cursor":"pointer", "zIndex": '999999', "position": "absolute"}

const IndexPage = () => {
	const [navbarMenuOpen, setNavbarMenuOpen] = useState(false);
 
	useEffect(() => {
		const handleResize = () => {		  
		  if(window.innerWidth >= 768) setNavbarMenuOpen(false);
		};
		window.addEventListener('resize', handleResize);
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	  }, []);

  return (
    <main style={pageStyles}> 
		<div className="navbar-container">
			<div className='navbar-button-container'>
				<a style={burgerButtonAnchor} onClick={() => setNavbarMenuOpen((prev) => !prev)}>
					<span className={navbarMenuOpen ? 'burger-button-line-top display-close-navbar-icon-line-top' : 'burger-button-line-top'}></span> 
					<span className={navbarMenuOpen ? 'burger-button-line-bottom display-close-navbar-icon-line-bottom' : 'burger-button-line-bottom'}></span>
				</a>
			</div> 
			<div>
				<a href="/"> 
					<img style={logo} src={laCavaLogo}/>
				</a>
			</div> 
			<div className="navbar-cta-container">
				<a className="navbar-cta">Contacto</a>
			</div>
		</div>
		<div className={navbarMenuOpen ? 'mobile-navbar-menu show-navbar-menu' : 'mobile-navbar-menu'}></div>
		<div className="desktop-menu-container">
			<ul>
				<li>
					<a href="#">Inicio</a>
				</li>
				<li>
					<a href="#">Nuestra Historia</a>
				</li>
			</ul>
		</div>
		<div className="hero">
			<div className="hero-overlay">
				<div className="hero-headers">
					<h1>La Cava</h1>
					<h2>Especialidades</h2>
				</div>
				<div className="hero-cta-container">
					<a className="hero-cta">Conocer más</a>
				</div>
			</div>
		</div>
		 {/* <div>
			<div>
				<h2>Nuestra Historia</h2>
				<div>
					<p>La Cava Especialidades nace de la pasión por los vinos españoles y por el deseo de compartir con el mercado mexicano la experiencia de la mano de nuestros mejores sommeliers que nos transmiten su conocimiento para poder degustar de los vinos más ricos y auténticos de España.</p>
					<p>Queremos brindar la experiencia de la fusión entre nuestras mejores bodegas previamente seleccionadas en España con nuestros amantes del vino en el territorio mexicano.</p>
					<p>Encontrar un buen vino español para cada ocasión no es materia fácil, es por eso que seleccionamos las mejores y más selectas denominaciones de España, satisfaciendo los paladares más exigentes.</p>
					<p>Esperamos que los disfruten tanto como nosotros, ¡Brindamos con ustedes!</p>
				</div>
			</div>
		</div>		 */}
	
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
