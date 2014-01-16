/**
 * Created by chriswillingham on 1/15/14.
 */
exports.root = '';
exports.routes = {
  'get': main
}

function main(req, res){
  console.log(TestModel);
  res.send('hello world');

}