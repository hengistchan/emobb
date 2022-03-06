const PromiseStatus = {
  fulfilled: "Fulfilled",
  rejected: "Rejected",
  pending: "Pending",
};

class MyPromise {
  status = PromiseStatus.pending;
  value = undefined;
  reason = undefined;
  successCallback = [];
  failCallback = [];
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  resolve = (value) => {
    if (this.status !== PromiseStatus.pending) return;
    this.value = value;
    this.status = PromiseStatus.fulfilled;
    // 执行异步
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value);
    }
  };
  reject = (reason) => {
    if (this.status !== PromiseStatus.pending) return;
    this.reason = reason;
    this.status = PromiseStatus.rejected;
    // 执行异步
    // this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason);
    }
  };
  then(successCallback, failCallback) {
    successCallback = successCallback ?? ((value) => value);
    failCallback =
      failCallback ??
      ((reason) => {
        throw reason;
      });
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === PromiseStatus.fulfilled) {
        try {
          setTimeout(() => {
            // 获取函数调用成功的返回值
            const x = successCallback(this.value);
            // 传给下一个promise对象
            this.resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (e) {
          reject(e);
        }
      } else if (this.status === PromiseStatus.rejected) {
        try {
          setTimeout(() => {
            const x = failCallback(this.reason);
            // 传给下一个promise对象
            this.resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (e) {
          reject(e);
        }
      } else {
        // 如果当前状态时pending，就先把函数保存下来，放到上面的resolve和reject函数去执行
        successCallback &&
          this.successCallback.push(() => {
            try {
              // 对异步返回值的处理
              setTimeout(() => {
                // 获取函数调用成功的返回值
                const x = successCallback(this.value);
                // 传给下一个promise对象
                this.resolvePromise(promise2, x, resolve, reject);
              }, 0);
            } catch (e) {
              reject(e);
            }
          });
        failCallback &&
          this.failCallback.push(() => {
            try {
              setTimeout(() => {
                const x = failCallback(this.reason);
                // 传给下一个promise对象
                this.resolvePromise(promise2, x, resolve, reject);
              }, 0);
            } catch (e) {
              reject(e);
            }
          });
      }
    });
    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError());
    }
    if (x instanceof MyPromise) {
      x.then(resolve, reject);
    } else {
      resolve(x);
    }
  }
}

const pp = new Promise((resolve) => {
  resolve();
});
pp.then(() => {
  console.log(3);
  process.nextTick(() => {
    console.log(1);
  });
}).then(() => {
  console.log(2);
});
