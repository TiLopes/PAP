import { Controller, useForm } from "react-hook-form";
import "@styles/FracaoCriar.scss";
import { useQuery } from "react-query";
import axios from "@helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "react-router-dom";
import axiosInstance from "@helpers/axiosInstance";

function FracaoCriar() {
  let permission = false;
  let navigate = useNavigate();

  async function getInfo() {
    const res = await axios.get("http://localhost:3000/api/showuser/me");

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

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (formData) => {
    try {
      await axiosInstance.put("http://localhost:3000/api/create/fracao", {
        fracao: formData.fracao,
        andar: formData.andar,
        escritura: formData.escritura,
        tipoFracao: formData.tipoFracao.value,
      });
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
            </div>
            <div className="input-wrapper !w-1/2 pl-4">
              <label>Andar</label>
              <input type="text" {...register("andar")} />
            </div>
            <div className="input-wrapper">
              <label>Permilagem escritura</label>
              <input
                type="text"
                {...register("escritura")}
                className="!w-1/3"
              />
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
      </>
    );
  }
}

export default FracaoCriar;
