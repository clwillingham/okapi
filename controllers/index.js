/**
 * Created by chriswillingham on 1/15/14.
 */
exports.root = '/admin';
exports.routes = {
  'get test': main
}

function main(req, res){
  res.send('hello world');
}