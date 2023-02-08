
## Descrição

  

Api para validar e adicionar CPFs a uma lista restrita

  

## Instalação

  

```bash

$ npm install # Instalação dos pacotes

$ docker-compose up postgres -d # Iniciar servidor postgres pelo docker

$ npx prisma migrate dev --name init # Fazer a criação das tabelas necessárias no banco de dados

```

  

## Rodando a aplicação

  

```bash

# Padrão

$ npm  run  start:dev


# Docker

$ docker-compose up -d postgres cpfservice

# Para acompanhar logs do servidor no docker

$ docker ps # Mostrar containers
$ docker logs -f <Container_ID> # Colocar id do container cpfservices

```

O Servidor irá rodar na porta 8000 e você poderá consumir a api a partir de http://localhost:8000 e consultar a documentação da api em http://localhost:8000/api
  

## Testes

  

```bash

# Testes unitários

$ npm  run  test

```
  

## Caso tenha erros

  

- Erro ao rodar a api
  - Não encontrou o servidor: No arquivo *docker-compose.yml* modifique na linha 13 o *host.docker.internal* pelo ip do seu computador. (ex: ipv4 obtido pelo comando ipconfig no windows na seção *Adaptador de Rede sem Fio Wi-Fi*)
  - Não está funcionando na forma de execução padrão: Verificar se a versão do node 16.15.1+

  

## Mantenha contato

  

- Linkedin - [Luciano Sizilio](https://www.linkedin.com/in/luciano-sizilio-1316a5187/)

  
