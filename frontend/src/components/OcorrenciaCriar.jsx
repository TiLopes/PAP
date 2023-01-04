import { Controller, useForm } from "react-hook-form";
import "@styles/AdminOcorrencias.scss";
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
import { render } from "react-dom";

export default function OcorrenciaCriar() {
  let permission = false;
  let navigate = useNavigate();
  const notifySuccess = (msg) => toast.success(msg);

  async function getInfo() {
    const res = await axios.get("/api/showuser/me");

    return res.data;
  }

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    ["fracaoCriar"],
    getInfo
  );

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const validationSchema = Yup.object({
    dataOcorrencia: Yup.date("Data inválida")
      .typeError("Data inválida")
      .max(new Date(), "Escolha uma data até o presente")
      .required("Preencha este campo"),
    origem: Yup.string().required("Preencha este campo"),
    titulo: Yup.string().required("Preencha este campo"),
    descricao: Yup.string().required("Preencha este campo"),
    dataLimite: Yup.date("Data inválida")
      .typeError("Data inválida")
      .max(new Date(), "Escolha uma data até o presente")
      .test("", "Data antes da ocorrência", function (value) {
        if (value.getTime() < this.parent["dataOcorrencia"].getTime()) {
          return false;
        }
        return true;
      })
      .required("Preencha este campo"),
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

  const onSubmit = (formData) => {
    console.log(formData);
    try {
      toast.promise(
        async () => {
          await axiosInstance.get("/api/user/me");
        },
        {
          error: "Erro ao criar ocorrência",
        }
      );
    } catch (err) {
      console.error(err);
      // setError("fracao", {
      //   type: "manual",
      //   message: err.response.data.errors.fracao,
      // });
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

  if (permission) {
    return (
      <section className="ocorrencia-criar">
        <h1>Criar ocorrência</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label>Registo por</label>
            <input
              type="text"
              readOnly
              defaultValue={data.user.nome}
              {...register("criador")}
            />
          </div>
          <div className="input-wrapper">
            <label>Data da ocorrência</label>
            <input
              type="date"
              className="block"
              {...register("dataOcorrencia")}
            />
            <div className="error-message">
              {errors.dataOcorrencia?.message}
            </div>
          </div>
          <div className="input-wrapper">
            <label>Origem de</label>
            <input type="text" {...register("origem")} />
            <div className="error-message">{errors.origem?.message}</div>
          </div>
          <div className="input-wrapper">
            <label>Título</label>
            <input type="text" {...register("titulo")} />
            <div className="error-message">{errors.titulo?.message}</div>
          </div>
          <div className="input-wrapper">
            <label>Descrição</label>
            <textarea
              className="resize-none h-[10em]"
              {...register("descricao")}
            />
            <div className="error-message">{errors.descricao?.message}</div>
          </div>
          <div className="input-wrapper">
            <label>Informação adicional</label>
            <textarea
              className="resize-none h-[6em]"
              {...register("infoAdicional")}
            />
          </div>
          <div className="input-wrapper">
            <label>Data limite de resolução</label>
            <input type="date" className="block" {...register("dataLimite")} />
            <div className="error-message">{errors.dataLimite?.message}</div>
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
    );
  }
}
