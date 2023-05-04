import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field").min(2),
  age: yup.string().required("Age is a required field"),
  sex: yup.string().required("Sex is a required field"),
  govtIdNumber: yup.string().when("$type", (type, schema) => {
    console.log(type);
    if (type[0] === "PAN") {
      return schema.matches(
        /([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
        "Pan details are incorrect"
      );
    }
    if (type[0] === "AADHAR") {
      return schema
        .length(12, `Aadhar number must be exactly 12 characters`)
        .matches(/^[0-9]*$/, "Aadhar should be numeric");
    }
    return;
  }),
  mobile: yup
    .string()
    .matches(/^(0|91)?[6-9][0-9]{9}$/, {
      message: "Mobile number is invalid",
      excludeEmptyString: true,
    })
    .nullable(),
  emergencyMobile: yup
    .string()
    .matches(/^(0|91)?[6-9][0-9]{9}$/, {
      message: "Mobile number is invalid",
      excludeEmptyString: true,
    })
    .nullable(),
});

export default schema;
