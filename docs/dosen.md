# Dosen

## Register Dosen API

Endpoint : POST /api/dosen

Request Body :

```json
{
    "nip" : "123",
    "password" : "test password",
    "nama" : "test nama",
    "email" : "test email",
    "jabatan" : "test jabatan"
}
```

Response Body Success :

```json
{
    "data" : {
        "nip" : "123",
        "nama" : "test nama",
        "email" : "test email",
        "jabatan" : "test jabatan"
    }
}
```

Response Body Error :

```json
{
    "errors" : "nip already registered"
}
```

## Login Dosen API

Endpoint : POST /api/dosen/login

Headers :

- Authorization : Token

Request Body :

```json
{
    "nip" : "123",
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
    "errors" : "nip or Password is wrong"
}
```

## Get Dosen API

Headers :

- Authorization : Token

Endpoint : GET /api/dosen/current

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "nip" : "123",
        "nama" : "test nama",
        "email" : "test email",
        "jabatan" : "test jabatan"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```

## Update dosen API

Headers :

- Authorization : Token

Endpoint : PATCH /api/dosen/:dosenId

Request Body :

```json
{
    "nip" : "123",
    "password" : "test password",
    "nama" : "test nama",
    "email" : "test email",
    "jabatan" : "test jabatan"
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "nip" : "123",
        "nama" : "test nama",
        "email" : "test email",
        "jabatan" : "test jabatan"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Cannot update data"
}
```

## Remove Dosen API

Headers :

- Authorization : Token

Endpoint : DELETE /api/dosen/:dosenId

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

## Logout Dosen API

Headers :

- Authorization : Token

Endpoint : DELETE /api/dosen/logout

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
