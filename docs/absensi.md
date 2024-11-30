# Absensi

## Register Absensi API

Headers :

- Authorization : Token

Endpoint : POST /api/mahasiswa/absensi

Request Body :

```json
{
    "jadwal_id" : 123,
    "mahasiswa_id" : 12,
    "tanggal" : "2024-11-30",
    "status" : "hadir"
}
```

Response Body Success :

```json
{
    "data" : {
        "jadwal_id" : 123,
        "mahasiswa_id" : 12,
        "tanggal" : "2024-11-30",
        "status" : "hadir"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Cant submit absen"
}
```

## Get Absensi API

Headers :

- Authorization : Token

Endpoint : GET /api/mahasiswa/absensi/:absensiId

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "jadwal_id" : 123,
        "mahasiswa_id" : 12,
        "tanggal" : "2024-11-30",
        "status" : "hadir"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Absensi with the given ID not found"
}
```

## Get Many Absensi API

Headers :

- Authorization : Token

Query Params :

- tanggal : Search with kode tanggal

Endpoint : GET /api/mahasiswa/absensi

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "jadwal_id" : 123,
        "mahasiswa_id" : 12,
        "tanggal" : "2024-11-30",
        "status" : "hadir"
        },
        {
        "id" : 2,
        "jadwal_id" : 123,
        "mahasiswa_id" : 12,
        "tanggal" : "2024-11-30",
        "status" : "hadir"
        }
    ],
    "paging": {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    } 
}
```

Response Body Error :

```json
{
    "errors" : "Unauthorized"
}
```

## Update Absensi API

Headers :

- Authorization : Token

Endpoint : PATCH /api/mahasiswa/absensi/:absensiId

Request Body :

```json
{
    "jadwal_id" : 123,
    "mahasiswa_id" : 12,
    "tanggal" : "2024-11-30",
    "status" : "hadir"
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "jadwal_id" : 123,
        "mahasiswa_id" : 12,
        "tanggal" : "2024-11-30",
        "status" : "hadir"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Cannot update data"
}
```

## Search Absensi API

Headers :

- Authorization : Token

Query Params :

- id : Search with kode id
- tanggal : Search with kode tanggal
- status : Search with kode status

Endpoint : GET /api/mahasiswa/absensi

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "jadwal_id" : 123,
        "mahasiswa_id" : 12,
        "tanggal" : "2024-11-30",
        "status" : "hadir"
        },
        {
        "id" : 2,
        "jadwal_id" : 123,
        "mahasiswa_id" : 12,
        "tanggal" : "2024-11-30",
        "status" : "hadir"
        }
    ],
    "paging": {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```
