process.env.NODE_ENV = 'test';

const chai = require('chai');
const server = require('../server');
const should = chai.should();
const expect = chai.expect;

(async () => {
    const chaiHttp = (await import('chai-http')).default; // Dynamically import chai-http
    chai.use(chaiHttp); // Use chai-http after it is imported

    // Define tests inside the async block
    describe('Photos', function () {
        it('should list ALL photos on / GET', function (done) {
            this.timeout(60000);
            chai.request(server)
                .get('/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // Run the tests
    run(); // Mocha's `run()` function to execute tests dynamically
})();