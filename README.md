# 🍔 BurgerLivery - Sistema de Pedidos Online

## 📌 Integrantes do Grupo

- **Rodrigo Giorge** - RM: 353166
- **Anderson Nunes** - RM: 353682
- **Rafael Alves** - RM: 353169
- **Lucas Marques** - RM: 353170

## 📝 Sobre o Projeto

O **BurgerLivery** é um sistema de pedidos online para hamburguerias, permitindo que clientes naveguem pelo cardápio, adicionem itens ao carrinho e realizem pedidos de forma prática e rápida. O sistema também conta com integração via API para gerenciamento de pedidos.

## 🚀 Como Rodar o Projeto Localmente

### 🔧 **Pré-requisitos**
Antes de começar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 16 ou superior)
- **NPM** (ou Yarn, se preferir)
- **Vue CLI** (caso ainda não tenha, instale com `npm install -g @vue/cli`)

### 📥 **1. Clonar o repositório**
```sh
git clone https://github.com/seu-repositorio/burgerlivery.git
cd burgerlivery
```

### 📦 **2. Instalar dependências**
```sh
npm install
```

### ▶ **3. Rodar o projeto em ambiente de desenvolvimento**
```sh
npm run dev
```
O projeto estará disponível em `http://localhost:5173` (ou outra porta exibida no terminal).

### 🏗 **4. Build para produção**
Se desejar gerar os arquivos otimizados para produção:
```sh
npm run build
```
Os arquivos gerados ficarão na pasta `dist/`.

## 🔗 **Tecnologias Utilizadas**
- **Vue 3** - Framework frontend
- **Pinia** - Gerenciamento de estado
- **Axios** - Requisições HTTP
- **Vite** - Ferramenta para build e desenvolvimento rápido
- **TypeScript** - Para tipagem estática e maior segurança no código

## 🌍 **API de Integração**
O projeto se comunica com a API do **BurgerLivery**, localizada em:
```sh
https://burgerlivery-api.vercel.app/
```

Exemplo de chamada para criar um pedido:
```sh
curl --location 'https://burgerlivery-api.vercel.app/order/create-order' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer SEU_TOKEN_AQUI' \
--data '{
   "items": [
      { "title": "Hambúrguer Clássico", "value": 29.90 }
   ],
   "paymentOption": "Cartão de Crédito"
}'
```

## 🛠 **Possíveis Problemas e Soluções**

**Erro: `Missing script: "serve"`**
- Use `npm run dev` ao invés de `npm run serve` (o projeto utiliza Vite, não Vue CLI).

**Erro: `Module not found` ao rodar `npm install`**
- Tente apagar `node_modules` e `package-lock.json` e reinstalar:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```

