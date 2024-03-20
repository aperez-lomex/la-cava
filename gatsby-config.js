/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
  });

module.exports = {
	siteMetadata: {
		title: 'La Cava Especialidades',
		description: 'La Cava Especialidades nace de la pasión por los vinos españoles y por el deseo de compartir con el mercado mexicano la experiencia de la mano de nuestros mejores sommeliers',
		image: './src/images/la-cava-logo-no-title.png',
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
		  {
		  resolve: `gatsby-plugin-manifest`,
		  options: {
		  name: `La Cava Especialidades`,
		  short_name: `La Cava Especialidades`,
		  start_url: `/`,
		  background_color: `#ffffff`,
		  theme_color: `#663399`,
		  display: `standalone`,
		  // Generate PWA icons and a favicon
		  icon: `src/images/la-cava-logo-no-title.png`,}
		}
	]
};