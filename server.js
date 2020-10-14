const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
  
} = require('graphql')
const app = express()

const categories = [
	{ id: 1, name: 'car' },
	{ id: 2, name: 'jeep' },
	{ id: 3, name: 'van' }
]

const products = [
	{ id: 1, name: 'Allion', brand:"Toyota", details:"very reliable and comfortable", image:"", price:"2000000", productCategory: "car" },
	{ id: 2, name: 'Aqua', brand:"Toyota", details:"very reliable and comfortable", image:"", price:"1400000", productCategory: "car" },
	{ id: 3, name: 'Grace', brand:"Honda", details:"very reliable and comfortable", image:"", price:"1800000", productCategory: "car" },
	{ id: 4, name: 'Jazz', brand:"Honda", details:"very reliable and comfortable", image:"", price:"1500000", productCategory: "car" },
	{ id: 5, name: 'Rush', brand:"Toyota", details:"very reliable and comfortable", image:"", price:"3800000", productCategory: "jeep" },
	{ id: 6, name: 'X-Trail', brand:"Nissan", details:"very reliable and comfortable", image:"", price:"4000000", productCategory: "jeep" },
	{ id: 7, name: 'CRV', brand:"Honda", details:"very reliable and comfortable", image:"", price:"4100000", productCategory: "jeep" },
	{ id: 8, name: 'Ace', brand:"Tata", details:"Mini pickup van", image:"", price:"1000000", productCategory: "van" }
]

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'This represents a product of a category',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      brand: { type: GraphQLNonNull(GraphQLString) },
      details: { type: GraphQLNonNull(GraphQLString) },
      image: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLString) },
      productCategory: { type: GraphQLNonNull(GraphQLString) },
    })
  })

  const CategoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'This represents a category of the products',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },  
      name: { type: GraphQLNonNull(GraphQLString) },
      products: {
        type: new GraphQLList(ProductType),
        resolve: (category) => {
          return products.filter(product => product.productCategory === category.name)
        }
      }
    })
  })

  const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      product: {
        type: ProductType,
        description: 'A Single Product',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => products.find(product => product.id === args.id)
      },
      products: {
        type: new GraphQLList(ProductType),
        description: 'List of All Products',
        resolve: () => products
      },
      categories: {
        type: new GraphQLList(CategoryType),
        description: 'List of All Categories',
        resolve: () => categories
      },
      category: {
        type: CategoryType,
        description: 'A Single Category',
        args: {
          id: { type: GraphQLString }
        },
        resolve: (parent, args) => categories.find(category => category.id === args.id)
      }
    })
  })

  const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addProduct: {
        type: ProductType,
        description: 'Add a product',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          brand: { type: GraphQLNonNull(GraphQLString) },
          details: { type: GraphQLNonNull(GraphQLString) },
          image: { type: GraphQLNonNull(GraphQLString) },
          price: { type: GraphQLNonNull(GraphQLString) },
          productCategory: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => {
          const product = { id: products.length + 1, name: args.name, brand: args.brand, details: args.details, image: args.image, price: args.price, productCategory: args.productCategory }
          products.push(product)
          return product
        }
      },
      addCategory: {
        type: CategoryType,
        description: 'Add a category',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => {
          const category = { id: categories.length + 1, name: args.name }
          categories.push(category)
          return category
        }
      },

      updateProduct: {
        type: ProductType,
        description: 'Update a product',
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) },  
          name: { type: GraphQLNonNull(GraphQLString) },
          brand: { type: GraphQLNonNull(GraphQLString) },
          details: { type: GraphQLNonNull(GraphQLString) },
          image: { type: GraphQLNonNull(GraphQLString) },
          price: { type: GraphQLNonNull(GraphQLString) },
          productCategory: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => {
        
          const updatedProductIndex = products.findIndex(product => product.id === args.id)
          const updatedProduct = {id: args.id, name: args.name, brand: args.brand, details: args.details, image: args.image, price: args.price, productCategory: args.productCategory }
          products[updatedProductIndex] = updatedProduct
        
          return updatedProduct
        }
      },

      updateCategory: {
        type: CategoryType,
        description: 'Update a category',
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) },  
          name: { type: GraphQLNonNull(GraphQLString) },         
        },
        resolve: (parent, args) => {
        
          const updatedCategoryIndex = categories.findIndex(category => category.id === args.id)
          const updatedCategory = {id: args.id, name: args.name }
          categories[updatedCategoryIndex] = updatedCategory
        
          return updatedCategory
        }
      },

      deleteCategory: {
        type: CategoryType,
        description: 'delete a category',
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) }                   
        },
        resolve: (parent, args) => {
        
          const deletedCategoryIndex = categories.findIndex(category => category.id === args.id);
          const deletedCategory = deletedCategoryIndex;
          delete categories[deletedCategoryIndex];
          
        
          return deletedCategory
        }
      },

      deleteProduct: {
        type: CategoryType,
        description: 'delete a product',
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) }                   
        },
        resolve: (parent, args) => {
        
          const deletedProductIndex = products.findIndex(product => product.id === args.id);
          const deletedProduct = deletedProductIndex;
          delete products[deletedProductIndex];
          
        
          return deletedProduct
        }
      }
    })
  })

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(5000., () => console.log('server is running'))