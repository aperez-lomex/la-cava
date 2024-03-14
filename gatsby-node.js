const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
      graphql(`
        {
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
						logo {
							file {
							url
							}
						}
						}
						slug
						fermentacion {
							raw
						} 
			        }
            }
		    },
        }
      `).then(result => {
        result.data.allContentfulVinos.edges.forEach(({ node }) => {
            console.log(node);
            createPage({
                path: node.slug,
                component: path.resolve(`./src/templates/wine.js`),
                context: {
                    slug: node.slug,
                    data: node
                },
            });
        });
        resolve();
      });
    });
  };