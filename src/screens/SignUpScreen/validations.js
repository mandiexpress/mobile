import * as Yup from 'yup';

const phoneRegExp = /^03+/;

export default Yup.object().shape({
  name: Yup.string().required('Name is required').trim(),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number should start with 03'),
  house: Yup.string().required('House number is required').trim(),
});
