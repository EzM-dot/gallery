var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://edwinmwendwa:projects@cluster0.fmnjluk.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://edwinmwendwa:projects@cluster0.fmnjluk.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://edwinmwendwa:projects@cluster0.fmnjluk.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;