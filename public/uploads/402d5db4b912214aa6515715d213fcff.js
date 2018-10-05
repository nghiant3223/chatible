let a = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 3000);
});

let b = new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 1000);
});

Promise.all([b, a]).then(val => console.log(val));