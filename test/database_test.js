//These tests require the following steps to run...
//1: Run mongod and mongo from the command line (Windows)
//2: From the terminal, use command __ npm run test __ 

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const Schema = require('../database/db.js').Restaurants

describe('Database Testing', function () {
  //Save object with 'name' value of 'Mike"
  it('It should save a name to the database', function (done) {
    let testName = Schema({
      name: 'Mike'
    });

    testName.save(done);
  });

  it('It should not save data with incorrect keys', function (done) {
    //Checks to see if we can save data with different keys
    var wrongSave = Schema({
      notName: 'Not Mike'
    });
    wrongSave.save(err => {
      if (err) { return done(); }
      throw new Error('Should generate error!');
    });
  });

  //should find the previously saved name
  it('It should retrieve data from the database', function (done) {

    Schema.find({ name: 'Mike' }, (err, name) => {
      if (err) throw err;
      if (name.length >= 1) return done();
      else throw new Error('Unable to retrieve data!')
    });
  });

  //Should not save any data with the same key/values 
  it('It should not save duplicate data', function (done) {
    var anotherTestName = Schema({
      name: 'Mike'
    });

    Schema.find({ name: 'Mike' }).exec((err, result) => {
      if (err) return err;
      if (result.length === 1) return done();
      else anotherTestName.save(done);
    });
  });

  //Should remove the data saved to the database in this test suite
  it('It should remove data from the database', function (done) {
    Schema.find({ name: 'Mike' }).exec((err, result) => {
      if (err) throw err;
      if (result.length === 0) throw new Error('No data!');
      else {
        Schema.deleteMany({ 'name': 'Mike' })
          .then(result => console.log(`Deleted ${result.deletedCount} item.`))
          .catch(err => console.error(`Delete failed with error: ${err}`))
          .then(isDone => {
            done()
          });
      }
    });
  });
  
  //After tests run, closes the connection
  after(function (done) {
    mongoose.connection.close(done);
  });
});

