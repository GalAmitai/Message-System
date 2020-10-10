const environment = {
    status: 'dev'
};

const mySqlConfiguration = {
    host: environment.status == 'dev' ? '127.0.0.1' : '',
    port: '3306',
    database: environment.status == 'dev' ? 'herolo' : '',
    user: environment.status == 'dev' ? 'root' : '',
    password: environment.status == 'dev' ? '' : ''
}

module.exports = {
    environment,
    mySqlConfiguration
}