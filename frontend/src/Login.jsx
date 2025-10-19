import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "./api/http";

const schema = Yup.object({
  correo: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  remember: Yup.boolean().default(false),
});

export default function Login() {
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Panel izquierdo: branding */}
      <div className="hidden md:flex flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 grid place-items-center">
            {/* Logo minimal */}
            <svg viewBox="0 0 24 24" className="h-6 w-6"><path fill="currentColor" d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"/></svg>
          </div>
          <span className="font-semibold tracking-wide">Globant Team Manager</span>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl font-bold leading-tight">Bienvenido</h1>
          <p className="mt-3 text-slate-300 max-w-md">
            Administra proyectos, asigna colaboradores y controla el avance desde un solo lugar.
          </p>
          <ul className="mt-6 space-y-2 text-slate-300/90">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> Autenticación segura con JWT</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> CRUD de proyectos y equipo</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> Métricas en tiempo real</li>
          </ul>
        </div>
        <div className="text-sm text-slate-400">© {new Date().getFullYear()} Globant Perú S.A.C.</div>
      </div>

      {/* Panel derecho: tarjeta de login */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-center">Iniciar sesión</h2>
            <p className="text-sm text-slate-300 text-center mt-1">Usa tus credenciales corporativas</p>

            {error && (
              <div role="alert" className="mt-6 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-red-200">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7h2v6h-2zm0 8h2v2h-2z"/><path fill="currentColor" d="M1 21h22L12 2 1 21z"/></svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <Formik
              initialValues={{ correo: "", password: "", remember: false }}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting }) => {
                setError(null);
                try {
                  const data = await post("/api/login", { correo: values.correo, password: values.password });
                  localStorage.setItem("token", data.token);
                  if (values.remember) localStorage.setItem("remember", "1");
                  navigate("/dashboard");
                } catch (e) {
                  setError(e?.message || "Error de autenticación");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="correo" className="block text-sm text-slate-200 mb-1">Email</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.713L1.5 6h21L12 12.713zM12 14.887L1.5 8.175V18h21V8.175L12 14.887z"/></svg>
                      </span>
                      <Field
                        id="correo"
                        name="correo"
                        type="email"
                        autoComplete="email"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/10 text-white placeholder-slate-300/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60"
                        placeholder="tu@correo.com"
                      />
                    </div>
                    <ErrorMessage name="correo" component="div" className="text-red-300 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm text-slate-200 mb-1">Contraseña</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a5 5 0 00-5 5v3H5a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V10a1 1 0 00-1-1h-2V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z"/></svg>
                      </span>
                      <Field
                        id="password"
                        name="password"
                        type={showPass ? "text" : "password"}
                        autoComplete="current-password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/10 text-white placeholder-slate-300/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-300 hover:text-white"
                      >
                        {showPass ? (
                          <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 110-10 5 5 0 010 10z"/></svg>
                        ) : (
                          <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M2.3 1.7L1 3l3.2 3.2C2 8.1 1 12 1 12s3 7 11 7c2.3 0 4.2-.6 5.8-1.4L21 22l1.3-1.3L2.3 1.7zM12 17c-5.4 0-8.2-4.1-9-5 .3-.4 1-1.2 2-2l2.5 2.5A5 5 0 0012 17zm8.7-5c-.5.6-1.4 1.6-2.7 2.5l-1.5-1.5A5 5 0 0012 7c-.6 0-1.2.1-1.8.3L8.7 5.8C10 5.3 11.4 5 13 5c8 0 11 7 11 7s-.5 1.2-1.3 2z"/></svg>
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-300 text-sm mt-1" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="inline-flex items-center gap-2 select-none">
                      <Field type="checkbox" name="remember" className="h-4 w-4 rounded border-white/20 bg-white/10" />
                      <span className="text-slate-300">Recordarme</span>
                    </label>
                    <Link to="/reset" className="text-blue-300 hover:text-blue-200">¿Olvidaste tu contraseña?</Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-xl transition disabled:opacity-60"
                  >
                    {isSubmitting && (
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity=".25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
                    )}
                    {isSubmitting ? "Entrando" : "Entrar"}
                  </button>

                  <p className="text-center text-sm text-slate-400">
                    ¿Sin acceso? <span className="text-slate-200">Contacta a tu administrador</span>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
