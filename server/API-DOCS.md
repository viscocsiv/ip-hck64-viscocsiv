# News API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `GET /products`
- `POST /carts`
- `GET /carts/:cartId`
- `POST /carts/:cartId/items`
- `PUT /articles/:id`
- `DELETE /articles/:id`

## 1. POST /login

Description:

- Authenticate user login and generate access token

Request:

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

## 2. GET /products

Description:

- Get the list of products from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Starbucks Coffee Variety Pack, 100% Arabica",
        "category": "coffee",
        "inStock": true,
        "price": 25495,
        "createdAt": "2023-11-15T08:12:58.386Z",
        "updatedAt": "2023-11-15T08:12:58.386Z"
    },
    {
        "id": 2,
        "name": "Ethical Bean Medium Dark Roast, Espresso",
        "category": "coffee",
        "inStock": true,
        "price": 27826,
        "createdAt": "2023-11-15T08:12:58.386Z",
        "updatedAt": "2023-11-15T08:12:58.386Z"
    }
    ...,
]
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

## 3. POST /orders

Description:

- Create new order

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- user

```json
{
  "id": "integer"
}
```

- body

```json
```

_Response (201 - Created)_

```json
{
    "created": "boolean",
    "OrderId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Title cannot be empty"
}
OR
{
    "message": "Content cannot be empty"
}
OR
{
    "message": "categoryId cannot be empty"
}
OR
{
    "message": "authorId cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

## 5. GET /articles/:id

Description:

- Get a detail of an article from database by id

Request:

- headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "article": {
    "id": 1,
    "title": "The Latest in Technology",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "imgUrl": "https://example.com/tech-image.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2023-11-03T03:03:55.765Z",
    "updatedAt": "2023-11-03T03:03:55.765Z"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error Not Found"
}
```

## 6. PUT /articles/:id

Description:

- Update an article from database by id

Request:

- headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

- body

```json
{
  "title": "string",
  "content": "text",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "updatedArticle": {
    "id": 10,
    "title": "Good Food",
    "content": "Experience the world's finest cuisines...",
    "imgUrl": "https://example.com/foody-image.jpg",
    "categoryId": 4,
    "authorId": 1,
    "createdAt": "2023-11-03T03:06:16.710Z",
    "updatedAt": "2023-11-03T03:19:24.266Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Title cannot be empty"
}
OR
{
    "message": "Content cannot be empty"
}
OR
{
    "message": "categoryId cannot be empty"
}
OR
{
    "message": "authorId cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error Not Found"
}
```

## 7. PATCH /articles/:id

Description:

- Attach an image file and update imgUrl of article data to database by id

Request:

- headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

- body

```json
{
  "imgUrl": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Image of article success to update"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation Errors"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error Not Found"
}
```

## 8. DELETE /articles/:id

Description:

- Delete an article from database by id

Request:

- headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Article success to delete"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error Not Found"
}
```

## 9. POST /categories

Description:

- Add a category to database

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "category": {
    "id": 6,
    "name": "Education",
    "updatedAt": "2023-11-03T03:25:29.839Z",
    "createdAt": "2023-11-03T03:25:29.839Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Category name cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

## 10. GET /categories

Description:

- Get the list of categories of an article from database

Request:

- headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Technology",
      "createdAt": "2023-11-03T03:03:55.758Z",
      "updatedAt": "2023-11-03T03:03:55.758Z"
    },
    {
      "id": 2,
      "name": "Science",
      "createdAt": "2023-11-03T03:03:55.758Z",
      "updatedAt": "2023-11-03T03:03:55.758Z"
    },
    {
      "id": 3,
      "name": "Travel",
      "createdAt": "2023-11-03T03:03:55.758Z",
      "updatedAt": "2023-11-03T03:03:55.758Z"
    }
    ...,
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

## 11. PUT /categories/:id

Description:

- Update a category from database by id

Request:

- headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

- body

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "updatedCategory": {
    "id": 6,
    "name": "Entertainment",
    "createdAt": "2023-11-03T03:25:29.839Z",
    "updatedAt": "2023-11-03T03:41:55.220Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Category name cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error Not Found"
}
```

## 12. DELETE /categories/:id

Description:

- Delete a category from database by id

Request:

- headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Category success to delete"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Invalid Token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error Not Found"
}
```

## 13. GET /pub/articles

Description:

- Get the list of articles from database

Request:

- query parameters

```json
{
  "page": "number",
  "filter": {
    "categoryId": "number"
  },
  "search": {
    "title": "number"
  },
  "sort": "createdAt",
  "direction": "desc"
}
```

_Response (200 - OK)_

```json
{
  "count": 10,
  "articles": [
    {
      "id": 1,
      "title": "Lorem Ipsum 1",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "imgUrl": "https://example.com/image1.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2023-11-03T12:18:45.801Z",
      "updatedAt": "2023-11-03T12:18:45.801Z",
      "User": {
        "id": 1,
        "email": "tantyo@example.com",
        "role": "Admin",
        "phoneNumber": "123-456-7890",
        "address": "123 Main St, City, Country",
        "createdAt": "2023-11-03T12:18:45.390Z",
        "updatedAt": "2023-11-03T12:18:45.390Z"
      }
    },
    {
      "id": 2,
      "title": "Lorem Ipsum 2",
      "content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      "imgUrl": "https://example.com/image2.jpg",
      "categoryId": 2,
      "authorId": 2,
      "createdAt": "2023-11-03T12:18:45.801Z",
      "updatedAt": "2023-11-03T12:18:45.801Z",
      "User": {
        "id": 2,
        "email": "wisnu@example.com",
        "role": "Staff",
        "phoneNumber": "987-654-3210",
        "address": "456 Elm St, Town",
        "createdAt": "2023-11-03T12:18:45.726Z",
        "updatedAt": "2023-11-03T12:18:45.726Z"
      }
    },
    {
      "id": 3,
      "title": "Lorem Ipsum 3",
      "content": "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
      "imgUrl": "https://example.com/image3.jpg",
      "categoryId": 3,
      "authorId": 1,
      "createdAt": "2023-11-03T12:18:45.801Z",
      "updatedAt": "2023-11-03T12:18:45.801Z",
      "User": {
        "id": 1,
        "email": "tantyo@example.com",
        "role": "Admin",
        "phoneNumber": "123-456-7890",
        "address": "123 Main St, City, Country",
        "createdAt": "2023-11-03T12:18:45.390Z",
        "updatedAt": "2023-11-03T12:18:45.390Z"
      }
    }
    ...,
  ]
}
```

## 14. GET /pub/articles/:id

Description:

- Get a detail of an article by id

Request:

- params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "title": "The Latest in Technology",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "imgUrl": "https://example.com/tech-image.jpg",
  "categoryId": 1,
  "authorId": 1
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
