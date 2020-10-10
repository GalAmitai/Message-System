const environment = {
    status: 'dev'
};

const server = {
    api_baseurl: environment.status == 'dev' ? 'http://localhost:3000' : 'PRODUCTION URL'
}


module.exports = {
    environment,
    server
}