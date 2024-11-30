# Mata Kuliah

## Register Mata Kuliah API

Headers :

- Authorization : Token

Endpoint : POST /api/admin/matkul

Request Body :

```json
{
    "kode_mk" : "1",
    "nama_mk" : "nama matkul",
    "sks" : 1
}
```

Response Body Success :

```json
{
    "data" : {
        "kode_mk" : "1",
        "nama_mk" : "nama matkul",
        "sks" : 1
    }
}
```

Response Body Error :

```json
{
    "errors" : "code or name already registered"
}
```

## Get Mata Kuliah API

Headers :

- Authorization : Token

Endpoint : GET /api/admin/matkul/:matkulId

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "kode_mk" : "1",
        "nama_mk" : "nama matkul",
        "sks" : 1
    }
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```

## Get Many Mata Kuliah API

Headers :

- Authorization : Token

Endpoint : GET /api/admin/matkul

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "kode_mk" : "1",
        "nama_mk" : "nama  1",
        "sks" : 1
        },
        {
        "id" : 3,
        "kode_mk" : "3",
        "nama_mk" : "nama matkul 2",
        "sks" : 3
        }
    ]
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```

## Update Mata Kuliah API

Headers :

- Authorization : Token

Endpoint : PATCH /api/admin/matkul/:matkulId

Request Body :

```json
{
    "kode_mk" : "1",
    "nama_mk" : "nama matkul",
    "sks" : 1
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "kode_mk" : "1",
        "nama_mk" : "nama matkul",
        "sks" : 1
    }
}
```

Response Body Error :

```json
{
    "errors" : "Cannot update data"
}
```

## Remove Mata Kuliah API

Headers :

- Authorization : Token

Endpoint : DELETE /api/admin/matkul/:matkulId

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

## Search Mata Kuliah API

Headers :

- Authorization : Token

Query Params :

- kode_mk : Search with kode matkul
- nama_mk : Search with nama matkul

Endpoint : GET /api/admin/matkul

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "kode_mk" : "1",
        "nama_mk" : "nama matkul",
        "sks" : 1
        },
        {
        "id" : 2,
        "kode_mk" : "2",
        "nama_mk" : "nama matkul",
        "sks" : 2
        }
    ],
    "paging": {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```
