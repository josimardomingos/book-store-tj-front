# Book Store Front

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), Node (>= v18) e PNPM.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Instalação

1. Clone o repositório

```sh
git clone git@github.com:josimardomingos/book-store-tj-front.git
```

2. Acesse a pasta do projeto no terminal/cmd

```sh
cd book-store-tj-front
```

3. Copie o arquivo de ambiente

```sh
cp .env.example .env
```

4. Caso não esteja usando o zsh, com atualização de variáveis de ambiente, atualize as variáveis

```sh
. .env
```

5. Execute a aplicação

```sh
pnpm dev
```

### Uso

1. Por default, o servidor iniciará na porta `3000` - [http://localhost:3000](http://localhost:3000)

2. Caso tenha subido a api em uma porta diferente da padrão `8000`, antes de executar a aplicação, altera para a porta correta no arquivo .env
