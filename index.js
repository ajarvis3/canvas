import express from 'express';

const app = express();

app.use(express.static(__dirname + '/dist'))

if (require.main === module) {
    const PORT = process.env.PORT || 9000;
    app.listen(PORT);
    console.log("Listening on " + PORT);
}
