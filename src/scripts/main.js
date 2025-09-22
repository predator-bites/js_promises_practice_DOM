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

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(
    () => reject(Error('First promise was rejected')),
    3000,
  );

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    clearTimeout(timeout);
  });
});

firstPromise.then((value) => createNotification(value, 'success'));
firstPromise.catch((error) => createNotification(error, 'error'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((value) => {
  createNotification(value, 'success');
});

secondPromise.catch((error) => {
  createNotification(error, 'error');
});

const waitForLeftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const waitForRightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([waitForLeftClick, waitForRightClick]).then((results) => {
    resolve('Third promise was resolved');
  });
});

thirdPromise.then((value) => {
  createNotification(value, 'success');
});

thirdPromise.catch((error) => {
  createNotification(error, 'error');
});
