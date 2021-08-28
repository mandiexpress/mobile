import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is required'),
  phone: Yup.string()
    .required('Phone is required')
    .min(10, 'Invalid Number')
    .max(12, 'Invalid Number'),
  address: Yup.string().required('Address is required'),
});
