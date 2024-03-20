import * as React from "react"
import { useState, useEffect }  from 'react' 
import troncoImg from '../images/tronco.png' 
import wineriesImage from '../images/wineries-image.png';
import SEO from "../components/seo"

import { CiInstagram } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";

import '../styles/app.css';
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS } from "@contentful/rich-text-types"
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const mainContainerStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif", 
  margin: '-8px',
}

const contentfulRichTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p> 
	}
};

const IndexPage = ({data}) => {

	const handleOnClickKnowMore = () => {
        const element = document.querySelector('#history');
        if(element) {
            const offsetTop = 100;
        
            const total = element.offsetTop - offsetTop;
            window.scrollTo({ top: total, behavior: 'smooth' });
        }	
    }
	
	console.log(data);
	const b = data.allContentfulCavas.edges.map((edge, i) => { 
		let bodega = edge.node;
	
		return Object.assign({}, bodega, { activeBodega : i === 0 ? true : false })
	});
	const [index, setIndex] = useState(0); 
	const [bodegas, setBodegas] = useState(b);

	const wines = data.allContentfulVinos.edges;

	const winesPerinet = wines.reduce((filtered, wine) => { 
		if(wine.node.bodega.name === 'Perinet') filtered.push(wine) 
		return filtered;
	}, []);
	const winesOtazu = wines.reduce((filtered, wine) => { 
		if(wine.node.bodega.name === 'Otazu') filtered.push(wine) 
		return filtered;
	}, []);
	const winesHerasCordon = wines.reduce((filtered, wine) => { 
		if(wine.node.bodega.name === 'Heras Cordón') filtered.push(wine) 
		return filtered;
	}, []);
	const winesBosquesDeMatasnos = wines.reduce((filtered, wine) => { 
		if(wine.node.bodega.name === 'Bosque de Matasnos') filtered.push(wine) 
		return filtered;
	}, []);
	const classifiedWines = {
		"Perinet": winesPerinet,
		"Otazu": winesOtazu,
		"HerasCordón": winesHerasCordon,
		"BosquedeMatasnos": winesBosquesDeMatasnos
	}

	const handleLeft = () => {
		if(index > 0) {
			bodegas[index].activeBodega = false;
			let i = index-1;
			setIndex(i);
			bodegas[i].activeBodega = true; 
			setBodegas([...bodegas]);
		}
	}
   
   const handleRight = () => {
		if(index < bodegas.length-1) {
			bodegas[index].activeBodega = false;
			let i = index+1;
			setIndex(i);
			bodegas[i].activeBodega = true; 
			setBodegas([...bodegas]);
		}
   }

   const [selectedTabWines, setSelectedTabWines] = useState(winesHerasCordon);

   	const handleWineryTabClick = (id) => {
		const currentActiveTab = document.querySelector('.winery-active-tab')
		currentActiveTab.classList.remove('winery-active-tab'); 
		const newActiveTab = document.querySelector("#"+id);
		newActiveTab.classList.add('winery-active-tab');
		setSelectedTabWines(classifiedWines[id]);
   	}

	useEffect(() => {
		const hash = window.location.hash;
		if(hash) {
			const element = document.querySelector(hash);
			element.scrollIntoView({behavior:"smooth"})
		}
		setTimeout(()=> {
			const hash = window.location.hash;
			if(hash) {
				const element = document.querySelector(hash);
				element.scrollIntoView({behavior:"smooth"})
			}
		}, 1000);
	}, []);

  return (
    <main style={mainContainerStyles}> 
	<Navbar></Navbar>
		<div id="home" className="hero">
			<div className="hero-overlay">
				<div className="hero-headers">
					<h1>La Cava</h1>
					<h2>Especialidades</h2>
				</div>
				<div className="hero-cta-container">
					<a className="hero-cta" onClick={handleOnClickKnowMore}>Conocer más</a>
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
				<div className="wineries-carousel-container">
					<div className="wineries-carousel-arrows-container">
						<button className="wineries-carousel-arrows" disabled={index === 0} onClick={handleLeft} ><IoIosArrowBack/></button>
					</div>
					<div className="wineries-cards-container">
						{
							bodegas.map((bodega) => { 
								return (					
								<div className={bodega.activeBodega ? 'active-card card' : 'inactive-card card'} key={bodega.id} > 
									<img src={bodega.logo.file.url}/> 
									<div className="card-text"> 
										<h3>{bodega.name}</h3> 
										<div>{renderRichText(bodega.description, contentfulRichTextOptions)}</div>
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
						<div className="wineries-cards-bullets">
							<TbPointFilled></TbPointFilled>
							<TbPointFilled></TbPointFilled>
							<TbPointFilled></TbPointFilled>
							<TbPointFilled></TbPointFilled>
						</div>
					</div>
					<div className="wineries-carousel-arrows-container">
						<button className="wineries-carousel-arrows" disabled={index === 3} onClick={handleRight}><IoIosArrowForward/></button>
					</div> 
				</div>
				<div className="wineries-image">
					<img src={wineriesImage}/>
				</div>
			</div>
		</div>
		<div id="wines" className="wines">
			<div className="wines-content-container">
				<h2>Vinos</h2>
				<div className="card wines-card">
					<div className="wineries-tabs-container">
						{
							bodegas.map((bodega, index) => {  
								return (
									<div key={bodega.id} id={bodega.name.replace(/\s/g, '')} className={index === 0 ? 'winery-active-tab winery-tab' : 'winery-tab'} onClick={() => handleWineryTabClick(bodega.name.replace(/\s/g, ''))} >
										<div  className="winery-tab-image-container">
											<img src={bodega.logo.file.url}/> 
										</div>
										<div className="winery-tab-header"> 
											<h3 >{bodega.name}</h3> 
										</div>
									</div> 
								);
							})
						}					
					</div>
					<div className="wineries-tabs-content-container">
						<div className="wines-list-container">
							{
								selectedTabWines.map(wine => {
									return (
										<div key={wine.node.id} className="wines-list-item">
											<div className="wines-list-item-image-container">
												<img src={wine.node.image.file.url} />
											</div>
											<div className="wines-list-item-info-container">
												<h4>{wine.node.name}</h4>
												<span>{wine.node.region}</span>
												<a href={wine.node.slug}>Ver más</a>
											</div>
										</div>										
									);
								})
							}							
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="instagram" className="instagram">
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
							<img key={node.id} src={node.localFile.childImageSharp.fixed.src}/>  	
						))
					}
				</div>
				<div className="instagram-cta-container">
					<a className="instagram-cta" href="https://instagram.com/lacavaespecialidades" target="_blank">Ver en Instagram</a>
				</div>
			</div>		
		</div>
		<div id="clients" className="clients">
			<div className="clients-content-container">
				<h2>Nuestros Clientes</h2>
				<div className="clients-logos-container">
					
					{
						data.allContentfulClientes.edges.map(({node}) => {
							return (
								<div key={node.id} className="clients-logo-image-container">
									<img src={node.logo.file.url} /> 
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
		<div id="contact" className="contact">
			<div className="contact-content-container">
				<div className="contact-image">
					<div className="contact-image-overlay"></div>
				</div>
				<div className="contact-form-container">
					<h2>Contacto</h2>
					<form name="contact" method="post" data-netlify="true">
						<input type="hidden" name="form-name" value="contact" />		
						<div className="form-input-container">
							<label>Nombre</label>
							<input type="text" name="name" />
						</div>
						<div className="form-input-container">
							<label>E-mail</label>
							<input type="email" name="email" />
						</div>
						<div className="form-input-container">
							<label>Mensaje</label>
							<textarea rows="8" name="message"></textarea>
						</div>
						<div className="form-input-container">
							<button type="submit">Enviar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<Footer></Footer>
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
				id
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
		},
		allContentfulVinos {
			edges {
			  node {
				alcohol
				aromas {
				  raw
				}
				coupage {
				  raw
				}
				crianza {
				  raw
				}
				description {
				  raw
				}
				gusto {
				  raw
				}
				id
				image {
				  file {
					url
				  }
				}
				name
				region
				vinedos {
				  raw
				}
				vista {
				  raw
				}
				bodega {
				  id
				  name
				}
				slug
				fermentacion {
					raw
				} 
			  }
			}
		},
		allContentfulClientes {
			edges {
			  node {
				id
				name
				logo {
				  file {
					url
				  }
				}
			  }
			}
		},

	}`

export default IndexPage

export const Head = () => {
	<SEO/> 
}
