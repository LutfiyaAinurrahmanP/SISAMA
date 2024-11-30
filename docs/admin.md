# Admin

## Register Admin API

Endpoint : POST /api/admin

Request Body :

```json
{
    "username" : "test username",
    "password" : "test password",
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : "test username",
    }
}
```

Response Body Error :

```json
{
    "errors" : "username already registered"
}
```

## Login Admin API

Endpoint : POST /api/admin/login

Headers :

- Authorization : Token

Request Body :

```json
{
    "username" : "test username",
    "password" : "test password"
}
```

Response Body Success :

```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error :

```json
{
    "errors" : "username or Password is wrong"
}
```

## Get Admin API

Headers :

- Authorization : Token

Endpoint : GET /api/admin/current

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "username" : "test username",
    }
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```

## Update Admin API

Headers :

- Authorization : Token

Endpoint : PATCH /api/admin/:adminId

Request Body :

```json
{
    "username" : "test username",
    "password" : "test password",
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "username" : "test username",
    }
}
```

Response Body Error :

```json
{
    "errors" : "Cannot update data"
}
```

## Remove Admin API

Headers :

- Authorization : Token

Endpoint : DELETE /api/admin/:adminId

Response Body Success :

```json
{
    "data" : "Successful deleted data"
}
```

Response Body Error :

```json
{
    "errors" : "Cannot delete data"
}
```

## Logout Admin API

Headers :

- Authorization : Token

Endpoint : DELETE /api/admin/logout

Response Body Success :

```json
{
    "data" : "Successful logout"
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```
