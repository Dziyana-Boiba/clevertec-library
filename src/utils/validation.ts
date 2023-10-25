const loginValidation = (value: string) => {
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
  if (value.includes('x') || value.length < 17) {
    return { valid: false, messageType: 'notValid' };
  }
  const phoneCode = value.slice(6, 8);

  if (phoneCode === '29' || phoneCode === '33' || phoneCode === '25' || phoneCode === '44') {
    return { valid: true, messageType: '' };
  }

  return { valid: false, messageType: 'notValid' };
};

const emailValidation = (value: string) => {
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!email.test(String(value))) {
    return { valid: false, messageType: 'email' };
  }

  return { valid: true, messageType: '' };
};

export const validateInput = (type: string, value: string) => {
  let result = { valid: false, messageType: '' };

  switch (type) {
    case 'username':
      result = value === '' ? { valid: false, messageType: 'required' } : loginValidation(value);
      break;
    case 'password':
      result = value === '' ? { valid: false, messageType: 'required' } : passwordValidation(value);
      break;
    case 'firstName':
      result = value === '' ? { valid: false, messageType: 'required' } : { valid: true, messageType: '' };
      break;
    case 'lastName':
      result = value === '' ? { valid: false, messageType: 'required' } : { valid: true, messageType: '' };
      break;
    case 'phone':
      result = value === '' ? { valid: false, messageType: 'required' } : phoneNumberValidation(value);
      break;
    case 'email':
      result = value === '' ? { valid: false, messageType: 'required' } : emailValidation(value);
      break;
    default:
      break;
  }

  return result;
};
