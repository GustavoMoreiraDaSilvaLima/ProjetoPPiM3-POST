import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processaCadastroUsuario(requisicao, resposta) {
    let conteudoResposta = ``
    const dados = requisicao.body;
    if (!(dados.nome && dados.email && dados.tel && dados.end && dados.n)) {
        //estao faltando dados do usuario
        conteudoResposta = `<!DOCTYPE html>
        <html lang="pt-br">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Gerenciar Voluntários</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
          <link href="logo3.png" rel="icon">
          <style>
            .container-a {
              display: flex;
              flex-wrap: wrap;
              /* Permite que os elementos quebrem para a próxima linha em telas menores */
              justify-content: space-between;
            }
        
            main {
              width: 100%;
              position: relative;
              background: var(--color-primary);
              padding: 60px 0 0 0;
            }
          </style>
          <script src="assets/js/logado.js"></script>
        </head>
        
        <body>
          <header>
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
              <div class="container">
                <a class="navbar-brand" href="#"><img src="logo3.png" width="40px" alt=""></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                  aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="noticias.html">Notícias</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="quem_somos.html">Quem Somos?</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="DOACAO_MAIN.html">Doar</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" id="voluntario" href="gerenciamento.html">Gerenciar Voluntario</a>
                    </li>
                  </ul>
                </div>
                <button class="btn btn-success" id="LOGADO">LOGIN</button>
              </div>
            </nav>
          </header>
        
        
        
          <main>
        
            <div>
              <h1 style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: black;text-align: center;">
                Sistema de Voluntários</h1>
            </div>
            <div class="container container-a">
        
        
              <div class="esquerda border border-dark rounded"
                style="width: 650px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin-top: 390px ;">
                <p
                  style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: white; background-color: #212529; text-align: center;">
                  Dados do Voluntário</p>
                <form action="/Registrar" style="margin-left:10px" method="POST">
                  <label for="txtnome">Nome:</label><br>
                  <input class="form-control" type="text" id="nome" name="nome" maxlength="65" size="50" value="${dados.nome}" placeholder="Nome"><br>`;
        if (!dados.nome) {
            conteudoResposta +=
                `<div>
                        <p class="text-danger">Por favor, informe o nome!</p>
                    </div>`;
        }
        conteudoResposta += `          <label for="txtemail">Endereço de E-mail:</label><br>
                  <input class="form-control" type="text" id="email" name="email" maxlength="75" size="50"
                    placeholder="Endereço de E-mail" value="${dados.email}" ><br>`;
        if (!dados.email) {
            conteudoResposta +=
                `<div>
                        <p class="text-danger">Por favor, informe o email!</p>
                    </div>`;
        }
        conteudoResposta += `         <label for="tel">Telefone:</label><br>
        <input class="form-control" type="tel" id="tel" name="tel" maxlength="18" size="50"
          placeholder="+00 (00)00000-0000" value="${dados.tel}" onkeypress="mascara('+## (##)#####-####',this,event)">`;
        if (!dados.tel) {
            conteudoResposta +=
                `<div>
                    <p class="text-danger">Por favor, informe o Telefone!</p>
                </div>`;
        }
        conteudoResposta += `         <label for="txtnome">Endereço:</label><br>
        <input class="form-control" type="text" id="end" name="end" maxlength="65" size="40" value="${dados.end}" placeholder="Rua">
        <input class="form-control" type="text" id="n" name="n" maxlength="10" size="3" value="${dados.n}" placeholder="N°"><br>`
        if (!dados.end || !dados.n) {
            conteudoResposta +=
                `<div>
                <p class="text-danger">Por favor, informe o Endereço!</p>
            </div>`;
        }
        conteudoResposta += ` 
                 <input type="reset" name="limpar" id="limpar" class="btn btn-danger" value="Limpar">
                 <input class="btn btn-success" type="submit" name="cadastrar" id="cadastrar" value="Cadastrar"
                onclick="Confirmar()">
            </form>
        </div>
        </div>

        <hr>
        </main>

        <footer class="bg-secondary d-flex flex-wrap justify-content-between align-items-center py-5"
        style="margin-top:1250px">
        <p class="col-md-4 mb-0 mx-4">&copy; 2023 Company, Inc</p>

        <ul class="nav col-md-4 mx-4 justify-content-end">
            <li class="nav-item"><a href="index.html" class="nav-link px-2 text-black">Home</a></li>
        </ul>
        </footer>
        </body>
        <script src="tabela.js"></script>

        </html>`
        resposta.end(conteudoResposta);

    }
    else {
        const usuario = {
            nome: dados.nome,
            email: dados.email,
            telefone: dados.tel,
            endereco: dados.end,
            numero: dados.n
        }

        listaUsuarios.push(usuario);



        conteudoResposta += `
    <!DOCTYPE html>
    <head>
        <title>Cadastrados</title>
        <meta charset="UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    </head>
    <body>
        <h1>Lista de Usuários Cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                </tr>
            </thead>
            <tbody>`;

        for (const usuario of listaUsuarios) {
            conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.telefone}</td>
                            <td>${usuario.endereco},${usuario.numero}</td>
                        </tr>`;
        }
        conteudoResposta += `
                        </tbody>
                    </table>
                    <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
                    <a class="btn btn-primary" href="/Registrar.html" role="button">Continuar cadastrando</a>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
                    integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
                    crossorigin="anonymous">
                </script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                    integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                    crossorigin="anonymous">
                </script>
            </html>
                `;

        resposta.end(conteudoResposta);
    }//fim do if/else
}

const app = express();

//ativar estansão que manipula requisisões HTTP
//opção false ativa a estensão querystring
//opção true ativa a extenção qs(manipula objetos(lista,aninhados))
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(process.cwd(), 'forms')));


app.get('/', (requisicao, resposta) => {
    resposta.end(`
    <!DOCTYPE html>
    <head>
        <title>Menu do Sistema</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>MENU</h1>
        <ul>
            <li><a href="Registrar.html">Cadastar Usuário</a></li>
        </ul>
    </body>
    </html>`

    );

})

app.post('/Registrar', processaCadastroUsuario);
app.get('/')


app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})

