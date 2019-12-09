const path = require('path');


const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  // Consultas para los nodos que se usaran en la creacion de paginas

  resolve(
    graphql(request)
      .then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result;
      })
  )
});

// Implement the Gatsby API "createPages". This is called once the
// data layer is boostrapped to let plugins create pages from data.
// Implementa el api de Gatsby "createPages". Este es llamado una vez
// que el dato es accedido por el plugin para crear las paginas desde los datos

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getArticles = makeRequest(graphql, `
  {
    allStrapiArticle {
      edges {
        node {
          id
        }
      }
    }
  }
  `).then(result => {
    // Creates pages for each article
    // Crea la pagina por cada articulo
    result.data.allStrapiArticle.edges.forEach(({node}) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });

  const getAuthors = makeRequest(graphql, `
  {
    allStrapiUser {
      edges {
        node {
          id
        }
      }
    }
  }
  `).then(result => {
    // Create pages for each user
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/author.js`),
        context: {
          id: node.id
        }
      })
    })
  })

  // Query for articles nodes to user in creating pages
  // Consulta para los nodos de articulos para usar en la creacion de paginas
  return ([
    getArticles,
    getAuthors,
  ]);
}