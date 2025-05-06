const config = {};

// MongoDB connection strings
config.mongoURI = {
    production: 'mongodb+srv://edwinmwendwa:projects@cluster0.fmnjluk.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://edwinmwendwa:projects@cluster0.fmnjluk.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://edwinmwendwa:projects@cluster0.fmnjluk.mongodb.net/darkroom-test?retryWrites=true&w=majority',
};

export default config;
