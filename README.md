# Recuperação de senha

**RF** => Requisitos Funcionais - Ligados a regra de negócio

- O usuário deve poder recuperar sua senha informando o seu e-amil;
- O usuário deve receber um e-mail com instruçoes de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** => Requisitos Não Funcionanis - Não ligados a regra de negócio, focados na parte técnica ( libs, bco de dados)

- Utilizar o Mailtrap para testar envios em ambiente de dev;
- Utilizar o Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano ( background job );


**RN** => Regras de negócio

- O link enviado por email para resetar senha, deve expirar em 2h.
- O usuário  precisa confirmar a nova senha ao reseter sua senha.


# Atualização do Perfil

**RF** => Requisitos Funcionais - Ligados a regra de negócio

- O usuario deve poder atualizar seu nome, email e senha.


**RN** => Regras de negócio

- O usuário não pode alterar seu e-mail para um email já utilizado por outro usuario.
- Para atualizar sua senha o usuario deve informar a senha antiga.
- Para atualizar sua senha o usuário precisa confirmar a nova senha.

# Painel do Prestador

**RF**

- O usuario deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificaçao sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notifiaçoes nao lidas.

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificaçoes do prestador devem ser armazenadas no MongoDB;
- As notificaçoes do prestador devem ser emviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou nao-lida

# Agendamento de Serviços

**RF**

- O usuario deve poder listar todos os prestadores de serviço cadastrados.
- O usuario deve poder listar os dias de um mês com pelo menos um horário deisponível de um prestador;
- O usuario deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;


**RNF**

A listagem de prestadores devem ser armazeanda em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h as 18h. ( Primeiro as 8h, ultimo as 17h);
- O usuario não pode agendar em um horário já ocupado;
- O usuário nao pode agendar em um horário que já passou;
- O usuario nao pode agendar serviços para si mesmo;


