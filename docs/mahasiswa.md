# Mahasiswa

## Register Mahasiswa API

Endpoint : POST /api/mahasiswa

Request Body :

```json
{
    "nim" : "123",
    "password" : "test password",
    "nama" : "test nama",
    "prodi" : "test prodi",
    "angkatan" : "test angkatan",
    "email" : "test email"
}
```

Response Body Success :

```json
{
    "data" : {
        "nim" : "123",
        "nama" : "test nama",
        "prodi" : "test prodi",
        "angkatan" : "test angkatan",
        "email" : "test email"
    }
}
```

Response Body Error :

```json
{
    "errors" : "NIM already registered"
}
```

## Login Mahasiswa API

Endpoint : POST /api/mahasiswa/login

Headers :

- Authorization : Token

Request Body :

```json
{
    "nim" : "123",
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
    "errors" : "NIM or Password is wrong"
}
```

## Get Mahasiswa API

Headers :

- Authorization : Token

Endpoint : GET /api/mahasiswa/current

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "nim" : "123",
        "nama" : "test nama",
        "prodi" : "test prodi",
        "angkatan" : "test angkatan",
        "email" : "test email"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```

## Update Mahasiswa API

Headers :

- Authorization : Token

Endpoint : PATCH /api/mahasiswa/:mahasiswaId

Request Body :

```json
{
    "nim" : "123",
    "password" : "test password",
    "nama" : "test nama",
    "prodi" : "test prodi",
    "angkatan" : "test angkatan",
    "email" : "test email"
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "nim" : "123",
        "nama" : "test nama",
        "prodi" : "test prodi",
        "angkatan" : "test angkatan",
        "email" : "test email"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Cannot update data"
}
```

## Remove Mahasiswa API

Headers :

- Authorization : Token

Endpoint : DELETE /api/mahasiswa/:mahasiswaId

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

## Logout Mahasiswa API

Headers :

- Authorization : Token

Endpoint : DELETE /api/mahasiswa/logout/:mahasiswaId

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
