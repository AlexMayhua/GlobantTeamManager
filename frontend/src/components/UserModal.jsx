import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const roles = ["admin", "pm", "dev", "qa", "viewer"];
const schema = Yup.object({
  nombre: Yup.string(),
  correo: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(6, "Mínimo 6").notRequired(),
  rol: Yup.string().oneOf(roles),
});

export default function UserModal({ open, onClose, onSave, initial }) {
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "dev",
  });
  useEffect(() => {
    if (initial)
      setInitialValues({
        nombre: initial.nombre,
        correo: initial.correo,
        password: "",
        rol: initial.rol || "dev",
      });
    else setInitialValues({ nombre: "", correo: "", password: "", rol: "dev" });
  }, [initial, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4">
          {initial ? "Editar" : "Nuevo"} Usuario
        </h3>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            onSave(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <div>
                <label className="block mb-1">Nombre</label>
                <Field
                  name="nombre"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <Field
                  name="correo"
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="correo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block mb-1">Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block mb-1">Rol</label>
                <Field
                  as="select"
                  name="rol"
                  className="w-full border px-3 py-2 rounded"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {initial ? "Actualizar" : "Crear"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
