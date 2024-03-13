const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
      graphql(`
        {
            allContentfulVinos {
			    edges {
			        node {
				        slug
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
                },
            });
        });
        resolve();
      });
    });
  };