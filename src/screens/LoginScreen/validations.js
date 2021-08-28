import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, '6 characters minimum required'),
});
