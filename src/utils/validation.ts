const usernameValidation = (value: string) => {
  const latin = /[A-Za-z]/;
  const numbers = /[0-9]/;

  if (!latin.test(String(value)) && numbers.test(String(value))) {
    return { valid: false, messageType: 'all' };
  }
  if (!latin.test(String(value))) {
    return { valid: false, messageType: 'latin' };
  }
  if (!numbers.test(String(value))) {
    return { valid: false, messageType: 'number' };
  }

  return { valid: true, messageType: '' };
};

const passwordValidation = (value: string) => {
  const capital = /[A-Z]/;
  const numbers = /[0-9]/;
  let message = '';

  if (value.length < 8) {
    message = message.concat('length');
  }
  if (!capital.test(String(value))) {
    message = message.concat(' capital');
  }
  if (!numbers.test(String(value))) {
    message = message.concat(' numbers');
  }
  message = message === 'length capital numbers' ? 'all' : message;

  if (message !== '') {
    return { valid: false, messageType: message };
  }

  return { valid: true, messageType: '' };
};

const phoneNumberValidation = (value: string) => {
  if (value.includes('x') || value.trim().length < 19) {
    return { valid: false, messageType: 'notValid' };
  }
  const phoneCode = value.slice(6, 8);

  if (phoneCode === '29' || phoneCode === '33' || phoneCode === '25' || phoneCode === '44') {
    return { valid: true, messageType: '' };
  }

  return { valid: false, messageType: 'notValid' };
};

const emailValidation = (value: string) => {
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line

  if (!email.test(String(value))) {
    return { valid: false, messageType: 'email' };
  }

  return { valid: true, messageType: '' };
};

export const validateInput = (type: string, value: string) => {
  let result = { valid: false, messageType: '' };

  if (!value) {
    return { valid: false, messageType: 'required' };
  }

  switch (type) {
    case 'username':
      result = usernameValidation(value);
      break;
    case 'password':
      result = passwordValidation(value);
      break;
    case 'firstName':
      result = { valid: true, messageType: '' };
      break;
    case 'lastName':
      result = { valid: true, messageType: '' };
      break;
    case 'phone':
      result = phoneNumberValidation(value);
      break;
    case 'email':
      result = emailValidation(value);
      break;
    default:
      result = { valid: true, messageType: '' };
      break;
  }

  return result;
};
