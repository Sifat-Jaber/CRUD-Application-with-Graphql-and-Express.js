# CRUD-Application-with-Graphql-and-Express.js

1. Run the server.js using 'npm run devStart' command.
2. Type localhost:5000/graphql in the browser and it will open graphiql interface.
3. Check with the queries bellow.

Note: Some demo data has been added inside the code for query

#Queries

1. Product List query

{
  products{
    id
    name
    brand
    details
    image
    productCategory
    price
  }
}

2.Category list query

{
  categories{
    id
    name
    
  }
}

3.Add a category

mutation{
  addCategory(name:"motorcycle"){
    id
    name
    
  }
}

4. Add a product

mutation{
  addProduct(name:"FZS", brand:"Yamaha", details:"good", image:"", price:"200000", productCategory:"motorcycle"){
    id
    name
    brand
    details
    image
    productCategory
    price
    
  }
}

5. Update a category

mutation{
  updateCategory(id:4,name:"bike"){
    id
    name
    
  }
}

6. Update a product

mutation{
  updateProduct(id: 9, name:"Fazer", brand:"Yamaha", details:"very good", image:"", price:"200000", productCategory:"bike"){
    id
    name
    brand
    details
    image
    productCategory
    price
    
  }
}

7. Delete a category

mutation{
  deleteCategory(id: 4){
    id
    name
    
  }
}

8. Delete a product

mutation{
  deleteProduct(id: 9){
    id
    name
    
  }
}
