import { Controller, useForm } from "react-hook-form";
import "@styles/AdminCondomino.scss";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "react-router-dom";
import axiosInstance from "@helpers/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";

function CondominoCriar() {
  let permission = false;
  let navigate = useNavigate();
  const notifySuccess = (msg) => toast.success(msg);
  let optionsFracao = [];
  let fracoes = [];
  const [password, setPassword] = useState("");

  async function getInfo() {
    const res = await axiosInstance.get("/api/get/fracoeslivres");

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

  function generateP() {
    var passwordChars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&/";

    let password = Array(Math.floor(Math.random() * (14 - 8 + 1)) + 8)
      .fill(passwordChars)
      .map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
      .join("");

    setPassword(password);
  }

  const validationSchema = Yup.object({
    fracao: Yup.object().nullable().required("Preencha este campo"),
    aquisicao: Yup.date("Data inválida")
      .typeError("Data inválida")
      .max(new Date(), "Escolha uma data até presente")
      .test("", "Aquisição foi feita após a venda", function (value) {
        if (value.getTime() > this.parent["venda"].getTime()) {
          return false;
        }
        return true;
      })
      .required("Preencha este campo"),
    venda: Yup.date("Data inválida")
      .typeError("Data inválida")
      .max(new Date(), "Escolha uma data até presente")
      .test("", "Venda foi feita antes da aquisição", function (value) {
        if (value.getTime() < this.parent["aquisicao"].getTime()) {
          return false;
        }
        return true;
      })
      .required("Preencha este campo"),
    nome: Yup.string().required("Preencha este campo"),
    nif: Yup.string()
      .matches(/^\d{9}$/, "NIF inválido")
      .required("Preencha este campo"),
    telemovel: Yup.string()
      .matches(/^\d{9}$/, "Número telemóvel inválido")
      .required("Preencha este campo"),
    email: Yup.string().email("Email inválido").required("Preencha este campo"),
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
    try {
      toast.promise(
        async () => {
          await axiosInstance.put("/api/create/condomino", {
            fracao: formData.fracao.value,
            aquisicao: formData.aquisicao.toISOString().slice(0, 10),
            venda: formData.venda.toISOString().slice(0, 10),
            nome: formData.nome,
            nif: formData.nif,
            telemovel: formData.telemovel,
            email: formData.email,
            password: password,
          });
        },
        {
          pending: {
            render() {
              return "A criar...";
            },
          },
          success: {
            render() {
              return "Condómino criado com sucesso";
            },
          },
          error: {
            render() {
              return "Erro ao criar condómino";
            },
          },
        }
      );
    } catch (err) {
      console.error(err);
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
        <section className="condomino-criar">
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
            <div className="input-wrapper flex items-center justify-between !mb-3">
              <div className="input-wrapper flex flex-col pr-6">
                <label>Aquisição</label>
                <input type="date" {...register("aquisicao")} />
                <div className="w-full error-message h-5">
                  {errors.aquisicao?.message}
                </div>
              </div>
              <div className="input-wrapper flex flex-col pl-6">
                <label>Venda</label>
                <input type="date" {...register("venda")} />
                <div className="w-full error-message h-5">
                  {errors.venda?.message}
                </div>
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
              <input type="text" maxLength={9} {...register("telemovel")} />
              <div className="w-full error-message">
                {errors.telemovel?.message}
              </div>
            </div>
            <div className="input-wrapper !w-1/2 pr-4">
              <label>Email</label>
              <input type="text" {...register("email")} />
              <div className="w-full error-message">
                {errors.email?.message}
              </div>
            </div>
            <div className="input-wrapper flex justify-center items-center !w-1/2 pl-4 pt-5">
              <label></label>
              <input
                type="button"
                value="Gerar password"
                className="cursor-pointer"
                onClick={generateP}
              />
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
