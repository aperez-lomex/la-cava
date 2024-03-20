/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
  });

module.exports = {
	siteMetadata: {
		title: 'La Cava',
		description: 'La Cava Especialidades nace de la pasión por los vinos españoles y por el deseo de compartir con el mercado mexicano la experiencia de la mano de nuestros mejores sommeliers',
		image: './src/images/La_Cava_Logo.jpg',
		siteUrl: 'https://lacava-especialidades.com/',
  	},
  	plugins: [
		{
			resolve: 'gatsby-source-contentful',
			options: {
				"accessToken": process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
				"spaceId": "osb5rr2qcwk9"
			}
		}, 
		"gatsby-plugin-image", 
		"gatsby-plugin-sharp", 
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-plugin-anchor-links",
			options: {
				offset: -100,
				duration: 1000
			}
		},
		{
			resolve: `gatsby-omni-font-loader`,
			options: {
				enableListener: true,
				preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
				web: [
					{
						name: `Open Sans`,
						file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
					},
					{
						name: 'Gothic A1',
						file: 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300;400;600;700;800&display=swap'
					}
				],
			},
		},
		{
			resolve: 'gatsby-source-instagram',
			options: {
				username: '49946873500', 
			},
		},
		// {
		// 	resolve: 'gatsby-plugin-favicons',
		// 	options: {
		// 	  logo: './src/images/favicon.ico',
		// 	}
		// }
	]
};