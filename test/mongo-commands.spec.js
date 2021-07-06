import MongoMemoryServer from 'mongodb-memory-server';
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

const dataImport = require('./data-import');
const produceReport = require('../src/mongo-commands');

describe('mongo-commands', function () {

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  let con;
  let db;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    con = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = con.db(await mongoServer.getDbName());
  });

  afterAll(async () => {
    if (con) con.close();
    if (mongoServer) await mongoServer.stop();
  });

  beforeEach((done) => {
    db.dropDatabase();
    dataImport(db, __dirname + '/data.json', done);
  })

  function executeOnDb(assertions) {
    return function (done) {
      produceReport(db, function () {
        var report = db.collection('coursereport');
        assertions(report, done);
      });
    }
  }

  describe('coursereport', function() {

    it('should contain 5 records', executeOnDb(function(report, done) {
      report.find().toArray(function (err, docs) {
        assert.equal(err, null);
        assert.equal(docs.length, 5);
        done();
      });
    }));

    it('should contain correct course number for Jeff', executeOnDb(function(report, done) {
      report.findOne({_id: 'jeff'}, function (err, doc) {
        assert.equal(err, null);
        assert.equal(doc.value.numbercourses, 2);
        done();
      });
    }));

    it('should contain correct name for Jeff', executeOnDb(function(report, done) {
      report.findOne({_id: 'jeff'}, function (err, doc) {
        assert.equal(err, null);
        assert.equal(doc.value.name, 'Jeff Holland');
        done();
      });
    }));

    it('should contain correct course number for john.shore', executeOnDb(function(report, done) {
      report.findOne({_id: 'john.shore'}, function (err, doc) {
        assert.equal(err, null);
        assert.equal(doc.value.numbercourses, 2);
        done();
      });
    }));

    it('should contain correct name for john.shore', executeOnDb(function(report, done) {
      report.findOne({_id: 'john.shore'}, function (err, doc) {
        assert.equal(err, null);
        assert.equal(doc.value.name, 'John Shore');
        done();
      });
    }));

    it('should contain correct course number for scott', executeOnDb(function(report, done) {
      report.findOne({_id: 'scott'}, function (err, doc) {
        assert.equal(err, null);
        assert.equal(doc.value.numbercourses, 3);
        done();
      });
    }));

    it('should contain correct name for scott', executeOnDb(function(report, done) {
      report.findOne({_id: 'scott'}, function (err, doc) {
        assert.equal(err, null);
        assert.equal(doc.value.name, 'Scott Mills');
        done();
      });
    }));
  });
});
