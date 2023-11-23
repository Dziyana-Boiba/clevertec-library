import { AuthRespondType, StepsType } from '../types/auth.js';

export const TOKEN_JWT_LS = 'token';
export const USER_ID_LS = 'userId';

export const respondTextPath = {
  login: {
    error: 'loginError',
  },
  registration: {
    exist: 'registrationExist',
    error: 'registrationError',
    success: 'registrationSuccess',
  },
  forgotPass: {
    emailSent: 'forgotPassEmailSent',
    error: 'forgotPassError',
    success: 'forgotPassSuccess',
  },
};

export const respondText: AuthRespondType = {
  loginError: {
    header: 'auth.LOGIN_NOT_COMPLETED',
    text: 'auth.SOMETHING_WENT_WRONG_TRY_AGAIN',
    button: 'auth.REPEAT',
  },
  registrationExist: {
    header: 'auth.DATA_NOT_SAVED',
    text: 'auth.LOGIN_OR_EMAIL_ALREADY_REGISTERED',
    button: 'auth.BACK_TO_REGISTRATION',
  },
  registrationError: {
    header: 'auth.DATA_NOT_SAVED',
    text: 'auth.REGISTRATION_NOT_COMPLETED_TRY_AGAIN',
    button: 'auth.REPEAT',
  },
  registrationSuccess: {
    header: 'auth.REGISTRATION_SUCCESSFUL',
    text: 'auth.REGISTRATION_SUCCESSFUL_DESCRIPTION',
    button: 'auth.GO_TO_LOGIN',
  },
  forgotPassEmailSent: {
    header: 'auth.EMAIL_SENT',
    text: 'auth.CHECK_EMAIL_FOR_PASSWORD_RESET_INSTRUCTIONS',
    button: '',
  },
  forgotPassError: {
    header: 'auth.DATA_NOT_SAVED',
    text: 'auth.SOMETHING_WENT_WRONG_TRY_AGAIN',
    button: 'auth.REPEAT',
  },
  forgotPassSuccess: {
    header: 'auth.NEW_DATA_SAVED',
    text: 'auth.LOGIN_WITH_NEW_PASSWORD',
    button: 'auth.GO_TO_LOGIN',
  },
};

export const registrationSteps: StepsType[] = [
  {
    firstInput: {
      inputName: 'username',
      type: 'text',
      label: 'auth.CREATE_LOGIN_FOR_ENTRY',
      assistiveText: 'auth.USERNAME_RULES_full',
    },
    secondInput: {
      inputName: 'password',
      type: 'password',
      label: 'auth.PASSWORD',
      assistiveText: 'auth.PASSWORD_RULES_full',
    },
    buttonText: 'auth.NEXT_STEP',
  },
  {
    firstInput: {
      inputName: 'firstName',
      type: 'text',
      label: 'auth.FIRST_NAME',
      assistiveText: '',
    },
    secondInput: {
      inputName: 'lastName',
      type: 'text',
      label: 'auth.LAST_NAME',
      assistiveText: '',
    },
    buttonText: 'auth.LAST_STEP',
  },
  {
    firstInput: {
      inputName: 'phone',
      type: 'text',
      label: 'auth.PHONE_NUMBER',
      assistiveText: 'auth.PHONE_NUMBER_FORMAT',
    },
    secondInput: { inputName: 'email', type: 'text', label: 'E-mail', assistiveText: '' },
    buttonText: 'auth.REGISTER_ACTION',
  },
];
