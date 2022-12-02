const Modal = require('react-modal');

const oldFn = Modal.setAppElement;
// eslint-disable-next-line consistent-return
Modal.setAppElement = (element) => {
  if (element === '#root') {
    // otherwise it will throw aria warnings.
    return oldFn(document.createElement('div'));
  }
  oldFn(element);
};
module.exports = Modal;
