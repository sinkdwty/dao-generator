function formatDAO(input){
  var regex = /\(.+?\)/g
  var splited = input.split(regex)
  var matched = input.match(regex)
  if(!splited || !matched){
    return input
  }
  var tableName = splited[0]
  var fieldsString = matched[0].substring(1, matched[0].length - 1)
  var fields = fieldsString.split(/,/g)
  if(fields){
    for(key in fields){
      fields[key] = fields[key].trim()
    }
  }else{
    fields = fieldsString.trim()
  }
  var formatedString =
  'module.exports = {\n' +
  '  insert: function(data, callback) {\n' +
  '    var statement = "insert into ' + tableName + ' set ?";\n' +
  '    pool.query(statement, data, function(err, rows, fields) {\n' +
  '      if (err) throw err;\n' +
  '      callback(err, rows, fields);\n' +
  '    });\n' +
  '  },\n' +
  '  update: function(data, id, callback) {\n' +
  '    var statement = "update ' + tableName + ' set ? where ' + fields[0] + ' = ?";\n' +
  '    pool.query(statement, [data, id], function(err, rows, fields) {\n' +
  '      if (err) throw err;\n' +
  '      callback(err, rows, fields);\n' +
  '    });\n' +
  '  },\n' +
  '  delete: function(id, callback) {\n' +
  '    var statement = "delete from ' + tableName + ' where ' + fields[0] + ' = ?";\n' +
  '    pool.query(statement, [id], function(err, rows, fields) {\n' +
  '      if (err) throw err;\n' +
  '      callback(err, rows, fields);\n' +
  '    });\n' +
  '  },\n'
  for(key in fields){
    var field = fields[key]
    var functionName = 'findBy' + field.substring(0, 1).toUpperCase() + field.substring(1)
    formatedString +=
  '  ' + functionName + ': function(' + field + ', callback) {\n' +
  '    var statement = "select * from ' + tableName + ' where ' + field + ' = ?";\n' +
  '    pool.query(statement, [' + field + '], function(err, rows, fields) {\n' +
  '      if (err) throw err;\n' +
  '      callback(err, rows, fields);\n' +
  '    });\n' +
  '  }'
    if(key < fields.length - 1){
      formatedString += ",\n"
    }else{
      formatedString += "\n"
    }
  }
  formatedString +=
  '};\n'
  return formatedString
}
module.exports = function(){
  var textEditor = atom.workspace.getActiveTextEditor()
  if(textEditor == ''){
    return
  }
  var selectedText = textEditor.getSelectedText()
  var textToInsert = ""
  textToInsert = formatDAO(selectedText)
  textEditor.insertText(textToInsert, {select: true, autoIndent: true, autoIndentNewline: true, autoDecreaseIndent: true})
}
