'use strict';

const body = document.querySelector('body');

function createNotification(message, notificationStatus) {
  if (notificationStatus !== 'success' && notificationStatus !== 'error') {
    return;
  }

  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', notificationStatus);
  div.textContent = message;

  body.appendChild(div);
}

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  leftClickPromise.then(() => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise.then((value) => createNotification(value, 'success'));
firstPromise.catch((error) => createNotification(error, 'error'));

const secondPromise = new Promise((resolve) => {
  leftClickPromise.then(() => {
    resolve('Second promise was resolved');
  });

  rightClickPromise.then(() => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((value) => {
  createNotification(value, 'success');
});

secondPromise.catch((error) => {
  createNotification(error, 'error');
});

const thirdPromise = new Promise((resolve) => {
  rightClickPromise.then(() => {
    leftClickPromise.then(() => {
      resolve('Third promise was resolved');
    });
  });
});

thirdPromise.then((value) => {
  createNotification(value, 'success');
});

thirdPromise.catch((error) => {
  createNotification(error, 'error');
});
