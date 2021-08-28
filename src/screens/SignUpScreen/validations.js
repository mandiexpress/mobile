import * as Yup from 'yup';

const phoneRegExp = /^03+/;

export default Yup.object().shape({
  name: Yup.string().required('Name is required').trim(),
  email: Yup.string().email().required('Email is required').trim(),
  password: Yup.string()
    .required('Password is required')
    .min(6, '6 characters minimum required')
    .oneOf([Yup.ref('confirmPassword'), null], 'Passwords should match'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords should match'),
  address: Yup.string().required('Address is required').trim(),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number should start with 03'),
});
