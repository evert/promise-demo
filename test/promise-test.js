import MyPromise from '../src/my-promise.js';
import chai from 'chai';

const { expect } = chai;

describe('MyPromise', () => {

  it('It should be newable', () => {

    const p = new MyPromise( (res, rej) => {
    });

    expect(p).to.be.an.instanceof(MyPromise);

  });

  it('It should call then() if the promise was fulfilled', (done) => {

    const p = new MyPromise( (res, rej) => {
      res('hello world');
    });

    p.then( val => {

      expect(val).to.equal('hello world');
      done();

    });

  });

  it('It should call then() if the promise was fulfilled later', (done) => {

    const p = new MyPromise( (res, rej) => {
      setTimeout( () => {
        res('hello world');
      }, 10);
    });

    p.then( val => {

      expect(val).to.equal('hello world');
      done();

    });

  });


  it('It should support chaining', (done) => {

    const p = new MyPromise( (res, rej) => {
      setTimeout( () => {
        res(1);
      }, 10);
    });

    p.then( val => {

      return val + 2;

    }).then(val => {

      expect(val).to.equal(3);
      done();

    });

  });

  it('It should handle errors', (done) => {

    const p = new MyPromise( (res, rej) => {
      setTimeout( () => {
        res('hello');
      }, 10);
    });

    let check = 1;

    p.then( val => {

      check+=2;
      throw new Error('Bad');

    }).then(val => {

      check+=4;

    }).catch(err => {

      expect(check).to.equal(3);
      expect(err.message).to.equal('Bad');
      done();

    });

  });

  it('It should resolve promises from the onResolved function', (done) => {

    const p = new MyPromise( (res, rej) => {
      setTimeout( () => {
        res(1);
      }, 10);
    });

    p.then( val => {

      return new MyPromise( res => {
        res(val + 2);
      });

    }).then(val => {

      expect(val).to.equal(3);
      done();

    });

  });

});
