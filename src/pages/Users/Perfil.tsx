import { TextField } from "@mui/material";

const Perfil = () => {
  const Users = {
    Responsavel: "Diego",
    Email: "Diego@gmail.com",
    Nascimento: "24/10/20",
    Telefone: "88888",
    NomeDoAluno: "Felipe",
    Matricula: "78215",
  };

  return (
    <>
      <h1 className="text-2xl">Informações Pessoais</h1>
      <div className="grid grid-cols-2 space-x-6 my-2">
        <div className="flex flex-col space-y-2">
          <label htmlFor="responsavel">Responsável</label>
          <TextField
            id="responsavel"
            variant="outlined"
            value={Users.Responsavel}
            disabled
          />

          <label htmlFor="email">Email</label>
          <TextField
            id="email"
            variant="outlined"
            value={Users.Email}
            disabled
          />

          <label htmlFor="nascimento">Nascimento</label>
          <TextField
            id="nascimento"
            variant="outlined"
            value={Users.Nascimento}
            disabled
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="telefone">Telefone</label>
          <TextField
            id="telefone"
            variant="outlined"
            value={Users.Telefone}
            disabled
          />

          <label htmlFor="nome-do-aluno">Nome do Aluno</label>
          <TextField
            id="nome-do-aluno"
            variant="outlined"
            value={Users.NomeDoAluno}
            disabled
          />

          <label htmlFor="matricula">Matrícula</label>
          <TextField
            id="matricula"
            variant="outlined"
            value={Users.Matricula}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default Perfil;
