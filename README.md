# CRUD-Application-with-Graphql-and-Express.js

#Run the project in local

1. Open the terminal (command line)
2. select the directory of the project folder in terminal
3. Type 'npm i express express-graphql graphql' without '' in the terminal and press enter. Then it will install some packages
4. After finishing previous installation type 'npm i --save-dev nodemon' without '' and press enter. Then it will install nodemon
5. After finishing previous part type 'npm run devStart' in the terminal and press enter. This will run the server and you will see server is running in the terminal 
6. Now type localhost:5000/graphql in the browser and it will open graphiql interface.
7. Check with the queries bellow by typing the queries one by one in the left column in graphiql interface and it will show the output in the right column.

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
