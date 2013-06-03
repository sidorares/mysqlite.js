#!/usr/bin/env node

var mysql = require('mysql2');
var sqlite = require('node-sqlite-purejs');

var dbPath = process.argv[3];
function  columnsFor(row) {
  res = [];
  for (var fieldName in row) {
    res.push({
        catalog: 'def',
        schema: '',
        table: '',
        orgTable: '',
        name: fieldName,
        orgName: '',
        characterSet: 63,
        columnType: 253,
        columnLength: 100,
        flags: 1,
        decimals: 31
    });
  }
  return res;
}

var fixtures = require('./mysql_std.json');
function respondWith(conn, result) {
        if (result.length === 0)
          return conn.writeEof();
        conn.writeColumns(columnsFor(result[0]));
        result.forEach(function(row) {
          var arrayRow = [];
          for(var name in row) {
            arrayRow.push(row[name]);
          }
          conn.writeTextRow(arrayRow);
        });
        conn.writeEof();
}

var id = 0;
var server = mysql.createServer();
server.on('connection', function(conn) {
  sqlite.open(dbPath, {}, function(err, db) {
    conn.serverHandshake({
      protocolVersion: 10,
      serverVersion: 'node.js rocks',
      connectionId: id++,
      statusFlags: 2,
      characterSet: 8,
      capabilityFlags: 0xffffff - 32
    });
    conn.on('query', function(sql) {
      console.log(sql);
      var staticResult = fixtures[sql.toLowerCase()];
      if (staticResult) {
        return respondWith(conn, staticResult);
      }
      db.exec(sql, function(err, result) {
        if (err) {
          console.log(err);
          return conn.writeError({ code: 1064, message: err});
        }
        respondWith(conn, result);
     });
    });
  });
});
server.listen(process.argv[2]);
