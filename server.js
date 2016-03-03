var restify = require('restify');
var spawn   = require('child_process').spawn;
var crypto  = require('crypto');

var server  = restify.createServer();

var key     = 'amazingkey'; // secret key of the webhook
var port    = 8081; // port

server.use(restify.bodyParser());

server.post('/push', function(req, res, next){
    console.log("REQUEST RECEIVED");
    var hash = "sha1=" + crypto.createHmac('sha1', key).update(JSON.stringify(req.body)).digest('hex');

    if(hash != req.header('X-Hub-Signature')){
        console.log("INVALID KEY");
        res.json(404, {error: 'invalid key'});
        return next();
    }

    console.log("running hook.sh")
    var deploySh = spawn('sh', ['hook.sh']);
    deploySh.stdout.on('data', function(data){
        var buff = new Buffer(data);
        console.log(buff.toString('utf-8'));
    });
    res.send({result: 1, hash: hash});
    return next();
});

server.listen(port, function(){
    console.log("Server Listening at" + 8081);
});
