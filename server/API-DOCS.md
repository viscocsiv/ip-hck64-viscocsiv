# News API Documentation

## Endpoints :

List of available endpoints:

Without authentication:
- `POST /login`
- `POST /auth/google/callback`

Using authentication
- `GET /products`
- `POST /orders`
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

_Response (201 - Created)_

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

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

## 2. POST /auth/google/callback

Description:

- Authenticate user login using google account and generate access token

Request:

- body

```json
{
  "code": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string"
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

- body

```json
```

_Response (201 - Created)_

```json
{
    "created": "boolean",
    "OrderId": "integer",
    "UserId": "integer"
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


## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
