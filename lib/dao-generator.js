exports = module.exports = {}
exports.activate = function(state){
  console.log("DAO generator activate")
  atom.workspaceView.command("dao-genarater:generate", require('./generate'))
}
exports.deactivate = function(){

}
exports.serialize = function(){

}
