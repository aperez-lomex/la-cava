import * as React from "react"
import { useEffect, useState }  from 'react'
import laCavaLogo from '../images/La_Cava_Logo.jpg'
import troncoImg from '../images/tronco.png' 
import wineriesImage from '../images/wineries-image.png';
import whatsappLogo from '../images/whatsappLogo.png';
import { CiInstagram } from "react-icons/ci";

import '../styles/app.css';
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS } from "@contentful/rich-text-types"

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif", 
  margin: '-8px',
}

const logo = {"margin":"0 auto","height":"80px","padding":"10px 0","display":"block"}

const burgerButtonAnchor = {"display":"flex","width":"40px","height":"32px","position":"relative","cursor":"pointer", "zIndex": '999999', "position": "absolute"}

const contentfulRichTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p> 
	}
};
const IndexPage = ({data}) => {
	console.log(data);

	const [navbarMenuOpen, setNavbarMenuOpen] = useState(false);
 
	// useEffect(() => {
	// 	const handleResize = () => {		  
	// 	  if(window.innerWidth >= 768) setNavbarMenuOpen(false);
	// 	};
	// 	window.addEventListener('resize', handleResize);
	// 	return () => {
	// 	  window.removeEventListener('resize', handleResize);
	// 	};
	//   }, []);

  return (
    <main style={pageStyles}> 
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
				<a className="navbar-cta">Contacto</a>
			</div>
		</div>
		<div className={navbarMenuOpen ? 'mobile-navbar-menu show-navbar-menu' : 'mobile-navbar-menu'}></div>
		{/* <div className="desktop-menu-container">
			<ul>
				<li>
					<a href="#home">Inicio</a>
				</li>
				<li>
					<a href="#history">Nuestra Historia</a>
				</li>
				<li>
					<a href="#wineries">Bodegas</a>
				</li>
			</ul>
		</div> */}
		<div id="home" className="hero">
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
		<div id="history" className="history">
			<div className="history-content-container">
				<h2>Nuestra Historia</h2>
				<div className="history-paragraphs">
					<p>La Cava Especialidades nace de la pasión por los vinos españoles y por el deseo de compartir con el mercado mexicano la experiencia de la mano de nuestros mejores sommeliers que nos transmiten su conocimiento para poder degustar de los vinos más ricos y auténticos de España.</p>
					<p>Queremos brindar la experiencia de la fusión entre nuestras mejores bodegas previamente seleccionadas en España con nuestros amantes del vino en el territorio mexicano.</p>
					<p>Encontrar un buen vino español para cada ocasión no es materia fácil, es por eso que seleccionamos las mejores y más selectas denominaciones de España, satisfaciendo los paladares más exigentes.</p>
					<p>Esperamos que los disfruten tanto como nosotros, ¡Brindamos con ustedes!</p>
				</div>
				<div className="history-image">
					<img src={troncoImg}/>
				</div>
			</div>
		</div>
		<div id="wineries" className="wineries">
			<div className="wineries-content-container">
				<h2>Bodegas</h2>
				<div className="wineries-cards-container">
			{
				data.allContentfulCavas.edges.map((edge, index) => { 
					const bodega = edge.node;
					return (					
					<div className={index === 0 ? 'active-card card' : 'card'} key={bodega.id}> 
						<img src={bodega.logo.file.url}/> 
						<div className="card-text"> 
							<h3>{bodega.name}</h3> 
							<p>{renderRichText(bodega.description, contentfulRichTextOptions)}</p>
							<h4>Redes Sociales</h4>
							<div className="card-insta-icon-container">							
								<a href={bodega.instagramUrl}>
									<CiInstagram className="card-insta-icon" />
								</a>
							</div>
						</div>
					</div>	
					);
				})
			}
				</div>
				<div className="wineries-image">
					<img src={wineriesImage}/>
				</div>
			</div>
		</div>
		<div  id="instagram" className="instagram">
			<div className="instagram-content-container">
				<h2>Instagram</h2>
				<h3>Síguenos en Instagram para mantenerte al tanto de nuestros eventos y productos</h3>
				<div className="instagram-profile-header">
					<div className="instagram-profile-picture">
						<div className="instagram-profile-picture-container">
						</div>
					</div>
					<div className="instagram-profile-info">
						<h4><a href="https://instagram.com/lacavaespecialidades" target="_blank">LA CAVA</a></h4>
						<span>Wine/spirits</span>
						<p>Disfruta la Experiencia de Nuestras Mejores Bodegas Españolas ¡Brindemos juntos! Wine distributor🍷🍇 México | España</p>
					</div>
				</div>
				<div className="instagram-posts-container">	
					{
						data.allInstaNode.edges.map(({ node }) => (
							
								<img src={node.localFile.childImageSharp.fixed.src}/>  
															
						))
					}
				</div>
				<div className="instagram-cta-container">
					<a className="instagram-cta" href="https://instagram.com/lacavaespecialidades" target="_blank">Ver en Instagram</a>
				</div>
			</div>		
		</div>
		<div className="contact">
			<div className="contact-content-container">

			<form name="contact" method="post" data-netlify="true">
  				<input type="hidden" name="form-name" value="contact" />		
  					<p>
						<label>Your Name: <input type="text" name="name" /></label>
					</p>
					<p>
						<label>Your Email: <input type="email" name="email" /></label>
					</p>
					<p>
						<label>Message: <textarea name="message"></textarea></label>
					</p>
					<p>
						<button type="submit">Send</button>
					</p>
				</form>
			</div>
		</div>
		<div className="footer">
			<div className="footer-content-container">
					<div className="footer-content-info-container">
						<h4>Redes Sociales</h4>
						<div className="footer-content-insta-icon-container">
							<a href="https://instagram.com/lacavaespecialidades" target="_blank">
								<CiInstagram className="footer-content-insta-icon" />
							</a>
						</div> 
					</div>
					<div className="footer-content-info-container">
						<h4>Ubicación</h4>
						<p>San Pedro Garza García, NL</p>
					</div>
					<div className="footer-content-info-container">
						<h4>Teléfonos</h4>
						<p><a href="tel:8150007579p8961">8150007579 Ext 8961</a></p>
						<p><a href="tel:8150007581p8960">8150007581 Ext 8960</a></p>
					</div>
			</div>
		</div>
		<div className="whatsapp-button-container">
			<a target="_blank" href="https://wa.me/5218119991129">
				<img src={whatsappLogo} />
			</a>
		</div>
    </main>
  )
  
}

export const assetQuery = graphql`
	query MyQuery {
		allContentfulCavas {
			edges {
				node {
					id
					name
					description {
						raw
					}
					logo {
						file {
						url
						}
					}
					instagramUrl 
				}
			}
		},
		allInstaNode(sort: {timestamp: DESC}, limit: 9) {
			edges {
			  node {
				thumbnails {
				  src
				}
				localFile {
					childImageSharp {
					  fixed(width: 500, height: 500) {
						...GatsbyImageSharpFixed
					  }
					}
				}
			  }
			}
		  }

	}`

export default IndexPage

export const Head = () => <title>Home Page</title>
