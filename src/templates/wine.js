import * as React from "react"
import { useState }  from 'react' 

import { graphql } from "gatsby"
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS } from "@contentful/rich-text-types"
import { SEO } from "../components/seo";

import { FaWineGlassEmpty } from "react-icons/fa6";
import { MdOutlineBubbleChart } from "react-icons/md";
import { GiCellarBarrels } from "react-icons/gi";
import { GiGrapes } from "react-icons/gi";
import { CiPercent } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { GiNoseFront } from "react-icons/gi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Wine = (props) => {
   	console.log(props.pageContext);
	const wine = Object.assign({}, props.pageContext.data, { 
		allImages: props.pageContext.data.otherImages ? [...[props.pageContext.data.image], ...props.pageContext.data.otherImages] : [props.pageContext.data.image]
	})
	console.log(wine)
   	const mainContainerStyles = {
		fontFamily: "-apple-system, Roboto, sans-serif, serif", 
      	margin: '-8px',
    }
	const contentfulRichTextOptions = {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p> 
		}
	};

	const initialImages = wine.allImages.map((image, i) => { 
	
		return Object.assign({}, image, { activeImage : i === 0 ? true : false })
	});
	console.log(initialImages);
	const [index, setIndex] = useState(0); 
	const [images, setImages] = useState(initialImages);	

	const handleLeft = () => {
		if(index > 0) {
			images[index].activeImage = false;
			let i = index-1;
			setIndex(i);
			images[i].activeImage = true; 
			setImages([...images]);
		}
	}
   
   const handleRight = () => {
		if(index < images.length-1) {
			images[index].activeImage = false;
			let i = index+1;
			setIndex(i);
			images[i].activeImage = true; 
			setImages([...images]);
		}
   }

    return (
      	<main style={mainContainerStyles}>
        	<Navbar></Navbar>
			<div className="wine-detail-page-container">
				<div className="return-button-container">					
					<a href="/">
						<div className="return-button-icon-container">
							<MdOutlineKeyboardArrowLeft></MdOutlineKeyboardArrowLeft>
						</div>
						Regresar
					</a>
				</div>
				<div className="wine-detail-card card">
					<div className="wine-detail-header">
						<h1>{wine.name}</h1>
						<h2>{wine.bodega.name}</h2>
						<h3>{wine.region}</h3>
					</div>
					<div className="wine-detail-content-contaier">
						<div className="wine-detail-content-image-container">   
							{
								images.length > 1 ? 
								<div className="images-carousel-arrows-container">
									<button className="images-carousel-arrows" disabled={index === 0} onClick={handleLeft} ><IoIosArrowBack/></button>
								</div>
								: 
								''
							}							
							<div className="images-card-container">
								<img className="bodega-logo-image" src={wine.bodega.logo.file.url}></img>
								{
									images.map((image) => { 
										return (					
											<img key={image.id} className={image.activeImage ? 'active-bottle-image bottle-image' : 'inactive-bottle-image bottle-image'} src={image.file.url}></img> 
										);
									})
								}
							</div>
							{
								images.length > 1 ? 
								<div className="images-carousel-arrows-container">
									<button className="images-carousel-arrows" disabled={index === images.length-1} onClick={handleRight}><IoIosArrowForward/></button>
								</div>
								:
								''
							} 
						</div>
						<div className="wine-detail-content-text-container">
							<div className="wine-detail-description">
								<span>Descripción</span>
								<div>
									{renderRichText(wine.description, contentfulRichTextOptions)}
								</div>							
							</div>
							<div className="wine-detail-attirbutes-container">
								<div className="wine-detail-attirbute-container">
									<div className="wine-detail-attirbute-header">
										<GiGrapes></GiGrapes>
										<span>Coupage</span>
									</div>
									<div className="wine-detail-attirbute-text">
										{renderRichText(wine.coupage, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<div className="wine-detail-attirbutes-container">
										{ wine.crianza ? 
											<GiCellarBarrels></GiCellarBarrels> : 
											<MdOutlineBubbleChart></MdOutlineBubbleChart> 
										}
										<span>{ wine.crianza ? 'Crianza' : 'Fermentación'}</span>
									</div>
									<div className="wine-detail-attirbute-text">
										{ wine.crianza ? renderRichText(wine.crianza, contentfulRichTextOptions) : renderRichText(wine.fermentacion, contentfulRichTextOptions) }									
									</div>
								</div>
								{/* <div className="wine-detail-attirbute-container">
									<div className="wine-detail-attirbutes-container">
										<GiGrapes></GiGrapes>
										<span>Viñedos</span>
									</div>
									
									<div className="wine-detail-attirbute-text">
										{renderRichText(wine.vinedos, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<div className="wine-detail-attirbutes-container">
										<CiPercent></CiPercent>
										<span>Alcohol</span>
									</div>
									<div className="wine-detail-attirbute-text">
										<p>{wine.alcohol}</p>
									</div>
								</div> */}
								<div className="wine-detail-attirbute-container">
									<div className="wine-detail-attirbutes-container">
										<FaRegEye></FaRegEye>
										<span>Vista</span>
									</div>
									<div className="wine-detail-attirbute-text">
										{renderRichText(wine.vista, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<div className="wine-detail-attirbutes-container">
										<GiNoseFront></GiNoseFront>
										<span>Aromas</span>
									</div>
									<div className="wine-detail-attirbute-text">
										{renderRichText(wine.aromas, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<div className="wine-detail-attirbutes-container">
										<FaWineGlassEmpty></FaWineGlassEmpty>
										<span>Gusto</span>
									</div>
									<div className="wine-detail-attirbute-text">
										{renderRichText(wine.gusto, contentfulRichTextOptions)}
									</div>
								</div>
							</div>
						</div>
					</div>					
				</div>
         	</div>
         	<Footer></Footer>
      	</main>
	)
}  

export default Wine

export const Head = () => (
	<SEO />
)