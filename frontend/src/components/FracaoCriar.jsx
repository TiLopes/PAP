import { Controller, useForm } from "react-hook-form";
import "@styles/AdminFracoes.scss";
import { useQuery } from "react-query";
import axios from "@helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "react-router-dom";
import axiosInstance from "@helpers/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function FracaoCriar() {
  let permission = false;
  let navigate = useNavigate();
  const notifySuccess = (msg) => toast.success(msg);

  async function getInfo() {
    const res = await axios.get("/api/showuser/me");

    return res.data;
  }

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    ["fracaoCriar"],
    getInfo
  );

  const validationSchema = Yup.object({
    fracao: Yup.string().required("Preencha este campo"),
    andar: Yup.string().required("Preencha este campo"),
    escritura: Yup.string()
      .required("Preencha este campo")
      .matches(/^\d*$/, "Valor inválido"),
    tipoFracao: Yup.object().nullable().required("Preencha este campo"),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      escritura: 0,
    },
  });

  const onSubmit = async (formData) => {
    try {
      await axiosInstance.put("/api/create/fracao", {
        fracao: formData.fracao,
        andar: formData.andar,
        escritura: formData.escritura,
        tipoFracao: formData.tipoFracao.value,
      });
      notifySuccess("Fração criada com sucesso!");
    } catch (err) {
      console.error(err);
      setError("fracao", {
        type: "manual",
        message: err.response.data.errors.fracao,
      });
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return Redirect();
  }

  if (isSuccess) {
    permission = true;
  }

  const optionsTipoFracao = [
    { value: "Administração", label: "Administração" },
    { value: "Apartamento", label: "Apartamento" },
    { value: "Arrumos", label: "Arrumos" },
    { value: "Atelier", label: "Atelier" },
    { value: "Auditório", label: "Auditório" },
    { value: "Cave", label: "Cave" },
    { value: "Escritório", label: "Escritório" },
    { value: "Garagem", label: "Garagem" },
    { value: "Loja", label: "Loja" },
    { value: "Restaurante/Cafetaria", label: "Restaurante/Cafetaria" },
    { value: "Segurança", label: "Segurança" },
    { value: "Sótão", label: "Sótão" },
  ];

  if (permission) {
    return (
      <>
        <section className="fracao-criar">
          <h1>Criar</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper !w-1/2">
              <label>Fração</label>
              <input type="text" {...register("fracao")} />
              <div className="w-full error-message">
                {errors.fracao?.message}
              </div>
            </div>
            <div className="input-wrapper !w-1/2 pl-4">
              <label>Andar</label>
              <input type="text" {...register("andar")} />
              <div className="w-full error-message">
                {errors.andar?.message}
              </div>
            </div>
            <div className="input-wrapper">
              <label>Permilagem escritura</label>
              <input
                type="text"
                {...register("escritura", { valueAsNumber: true })}
                className="!w-1/3"
              />
              <div className="w-full error-message">
                {errors.escritura?.message}
              </div>
            </div>
            <div className="input-wrapper !w-4/6">
              <label>Morada</label>
              <input
                type="text"
                {...register("morada")}
                defaultValue={data.user.morada}
                readOnly
              />
            </div>
            <div className="input-wrapper !w-2/6 pl-4">
              <label>Código Postal</label>
              <input
                type="text"
                {...register("codPostal")}
                defaultValue={data.user.codPostal}
                readOnly
              />
            </div>
            <div className="input-wrapper">
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsTipoFracao}
                    className="w-full"
                    isClearable="true"
                    placeholder="Indique o tipo da fração"
                  />
                )}
                name="tipoFracao"
                control={control}
              />
              <div className="w-full error-message">
                {errors.tipoFracao?.message}
              </div>
            </div>

            <input
              type="submit"
              value={"Criar"}
              className="cursor-pointer font-bold"
            />
            <input
              type={"button"}
              onClick={() => navigate(-1)}
              value="Cancelar"
              className="cursor-pointer font-bold"
            />
          </form>
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="colored"
          />
        </section>
      </>
    );
  }
}

export default FracaoCriar;
