import "./SignupPage.scss";
import * as Yup from "yup";
import { Formik } from "formik";
import { useLoading } from "../../hooks/useLoading";
import { useDispatch } from "react-redux";
import { signup } from "../../store/actions/userActions";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { notificationService } from "../../services/notificationService";
import { AppLoading } from "../../components/AppLoading";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().required().min(1).email().label("Email"),
  password: Yup.string().required().min(1).label("Password"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  type: Yup.string().min(1).label("Type"),
});

export const SignupPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="signup-page page center-childs column">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          type: "customer",
          phone: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          try {
            await dispatch(signup(values));

            resetForm();
          } catch (err) {
            notificationService.notify(
              "error",
              `coldnt signup: ${err.message}`
            );
          } finally {
            setIsLoading(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          setFieldTouched,
          setFieldValue,
          touched,
          values,
        }) => (
          <div className="card flex column">
            <h2 className="title">Fix-It</h2>
            <Field
              name="name"
              touched={touched}
              errors={errors}
              iconName="far fa-user"
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <Field
              name="email"
              touched={touched}
              errors={errors}
              iconName="fas fa-envelope"
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <Field
              name="password"
              touched={touched}
              errors={errors}
              iconName="fas fa-key"
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <Field
              name="passwordConfirm"
              touched={touched}
              errors={errors}
              iconName="fas fa-key"
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <div className="field-wrapper">
              <div className="field flex align-center">
                <i className="fas fa-box"></i>
                <select
                  className="app-input"
                  name="type"
                  onBlur={() => setFieldTouched("type")}
                  value={values["type"]}
                  onChange={({ target: { value } }) =>
                    setFieldValue("type", value)
                  }
                >
                  <option value="customer">customer</option>
                  <option value="seller">seller</option>
                </select>
              </div>
              {touched["type"] && errors["type"] && (
                <p>{touched["type"] && errors["type"]}</p>
              )}
            </div>

            <Field
              name="phone"
              touched={touched}
              errors={errors}
              iconName="fas fa-phone"
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <button
              className="primary-button"
              disabled={isLoading}
              onClick={() => handleSubmit()}
            >
              {!isLoading ? "Sign Up" : <AppLoading />}
            </button>
            <p className="little-message">
              Already have an account?{" "}
              <span onClick={() => history.push("/login")}>Login</span>
            </p>
          </div>
        )}
      </Formik>
    </div>
  );
};

function Field({
  name,
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  iconName = null,
  inputType = "text",
  placeholder = name.charAt(0).toUpperCase() + name.slice(1),
}) {
  return (
    <div className="field-wrapper">
      <div className="field flex align-center">
        <i className={iconName}></i>
        <input
          className="app-input"
          type={inputType}
          name={name}
          placeholder={placeholder}
          onBlur={() => setFieldTouched(name)}
          value={values[name]}
          onChange={({ target: { value } }) => setFieldValue(name, value)}
        />
      </div>
      {touched[name] && errors[name] && <p>{touched[name] && errors[name]}</p>}
    </div>
  );
}
