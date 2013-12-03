mysqlite.js
===========

sqlite db server talking mysql protocol, all native js. Uses [mysql2](https://github.com/sidorares/node-mysql2) as mysql wire protocol server and [emscripten-compiled sqlite](https://github.com/kripken/sql.js) as client to sqlite db.

## Installation

    npm install -g mysqlite.js

## Usage

    mysqlite mysql-listen-port path-to-sqlite-db

## Example

```sh
> node proxy.js 3307 db/development.sqlite &
> mysql -h 127.0.0.1 -P 3307
Welcome to the MySQL monitor.  Commands end with ; or \g.

Your MySQL connection id is 1
Server version: node.js rocks

Copyright (c) 2000, 2011, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> SELECT * FROM employees where designation="TECH";
+----+---------+-------------+---------+------------+--------+------------+------+
| id | name    | designation | manager | hired_on   | salary | commission | dept |
+----+---------+-------------+---------+------------+--------+------------+------+
| 5  | LINCOLN | TECH        | 6       | 06-23-1994 | 22500  | 1400.0     | 4    |
| 7  | POLK    | TECH        | 6       | 09-22-1997 | 25000  | NULL       | 4    |
+----+---------+-------------+---------+------------+--------+------------+------+
2 rows in set (0.08 sec)

mysql>
```


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/sidorares/mysqlite.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

