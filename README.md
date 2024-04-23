# API Node

## Descrição

Este é um projeto de uma API Node desenvolvida para um sistema bibliotecário.

## Tecnologias Utilizadas

- **Express**: Um framework web rápido, flexível e minimalista para Node.js.
- **bcrypt**: Uma biblioteca para hash de senhas.
- **dotenv**: Um módulo para carregar variáveis de ambiente a partir de um arquivo `.env`.
- **jsonwebtoken**: Uma implementação de JSON Web Tokens (JWT).
- **pg**: Um cliente PostgreSQL para Node.js.
- **swagger-ui-express**: Middleware Express para servir a interface do Swagger UI.

## Como Executar

1. **Instalação do Node.js**: Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. **Clone do Repositório**: Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/isabeldiana/api-node.git
    ```

3. **Instalação de Dependências**: Instale as dependências do projeto:

    ```bash
    cd api-node
    npm install
    ```

4. **Configuração do Ambiente**: Crie um arquivo `.env` na raiz do projeto e adicione as configurações do ambiente conforme o exemplo fornecido no arquivo `env.example`.

5. **Execução do Servidor**: Execute o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

6. **Acesso à API**: Acesse a API em `http://localhost:3001`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias neste projeto. Basta abrir uma issue ou enviar um pull request.
