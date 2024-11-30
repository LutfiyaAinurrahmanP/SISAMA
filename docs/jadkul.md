# Jadwal Kuliah

## Register Jadwal Kuliah API

Headers :

- Authorization : Token

Endpoint : POST /api/admin/jadkul

Request Body :

```json
{
    "mata_kuliah_id" : "123",
    "dosen_id" : "123",
    "hari" : "senin",
    "jam_mulai" : "13:00",
    "jam_selesai" : "15:00",
    "ruangan" : "G.I 7.2"
}
```

Response Body Success :

```json
{
    "data" : {
        "mata_kuliah_id" : "123",
        "dosen_id" : "123",
        "hari" : "senin",
        "jam_mulai" : "13:00",
        "jam_selesai" : "15:00",
        "ruangan" : "G.I 7.2"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Class is full"
}
```

## Get Jadwal Kuliah API

Headers :

- Authorization : Token

Endpoint : GET /api/admin/jadkul/:jadkulId

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "mata_kuliah_id" : "123",
        "dosen_id" : "123",
        "hari" : "senin",
        "jam_mulai" : "13:00",
        "jam_selesai" : "15:00",
        "ruangan" : "G.I 7.2"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```

## Get Many Jadwal Kuliah API

Headers :

- Authorization : Token

Endpoint : GET /api/admin/jadkul

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "mata_kuliah_id" : "123",
        "dosen_id" : "123",
        "hari" : "senin",
        "jam_mulai" : "13:00",
        "jam_selesai" : "15:00",
        "ruangan" : "G.I 7.2"
        },
        {
        "id" : 2,
        "mata_kuliah_id" : "123",
        "dosen_id" : "123",
        "hari" : "senin",
        "jam_mulai" : "13:00",
        "jam_selesai" : "15:00",
        "ruangan" : "G.I 7.2"
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

## Update Jadwal Kuliah API

Headers :

- Authorization : Token

Endpoint : PATCH /api/admin/jadkul/:jadkulId

Request Body :

```json
{
    "mata_kuliah_id" : "123",
    "dosen_id" : "123",
    "hari" : "senin",
    "jam_mulai" : "13:00",
    "jam_selesai" : "15:00",
    "ruangan" : "G.I 7.2"
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "mata_kuliah_id" : "123",
        "dosen_id" : "123",
        "hari" : "senin",
        "jam_mulai" : "13:00",
        "jam_selesai" : "15:00",
        "ruangan" : "G.I 7.2"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Cannot update data"
}
```

## Search Jadwal Kuliah API

Headers :

- Authorization : Token

Query Params :

- id : Search with kode id
- hari : Search with kode hari
- jam_mulai : Search with kode jam_mulai
- ruangan : Search with kode ruangan

Endpoint : GET /api/admin/jadkul

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "mata_kuliah_id" : "123",
        "dosen_id" : "123",
        "hari" : "senin",
        "jam_mulai" : "13:00",
        "jam_selesai" : "15:00",
        "ruangan" : "G.I 7.2"
        },
        {
        "id" : 2,
        "mata_kuliah_id" : "321",
        "dosen_id" : "321",
        "hari" : "senin",
        "jam_mulai" : "13:00",
        "jam_selesai" : "15:00",
        "ruangan" : "G.I 7.2"
        }
    ],
    "paging": {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```

## Remove Jadwal Kuliah API

Headers :

- Authorization : Token

Endpoint : DELETE /api/admin/jadkul/:jadkulId

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
