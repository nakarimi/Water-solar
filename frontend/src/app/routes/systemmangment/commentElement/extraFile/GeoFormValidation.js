import yup from 'yup';
export const GeoFormValidation = yup.object().shape({
    country: yup.required("Required"),
    city: yup.string().required("Required"),
    latitude: yup.number().required("Required"),
    longtitude: yup.number().required("Required"),
  });
