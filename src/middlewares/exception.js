export default (app) => {

    app.use((error, req, res, next) => {
        console.log(`Error ${error.status} : ${error.message}`);
        if (error.status === 401) {
            return res.status(401).send({error : 'Unauthorized'});
        }
        if (error.status === 403) {
            return res.status(403).send({error :'Forbidden'});
        }
        if (error.status === 400) {
            return res.status(400).send({error :'Bad Request'});
        }
        if (error.status === 500) {
            return res.status(500).send({error :'Internal Server Error'});
        }

        next(error);
    });


    app.use((req, res) => {
        res.status(404).send('404 Not Found');
    });
};