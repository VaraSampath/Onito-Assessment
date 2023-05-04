import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { State, City } from "country-state-city";
import schema from "../../yup";

const bloodGroups = [
  "O-positive",
  "O-negative",
  "A-positive",
  "A-negative",
  "B-positive",
  "B-negative",
  "AB-positive",
  "AB-negative",
];

function Form() {
  const [govtIdType, setGovtIdType] = useState("none");
  const [state, setstate] = useState("");

  const setGovtId = (e) => {
    setGovtIdType(e.target.value);
  };
  const firstFormData = govtIdType;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    context: { type: firstFormData },
  });

  const postUser = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const x = await fetch("http://localhost:8000/", options);
    const f = await x.json();
    const { message } = f;
    console.log(message);
  };

  const submitUser = (data) => {
    console.log(data);

    postUser(data);
  };

  const onChangeState = (e) => {
    setstate(e.target.value);
  };

  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", state.slice(0, 2));

  console.log(state.slice(0, 2));

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit((data) => {
          submitUser(data);
        })}
      >
        <h1 className="section__header">Personal Details</h1>
        <div className="form__each__section">
          <div className="each__form__field">
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter Name"
            />
            {errors.name && <p className="error-msg">{errors.name?.message}</p>}
          </div>
          <div className="each__form__field">
            <label htmlFor="age">
              Date of Birth or Age <span className="required">*</span>
            </label>
            <input
              {...register("age")}
              placeholder="DD/MM/YYYY or Age in Years"
            />
            {errors.age && <p className="error-msg">{errors.age?.message}</p>}
          </div>
          <div className="each__form__field">
            <label htmlFor="sex">
              Sex <span className="required">*</span>
            </label>
            <select
              id="sex"
              {...register("sex")}
            >
              <option value="">Enter Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.sex && <p className="error-msg">{errors.sex?.message}</p>}
          </div>
          <div className="each__form__field">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              {...register("mobile")}
            />
            {errors.mobile && (
              <p className="error-msg">{errors.mobile?.message}</p>
            )}
          </div>

          <div className="each__form__field">
            <label htmlFor="govtId">Govt Issued ID</label>
            <select
              {...register("govtIdType")}
              onChange={setGovtId}
            >
              <option value="">ID Type</option>
              <option value="PAN">PAN</option>
              <option value="AADHAR">AADHAR</option>
            </select>

            <input
              type="text"
              id="govtId"
              {...register("govtIdNumber")}
            />
            {errors.govtIdNumber && (
              <p className="error-msg">{errors.govtIdNumber?.message}</p>
            )}
          </div>
        </div>
        <h1 className="section__header">Contact Details</h1>
        <div className="form__each__section">
          <div className="each__form__field">
            <label htmlFor="">Guardian Details</label>
            <select {...register("gsalutaion")}>
              <option value="">Enter Label</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Miss">Miss</option>
            </select>

            <input {...register("gName")} />
          </div>
          <div className="each__form__field">
            <label htmlFor="">Email</label>
            <input
              {...register("email")}
              placeholder="Enter Email"
            />
          </div>

          <div className="each__form__field">
            <label htmlFor="">Emergency Mobile</label>
            <input
              id="mobile"
              {...register("emergencyMobile")}
            />
            {errors.emergencyMobile && (
              <p className="error-msg">{errors.emergencyMobile?.message}</p>
            )}
          </div>
        </div>

        <h1 className="section__header">Address Details</h1>
        <div className="form__each__section">
          <div className="each__form__field">
            <label htmlFor="">Address</label>
            <input
              {...register("address")}
              placeholder="Enter address"
            />
          </div>

          <div className="each__form__field">
            <label htmlFor="">Enter State</label>
            <select
              {...register("state")}
              onChange={onChangeState}
            >
              <option value="">Enter State</option>
              {states.map((each) => {
                return (
                  <option
                    key={each.isoCode}
                    value={each.isoCode + " " + `(${each.name})`}
                  >
                    {each.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="each__form__field">
            <label htmlFor="">Enter City</label>
            <select {...register("city")}>
              <option value="">Enter City</option>
              {cities.map((each) => {
                return (
                  <option
                    key={each.name}
                    value={each.name}
                  >
                    {each.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="each__form__field">
            <label htmlFor="">Country </label>
            <select {...register("country")}>
              <option value="India">India</option>
            </select>
          </div>
          <div className="each__form__field">
            <label htmlFor="">Pincode </label>
            <input
              type="text"
              placeholder="Enter Pincode"
            />
          </div>
        </div>
        <h1 className="section__header">Other Details</h1>
        <div className="form__each__section">
          <div className="each__form__field">
            <label htmlFor="">Occupation</label>
            <input
              {...register("occupation")}
              placeholder="Enter occupation"
            />
          </div>

          <div className="each__form__field">
            <label htmlFor=""> Religion</label>
            <select {...register("religion")}>
              <option value="">Enter religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="others">others</option>
            </select>
          </div>
          <div className="each__form__field">
            <label htmlFor="">Marital Status</label>
            <select {...register("maritalStatus")}>
              <option value="">Enter Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div className="each__form__field">
            <label htmlFor="">Blood Groups </label>
            <select {...register("bloodGroup")}>
              <option value="">Enter Blood Group</option>
              {bloodGroups.map((each) => {
                return (
                  <option
                    key={each}
                    value={each}
                  >
                    {each}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="each__form__field">
            <label htmlFor="">Nationality </label>
            <select {...register("nationality")}>
              <option value="India">India</option>
            </select>
          </div>
        </div>

        <button type="reset">Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
