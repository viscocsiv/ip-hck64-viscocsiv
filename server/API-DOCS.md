# News API Documentation

## Endpoints :

List of available endpoints:

Without authentication:

- `POST /login`
- `POST /auth/google/callback`

Using authentication

- `GET /products`
- `POST /orders`

Using authorization

- `GET /orders/:OrderId`
- `POST /orders/:OrderId/carts`
- `GET /orders/:OrderId/carts`
- `GET /orders/:OrderId/carts/:CartId`
- `PATCH /orders/:OrderId/carts/:CartId`
- `DELETE /orders/:OrderId/carts/:CartId`
- `POST /payment/midtrans/token`

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

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "userId": "integer"
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

## 2. POST /auth/google/callback

Description:

- Authenticate user login and generate access token using google account

Request:

- body

```json
{
  "code": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "userId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid Token"
}
```

## 3. GET /products

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

## 4. POST /orders

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

_Response (201 - Created)_

```json
{
  "created": "boolean",
  "OrderId": "integer",
  "UserId": "integer"
}
```

## 5. GET /orders/:OrderId

Description:

- Fetch order detail from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "OrderId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": "boolean",
  "totalPrice": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid params"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 6. POST /orders/:OrderId/carts

Description:

- Add product to the cart

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- user:

```json
{
  "id": "integer"
}
```

- params:

```json
{
  "OrderId": "integer"
}
```

- body:

```json
{
  "ProductId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "totalPrice": 25495,
  "carts": [
    {
      "id": 508,
      "OrderId": 206,
      "ProductId": 1,
      "UserId": 2,
      "quantity": 1,
      "createdAt": "2023-11-23T09:09:06.057Z",
      "updatedAt": "2023-11-23T09:09:06.057Z",
      "Product": {
        "id": 1,
        "name": "Starbucks Coffee Variety Pack, 100% Arabica",
        "category": "coffee",
        "inStock": true,
        "price": 25495,
        "createdAt": "2023-11-15T08:12:58.386Z",
        "updatedAt": "2023-11-15T08:12:58.386Z"
      }
    }
  ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid params"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 7. GET /orders/:OrderId/carts

Description:

- Fetch carts with the same order id from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "OrderId": "integer"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 508,
        "OrderId": 206,
        "ProductId": 1,
        "UserId": 2,
        "quantity": 1,
        "createdAt": "2023-11-23T09:09:06.057Z",
        "updatedAt": "2023-11-23T09:09:06.057Z",
        "Product": {
            "id": 1,
            "name": "Starbucks Coffee Variety Pack, 100% Arabica",
            "category": "coffee",
            "inStock": true,
            "price": 25495,
            "createdAt": "2023-11-15T08:12:58.386Z",
            "updatedAt": "2023-11-15T08:12:58.386Z"
        }
    }
    ...,
]
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid params"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 8. GET /orders/:OrderId/carts/:CartId

Description:

- Fetch cart detail

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```json
{
  "CartId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 508,
  "OrderId": 206,
  "ProductId": 1,
  "UserId": 2,
  "quantity": 1,
  "createdAt": "2023-11-23T09:09:06.057Z",
  "updatedAt": "2023-11-23T09:09:06.057Z",
  "Product": {
    "id": 1,
    "name": "Starbucks Coffee Variety Pack, 100% Arabica",
    "category": "coffee",
    "inStock": true,
    "price": 25495,
    "createdAt": "2023-11-15T08:12:58.386Z",
    "updatedAt": "2023-11-15T08:12:58.386Z"
  },
  "Order": {
    "id": 206,
    "totalPrice": 25495,
    "createdAt": "2023-11-18T23:05:41.843Z",
    "updatedAt": "2023-11-23T09:09:06.075Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid params"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 9. PATCH /orders/:OrderId/carts/:CartId

Description:

- Increase or decrease quantity of the product in cart

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "CartId": "integer",
  "OrderId": "integer"
}
```

- body:

```json
{
  "increment": "increment"
}
or
{
  "decrement": "decrement"
}
```

_Response (200 - OK)_

```json
{
    "totalPrice": 53321,
    "carts": [
        {
            "id": 493,
            "OrderId": 204,
            "ProductId": 1,
            "UserId": 1,
            "quantity": 12,
            "createdAt": "2023-11-18T22:14:12.637Z",
            "updatedAt": "2023-11-18T22:15:17.658Z",
            "Product": {
                "id": 1,
                "name": "Starbucks Coffee Variety Pack, 100% Arabica",
                "category": "coffee",
                "inStock": true,
                "price": 25495,
                "createdAt": "2023-11-15T08:12:58.386Z",
                "updatedAt": "2023-11-15T08:12:58.386Z"
            }
        },
        {
            "id": 494,
            "OrderId": 204,
            "ProductId": 2,
            "UserId": 1,
            "quantity": 12,
            "createdAt": "2023-11-18T22:14:13.294Z",
            "updatedAt": "2023-11-18T22:15:15.405Z",
            "Product": {
                "id": 2,
                "name": "Ethical Bean Medium Dark Roast, Espresso",
                "category": "coffee",
                "inStock": true,
                "price": 27826,
                "createdAt": "2023-11-15T08:12:58.386Z",
                "updatedAt": "2023-11-15T08:12:58.386Z"
            }
        }
        ...,
    ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid params"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## 10. DELETE /orders/:OrderId/carts/:CartId

Description:

- Delete items from cart

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "CartId": "integer",
  "OrderId": "integer"
}
```

Response:

```json
{
  "totalPrice": 25495,
  "carts": [
    {
      "id": 493,
      "OrderId": 204,
      "ProductId": 1,
      "UserId": 1,
      "quantity": 12,
      "createdAt": "2023-11-18T22:14:12.637Z",
      "updatedAt": "2023-11-18T22:15:17.658Z",
      "Product": {
        "id": 1,
        "name": "Starbucks Coffee Variety Pack, 100% Arabica",
        "category": "coffee",
        "inStock": true,
        "price": 25495,
        "createdAt": "2023-11-15T08:12:58.386Z",
        "updatedAt": "2023-11-15T08:12:58.386Z"
      }
    }
  ]
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid params"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## Global Error

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

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
