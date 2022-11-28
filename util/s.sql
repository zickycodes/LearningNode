create table products(
    id int primary key not null auto_increment,
    title varchar(255) not null,
    price decimal(10,2) not null,
    description text not null,
    imageUrl varchar(255) not null
)

insert into products(title, price, description, imageUrl),
values("Half of a yellow sun", 45, "Great book on war, love, and family ties", "https://c7.alamy.com/comp/2JJAMN8/rosemawle-half-of-a-yellow-sun-2013-2JJAMN8.jpg");






[
  [
    {
      id: 1,
      title: 'Half of a yellow sun',
      price: '45.00',
      description: 'Great book on war, love, and family ties',
      imageUrl: 'https://c7.alamy.com/comp/2JJAMN8/rosemawle-half-of-a-yellow-sun-2013-2JJAMN8.jpg'
    }
  ],
  [
    ColumnDefinition {
      _buf: <Buffer 01 00 00 01 05 37 00 00 02 03 64 65 66 0d 6c 65 61 72 6e 69 6e 67 5f 6e 6f 64 65 08 70 72 6f 64 75 63 74 73 08 70 72 6f 64 75 63 74 73 02 69 64 02 69 ... 470 more bytes>,
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 10,
      _schemaLength: 13,
      _schemaStart: 14,
      _tableLength: 8,
      _tableStart: 28,
      _orgTableLength: 8,
      _orgTableStart: 37,
      _orgNameLength: 2,
      _orgNameStart: 49,
      characterSet: 63,
      encoding: 'binary',
      name: 'id',
      columnLength: 11,
      columnType: 3,
      flags: 16899,
      decimals: 0
    },
    ColumnDefinition {
      _buf: <Buffer 01 00 00 01 05 37 00 00 02 03 64 65 66 0d 6c 65 61 72 6e 69 6e 67 5f 6e 6f 64 65 08 70 72 6f 64 75 63 74 73 08 70 72 6f 64 75 63 74 73 02 69 64 02 69 ... 470 more bytes>,
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 69,
      _schemaLength: 13,
      _schemaStart: 73,
      _tableLength: 8,
      _tableStart: 87,
      _orgTableLength: 8,
      _orgTableStart: 96,
      _orgNameLength: 5,
      _orgNameStart: 111,
      characterSet: 224,
      encoding: 'utf8',
      name: 'title',
      columnLength: 1020,
      columnType: 253,
      flags: 4097,
      decimals: 0
    },
    ColumnDefinition {
      _buf: <Buffer 01 00 00 01 05 37 00 00 02 03 64 65 66 0d 6c 65 61 72 6e 69 6e 67 5f 6e 6f 64 65 08 70 72 6f 64 75 63 74 73 08 70 72 6f 64 75 63 74 73 02 69 64 02 69 ... 470 more bytes>,
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 134,
      _schemaLength: 13,
      _schemaStart: 138,
      _tableLength: 8,
      _tableStart: 152,
      _orgTableLength: 8,
      _orgTableStart: 161,
      _orgNameLength: 5,
      _orgNameStart: 176,
      characterSet: 63,
      encoding: 'binary',
      name: 'price',
      columnLength: 12,
      columnType: 246,
      flags: 4097,
      decimals: 2
    },
    ColumnDefinition {
      _buf: <Buffer 01 00 00 01 05 37 00 00 02 03 64 65 66 0d 6c 65 61 72 6e 69 6e 67 5f 6e 6f 64 65 08 70 72 6f 64 75 63 74 73 08 70 72 6f 64 75 63 74 73 02 69 64 02 69 ... 470 more bytes>,
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 199,
      _schemaLength: 13,
      _schemaStart: 203,
      _tableLength: 8,
      _tableStart: 217,
      _orgTableLength: 8,
      _orgTableStart: 226,
      _orgNameLength: 11,
      _orgNameStart: 247,
      characterSet: 224,
      encoding: 'utf8',
      name: 'description',
      columnLength: 262140,
      columnType: 252,
      flags: 4113,
      decimals: 0
    },
    ColumnDefinition {
      _buf: <Buffer 01 00 00 01 05 37 00 00 02 03 64 65 66 0d 6c 65 61 72 6e 69 6e 67 5f 6e 6f 64 65 08 70 72 6f 64 75 63 74 73 08 70 72 6f 64 75 63 74 73 02 69 64 02 69 ... 470 more bytes>,
      _clientEncoding: 'utf8',
      _catalogLength: 3,
      _catalogStart: 276,
      _schemaLength: 13,
      _schemaStart: 280,
      _tableLength: 8,
      _tableStart: 294,
      _orgTableLength: 8,
      _orgTableStart: 303,
      _orgNameLength: 8,
      _orgNameStart: 321,
      characterSet: 224,
      encoding: 'utf8',
      name: 'imageUrl',
      columnLength: 1020,
      columnType: 253,
      flags: 4097,
      decimals: 0
    }
  ]
]