const PENDING = 1;
const FULFILLED = 2;
const REJECTED = 3;

class MyPromise {

  constructor(executor) {

    this.status = PENDING;
    this.value = undefined;
    this.callbacks = [];

    executor(
      this._fulfill.bind(this),
      this._reject.bind(this),
    );

  }

  then(onResolved, onRejected) {

    const subPromise = new MyPromise(() => {}); 

    if (this.status === PENDING) {
      this.callbacks.push([onResolved, onRejected, subPromise]);
    } else {
      setTimeout(() => {
        this._handleCallback(
          onResolved,
          onRejected,
          subPromise,
        );
      }, 0);
    }

    return subPromise;

  }

  catch(onReject) {

    return this.then(undefined, onReject);

  }

  _fulfill(value) {

    if (this.status !== PENDING) {
      throw new Error('Promise was already resolved');
    }

    this.status = FULFILLED;
    this.value = value;
    this._itsCallbackTime();

  }

  _reject(reason) {

    if (this.status !== PENDING) {
      throw new Error('Promise was already resolved');
    }
    this.status = REJECTED;
    this.value = reason;
    this._itsCallbackTime();

  }

  _itsCallbackTime() {

    for(const cb of this.callbacks) {

      this._handleCallback(...cb); 

    }

  }

  _handleCallback(onResolved, onRejected, subPromise) {

    try {
      let newValue;
      if(this.status === FULFILLED) {
        if (onResolved !== undefined) {
          newValue = onResolved(this.value);
        } else {
          newValue = this.value;
        }
      } else if (this.status === REJECTED) {
        if (onRejected !== undefined) {
          newValue = onRejected(this.value);
        } else {
          throw this.value;
        }
      }

      if (isPromiseLike(newValue)) {

        newValue.then(
          val => {
            subPromise._fulfill(val);
          },
          reason => {
            subPromise._reject(reason);
          }
        );

      } else {
        subPromise._fulfill(newValue);
      }
    } catch (err) {

      subPromise._reject(err);

    }

  }

  static resolve(val) {

    return new Promise(res => res(val));

  }

  static reject(reason) {

    return new Promise((res, rej) => rej(reason));

  }


  static all(promises) {

    const result = [];

    let resultCount = 0;

    return new Promise( (res, rej) => {

      for(const [index, promise] of promises.entries()) {

        promise.then(val => {

          resultCount++;
          result[index] = value;
          if (resultCount === promises.length) {
            res(result);
          }

        }).catch( err => {

          rej(err);

        });

      }

    });

  }

}

function isPromiseLike(val) {

  return val.then !== undefined;

}


export default MyPromise;
