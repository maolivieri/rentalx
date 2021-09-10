**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de negócio

#Carros

## Cadastro de Carros

**RF**
Deve ser possível cadastral um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar o carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado como disponivel por padrão.
O usuário responsável pelo cadastro deve ser admin.

## Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possivel listar todos os carros disponivies pela categoria.
Deve ser possivel listar todos os carros disponivies pela marca.
Deve ser possivel listar todos os carros disponivies pelo nome.

**RN**
O usuário não precis estar logado no sistema.

## Cadastro de Especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Dever ser possivel listar todos os carros.

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não existente.
Não deve ser possivel registrar uma especifição já existente para um carro.
O usuário responsável pelo cadastro deve ser admin.

## Cadastro de imagens do carro

**RF**

**RNF**
Utilizar o multer para upload de arquivo

**RN**
Pode mais de uma imagem por carro
O usuário responsável pelo cadastro deve ser admin.

## Aluguel do carro

**RF**

**RN**
Duracao minima de 24 horas
Nao deve ser possivel cadastrar caso ja exista aberto ...
