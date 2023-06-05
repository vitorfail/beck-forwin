### Preparando o terreno

Primeiro tenha o `node.js` instalado em usa máquina. Na pasta do projeto execute o comando `npm install`
Com isso todas as dependências necessárias serão instaladas.

### Variáveis de ambiente

No arquivo `.env` á três variáveis de ambiente. `PRIVATE_KEY`,`DATABASE_URL`,`DIALECT`.

`PRIVATE_KEY:` É a chave usada para a criação do `token` de usuário. Pode ser qualquer valor, mas recomenda-se 
um caracter longo e complexo.

`DATABASE_URL:` É o link para o banco de dados. No caso desse projeto o link é referente a um banco PostgerSQl armazenado gratuitamente no [ElephantSQL](https://www.elephantsql.com/).

`DIALECT:` Serve para definir o tipo de banco de dados SQL no qual vamos no comunicar. No caso desse projeto é o `postgres`

`TOKEN_TIME:` Define o tempo de duração que o `token` dos usuários terá. Após ele se expirar o usuário terá que efeutar um novo login.

### `Execução`

Tendo seguido atentamente todos os passos agora só precisa abrir a pasta do projeto no terminal e executar o 
comando `node index.tsx`