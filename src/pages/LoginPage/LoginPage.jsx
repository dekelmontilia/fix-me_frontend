import "./LoginPage.scss";
import * as Yup from "yup";
import { Formik } from "formik";
import { useLoading } from "../../hooks/useLoading";
import { useDispatch } from "react-redux";
import { login, signup } from "../../store/actions/userActions";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { notificationService } from "../../services/notificationService";
import { AppLoading } from "../../components/AppLoading";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().min(1).email().label("Email"),
  password: Yup.string().required().min(1).label("Password"),
});

export const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  return (
    <div className="login-page page center-childs column">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          try {
            await dispatch(login(values));
            resetForm();
          } catch (err) {
            notificationService.notify("error", `coldnt login: ${err.message}`);
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
              name="email"
              touched={touched}
              errors={errors}
              iconName="far fa-user"
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              name="password"
              touched={touched}
              errors={errors}
              iconName="far fa-user"
              values={values}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              inputType="password"
            />
            <button
              className="primary-button"
              disabled={isLoading}
              onClick={() => handleSubmit()}
            >
              {!isLoading ? "Log In" : <AppLoading />}
            </button>

            <p className="little-message">
              Don't have an account?{" "}
              <span onClick={() => history.push("/signup")}>Sign Up</span>
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
