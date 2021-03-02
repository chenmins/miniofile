const Minio = require('minio');
const port = parseInt(process.env.MINIO_PORT);
var useSSL = false;
if (process.env.MINIO_USE_SSL == "true") {
	useSSL = true
}
var client = new Minio.Client({
    endPoint: process.env.MINIO_HOST,
    port: port,
    useSSL: useSSL,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
})
// var client = new Minio.Client({
//     endPoint: "test-minio.55dashuo.com",
//     port: 80,
//     useSSL: true,
//     accessKey: 'AKIAIOSFODNN7EXAMPLE',
//     secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
// })

const server = require('express')()
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});


server.get('/api/minio/presignedUrl', (req, res) => {
	// client.presignedPutObject(process.env.MINIO_BUCKET, req.query.name, (err, url) => {
    client.presignedPutObject(req.query.bucket, req.query.name, (err, url) => {
        if (err) throw err
		res.header('Content-Type', 'text/plain');
        let a = url.toString();
        a = a.replace("https://","//");
        a = a.replace("http://","//");
        res.end(a)
    })
})

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.get('/jquery-1.10.2.js', (req, res) => {
    res.sendFile(__dirname + '/jquery-1.10.2.js');
})

server.listen(8080)
