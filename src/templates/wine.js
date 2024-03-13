import * as React from "react"
import { graphql } from "gatsby"
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS } from "@contentful/rich-text-types"

const Wine = (props) => {
   	console.log(props.pageContext);
	const wine = props.pageContext.data
   	const mainContainerStyles = {
		fontFamily: "-apple-system, Roboto, sans-serif, serif", 
      	margin: '-8px',
    }
	const contentfulRichTextOptions = {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p> 
		}
	};

    return (
      	<main style={mainContainerStyles}>
        	<Navbar></Navbar>
			<div className="wine-detail-page-container">
				<div className="wine-detail-card card">
					<div className="wine-detail-header">
						<h1>{wine.name}</h1>
						<h2>{wine.region}</h2>
					</div>
					<div className="wine-detail-content-contaier">
						<div className="wine-detail-content-image-container">   
							<img src={wine.image.file.url}></img>
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
									<span>Coupage</span>
									<div>
										{renderRichText(wine.coupage, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<span>{ wine.crianza ? 'Crianza' : 'Fermentación'}</span>
									<div>
										{ wine.crianza ? renderRichText(wine.crianza, contentfulRichTextOptions) : renderRichText(wine.fermentacion, contentfulRichTextOptions) }									
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<span>Viñedos</span>
									<div>
										{renderRichText(wine.vinedos, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<span>Alcohol</span>
									<div>
										<p>{wine.alcohol}</p>
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<span>Vista</span>
									<div>
										{renderRichText(wine.vista, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<span>Aromas</span>
									<div>
										{renderRichText(wine.aromas, contentfulRichTextOptions)}
									</div>
								</div>
								<div className="wine-detail-attirbute-container">
									<span>Gusto</span>
									<div>
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

export const Head = () => <title>Wine Page</title>