import * as Yup from 'yup';

const PK_REGEX = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/g;

export default Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(PK_REGEX, {
      message: 'Invalid Phone Number',
    })
    .required('Phone number cannot be empty'),
});
