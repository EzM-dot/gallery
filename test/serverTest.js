import request from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';
const { expect } = chai;
import { createServer } from 'http';
import app from '../server.js';
import _config from '../_config.js';

// Set up test environment
process.env.NODE_ENV = 'test';
const PORT = 5001;
process.env.PORT = PORT;

const server = createServer(app);
server.keepAliveTimeout = 0;
server.timeout = 0;

// Test database connection
const TEST_DB_URI = _config.mongoURI.test;

// Add a simple test that doesn't depend on MongoDB
describe('Basic Tests', function() {
    it('should pass a basic test', function() {
        expect(true).to.be.true;
    });
});

describe('Gallery App', function() {
    this.timeout(10000);

    before(async function() {
        try {
            // Connect to test database
            await mongoose.connect(TEST_DB_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            console.log('Successfully connected to MongoDB');
            
            // Start the server
            return new Promise((resolve, reject) => {
                server.listen(PORT, '0.0.0.0', (err) => {
                    if (err) {
                        console.error('Server failed to start:', err);
                        return reject(err);
                    }
                    console.log(`Test server running on port ${PORT}`);
                    resolve();
                });
            });
        } catch (error) {
            console.error('Error in before hook:', error);
            throw error;
        }
    });
    
    after(async function() {
        try {
            // Close server
            await new Promise((resolve) => {
                server.close(() => {
                    console.log('Test server closed');
                    resolve();
                });
            });
            
            // Close database connection if connected
            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.close();
                console.log('MongoDB connection closed');
            }
        } catch (error) {
            console.error('Error in after hook:', error);
        }
    });

    // Simple health check endpoint test
    describe('GET /health', function() {
        it('should return 200 OK', function(done) {
            request(server)
                .get('/health')
                .expect(200, done);
        });
    });
    
    describe('GET /', function() {
        it('should return status 200 and HTML content', function(done) {
            this.timeout(10000);
            request(server)
                .get('/')
                .set('Accept', 'text/html')
                .expect('Content-Type', /html/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
});