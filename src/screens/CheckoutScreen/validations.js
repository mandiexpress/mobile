import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .required('Phone is required')
    .min(10, 'Invalid Number')
    .max(12, 'Invalid Number'),
  house: Yup.string().required('House number is required'),
});
