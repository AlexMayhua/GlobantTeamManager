import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "./api/http";

const schema = Yup.object({
  correo: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
});

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar sesión
        </h2>
        <Formik
          initialValues={{ correo: "", password: "" }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            try {
              const data = await post("/api/login", values);
              localStorage.setItem("token", data.token);
              navigate("/dashboard");
            } catch (e) {
              setError(e.message || "Error");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <Field
                  name="correo"
                  type="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="correo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
              {error && (
                <div className="text-red-600 text-center mt-2">{error}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
