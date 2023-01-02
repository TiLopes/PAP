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

  if (permission) {
    return (
      <section className="ocorrencia-criar">
        <h1>Criar ocorrência</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label>Registo por</label>
            <input type="text" readOnly />
          </div>
          <div className="input-wrapper">
            <label>Data da ocorrência</label>
            <input type="date" />
          </div>
          <div className="input-wrapper">
            <label>Registo por</label>
            <input type="text" />
          </div>
          <div className="input-wrapper">
            <label>Registo por</label>
            <input type="text" />
          </div>
          <div className="input-wrapper">
            <label>Registo por</label>
            <input type="text" />
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
      </section>
    );
  }
}
