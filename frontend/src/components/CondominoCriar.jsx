import { Controller, useForm } from "react-hook-form";
import "@styles/FracaoCriar.scss";
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

function CondominoCriar() {
  let permission = false;
  let navigate = useNavigate();
  const notifySuccess = (msg) => toast.success(msg);
  let optionsFracao = [];
  let fracoes = [];

  async function getInfo() {
    const res = await axios.get("http://localhost:3000/api/get/fracoeslivres");

    // res.data.fracoes.forEach((fracao) => {
    //   console.log(fracao.id);
    // });

    return res.data;
  }

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    ["condominoCriar"],
    getInfo
  );

  const validationSchema = Yup.object({
    fracao: Yup.object().nullable().required("Preencha este campo"),
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
  });

  const onSubmit = async (formData) => {
    try {
      await axiosInstance.put("http://localhost:3000/api/create/fracao", {
        fracao: formData.fracao,
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

    data.fracoes.forEach((fracao) => {
      fracoes.push(fracao.id);
    });

    fracoes.forEach((fracao) => {
      optionsFracao.push({
        value: fracao,
        label: fracao,
      });
    });
  }

  if (permission) {
    return (
      <>
        <section className="fracao-criar">
          <h1>Criar</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper !w-1/2">
              <label>Fração</label>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsFracao}
                    className="w-full"
                    isClearable="true"
                    placeholder="Indique o tipo da fração"
                  />
                )}
                name="fracao"
                control={control}
              />
              <div className="w-full error-message">
                {errors.fracao?.message}
              </div>
            </div>
            <div className="input-wrapper flex items-center justify-between">
              <div className="input-wrapper flex flex-col pr-6">
                <label>Venda</label>
                <input
                  type="date"
                  {...register("venda")}
                  className="border-black border-solid border rounded p-2"
                />
                {errors.venda?.message}
              </div>
              <div className="input-wrapper flex flex-col pl-6">
                <label>Aquisição</label>
                <input
                  type="date"
                  {...register("aquisicao")}
                  className="border-black border-solid border rounded p-2"
                />
                {errors.aquisicao?.message}
              </div>
            </div>
            <div className="input-wrapper !w-4/6">
              <label htmlFor="nome">Nome do condómino</label>
              <input type="text" name="nome" {...register("nome")} />
              <div className="w-full error-message">{errors.nome?.message}</div>
            </div>
            <div className="input-wrapper !w-1/4">
              <label htmlFor="nif">NIF</label>
              <input
                type="text"
                name="nif"
                maxLength={9}
                size={9}
                placeholder="123456789"
                {...register("nif")}
              />
              <div className="w-full error-message">{errors.nif?.message}</div>
            </div>
            <div className="input-wrapper !w-4/6">
              <label>Morada</label>
              <input
                type="text"
                {...register("morada")}
                defaultValue={data.condominio.morada}
                readOnly
              />
            </div>
            <div className="input-wrapper !w-2/6 pl-4">
              <label>Código Postal</label>
              <input
                type="text"
                {...register("codPostal")}
                defaultValue={data.condominio.cod_postal}
                readOnly
              />
            </div>
            <div className="input-wrapper">
              <label>Telemóvel</label>
              <input
                type="text"
                name="telemovel"
                maxLength={9}
                {...register("telemovel")}
              />
              <div className="w-full error-message">
                {errors.telemovel?.message}
              </div>
            </div>
            <div className="input-wrapper flex justify-between">
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
            </div>
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

export default CondominoCriar;
