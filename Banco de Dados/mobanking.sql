create database if not exists  mobanking;
-- drop database mobanking;

use mobanking;

create table if not exists plano (
	id int primary key auto_increment,
    nome varchar(45),
    descricao varchar(45));

create table if not exists servico (
	id int primary key auto_increment,
    nome varchar(45) not null,
    descricao varchar(90) not null,
    unidadeMedida varchar(45) not null);

create table if not exists plano_servico (
	fkPlano int,
    fkServico int,
		foreign key (fkPlano) references plano(id),
		foreign key (fkServico) references servico(id),
        primary key (fkPlano, fkServico));

create table if not exists logradouro (
    id int primary key auto_increment,
    tipo varchar(45) not null);

create table if not exists endereco (
    id int primary key auto_increment,
    fkLogradouro int,
    nomeLogradouro varchar(90) not null,
    numLogradouro int not null,
    cidade varchar(90) not null,
    estado varchar(90) not null,
    bairro varchar(90) not null,
    cep char(8) not null,
    complemento varchar(45) not null,
		foreign key (fkLogradouro) references logradouro(id));

create table if not exists empresa (
    id int primary key auto_increment,
    fkPlano int,
    fkEndereco int,
    razaoSocial varchar(90) not null,
    cnpj char(14) not null,
    status varchar(45),
		foreign key (fkPlano) references plano(id),
		foreign key (fkEndereco) references endereco(id));

create table if not exists tipo_usuario (
    id int primary key auto_increment,
    tipo varchar(45));

create table if not exists usuario (
    id int auto_increment,
    fkEmpresa int null,
    fkTipoUsuario int,
    nome varchar(90) not null,
    cpf char(11) not null,
    email varchar(256) not null,
    senha varchar(256) not null,
    status varchar(45),
		foreign key (fkEmpresa) references empresa(id),
		primary key (id),
		foreign key (fkTipoUsuario) references tipo_usuario(id));

create table if not exists servidor (
    id int auto_increment,
    fkEmpresa int,
    funcao varchar(90),
    status varchar(45) not null,
    mac char(17),
		foreign key (fkEmpresa) references empresa(id),
		primary key (id, fkEmpresa));

create table if not exists servico_monitorado (
	id int auto_increment,
	fkServidor INT,
    fkServico INT,
    capacidadeTotal double,
    unidadeMedida varchar(45),
    foreign key (fkServidor) references servidor(id),
    foreign key (fkServico) references servico(id),
    primary key (id, fkServidor, fkServico));

create table if not exists limite_servico_monitorado (
	id int auto_increment,
    fkServicoMonitorado int,
    valor double,
    unidadeMedida varchar(45),
		foreign key (fkServicoMonitorado)
			references servico_monitorado(id),
            primary key (id, fkServicoMonitorado));

create table if not exists registro (
    id int auto_increment,
    fkServidor int,
    fkServico int,
    valor double,
    data datetime default current_timestamp not null,
		foreign key (fkServidor)
			references servico_monitorado(fkServidor),
		foreign key (fkServico) 
			references servico_monitorado(fkServico),
            primary key (id, fkServidor, fkServico));

create table if not exists alerta (
    id int primary key auto_increment,
    fkLimiteServicoMonitorado int,
    fkEmpresa int,
    descricao varchar(90) not null,
    data datetime default current_timestamp not null,
		foreign key (fkLimiteServicoMonitorado)
			references limite_servico_monitorado(id),
		foreign key (fkEmpresa) references empresa(id));
        
create table if not exists grafico(
	id int primary key auto_increment,
    cpu double,
    ram double,
    hd double,
    rede double,
    fkEmpresa int,
    data datetime default current_timestamp not null,
    foreign key (fkEmpresa)
			references empresa(id)
);



select * from grafico;

-- ------------------------------------------------------------ INSERTS ------------------------------------------------------------ --

-- Populando a tabela usuarioDev


-- Populando a tabela plano
insert into plano (nome, descricao) values
('Básico', 'Monitoramento de CPU e RAM'),
('Intermediário', 'Monitoramento de CPU, RAM e Disco'),
('Pro', 'Monitoramento de CPU, RAM, Disco e Rede');

-- Populando a tabela servico
insert into servico (nome, descricao, unidadeMedida) values
('cpu', 'Monitoramento da utilização de CPU', 'porcentagem'),
('ram', 'Monitoramento da utilização de RAM', 'porcentagem'),
('disco', 'Monitoramento do uso de disco', 'GB'),
('rede', 'Monitoramento de dados enviados', 'Bytes');

-- Relacionando planos e serviços (plano_servico)
insert into plano_servico (fkPlano, fkServico) values
(1, 1), (1, 2), -- Plano Básico: CPU e RAM
(2, 1), (2, 2), (2, 3), -- Plano Intermediário: CPU, RAM e Disco
(3, 1), (3, 2), (3, 3), (3, 4); -- Plano Pro: CPU, RAM, Disco e Rede

-- Populando a tabela logradouro
insert into logradouro (tipo) values
('Rua'), ('Avenida'), ('Praça'), ('Travessa'), ('Alameda'),
('Bloco'), ('Quadra'), ('Estrada');

-- Populando a tabela empresa com dois clientes
insert into endereco (fkLogradouro, nomeLogradouro, numLogradouro, cidade, estado, bairro, cep, complemento) values
(1, 'Rua das Flores', 123, 'São Paulo', 'SP', 'Centro', '01001001', 'Apto 12'),
(2, 'Avenida Paulista', 1000, 'São Paulo', 'SP', 'Bela Vista', '01310000', 'Sala 45'),
(1, 'avenida das nações', 1000, 'curitiba', 'paraná', 'centro', '80000000', 'prédio 10');

insert into empresa (fkPlano, fkEndereco, razaoSocial, cnpj, status) values
(1, 1, 'Banco do Brasil', '00123456000199', 'Ativa'),
(2, 2, 'Banco Bradesco', '00345678000166', 'Ativa'),
(3, 3, 'Itaú Unibanco S.A.', '98765432000198', 'ativa');



update empresa set fkPlano = 2 where id = 1;

-- Populando a tabela tipo_usuario
insert into tipo_usuario (tipo) values ('Administrador'), ('Analista'), ('Suporte'), ('MobankingDev');

select fkEmpresa from usuario where email = 'ana@bancodobrasil.com' and senha = 'senha123';

-- Populando a tabela usuario (para cada empresa, 4 usuários: 1 Administrador, 1 Analista, 2 Suporte)
insert into usuario (fkEmpresa, fkTipoUsuario, nome, cpf, email, senha, status) values
(1, 1, 'Ana', '12345678900', 'ana@bancodobrasil.com', 'senha123', 'Ativo'), -- Banco do Brasil: Administrador
(1, 2, 'Pedro', '98765432100', 'pedro@bancodobrasil.com', 'senha123', 'Ativo'), -- Analista
(1, 3, 'Carlos', '12312312300', 'carlos@bancodobrasil.com', 'senha123', 'Ativo'), -- Suporte
(1, 3, 'Roberta', '98798798700', 'roberta@bancodobrasil.com', 'senha123', 'Ativo'), -- Suporte
(2, 1, 'Fernanda', '32165498700', 'fernanda@bradesco.com', 'senha123', 'Ativo'), -- Banco Bradesco: Administrador
(2, 2, 'João', '45678912300', 'joao@bradesco.com', 'senha123', 'Ativo'), -- Analista
(2, 3, 'Lucas', '65432178900', 'lucas@bradesco.com', 'senha123', 'Ativo'), -- Suporte
(2, 3, 'Marina', '78912345600', 'marina@bradesco.com', 'senha123', 'Ativo'), -- Suporte
(3, 1, 'Maria', '12345678901', 'maria@banco-mundial.com', 'senha123', 'ativo'), -- Banco Itaú: Administrador
(3, 2, 'Carlos', '23456789012', 'carlos@banco-mundial.com', 'senha123', 'ativo'), -- Analista
(3, 3, 'Antonio', '34567890123', 'antonio@banco-mundial.com', 'senha123', 'ativo'), -- Suporte
(3, 3, 'Fernanda', '45678901234', 'fernanda@banco-mundial.com', 'senha123', 'ativo'); -- Suporte


-- Usuarios e funcionários mobankig
insert into usuario (fkEmpresa, fkTipoUsuario, nome, cpf, email, senha, status) values
(null, 4, 'Gabriel', '12345678900', 'gabriel@gmail.com', 'mob100', 'Ativo');


insert into usuario (fkEmpresa, fkTipoUsuario, nome, cpf, email, senha, status) values
(null,4, 'Maikon', '98765432100', 'maikon@gmail.com', 'mob100', 'Ativo'),
(null,4, 'João', '12312312300', 'joao@gmail.com', 'mob100', 'Ativo'),
(null,4, 'Kauã', '98798798700', 'kaua@gmail.com', 'mob100', 'Ativo'),
(null,4, 'Julia', '32165498700', 'julia@gmail.com', 'mob100', 'Ativo'),
(null,4, 'Fabio', '45678912300', 'fabio@gmail.com', 'mob100', 'Ativo');



-- Populando a tabela servidor (4 servidores por empresa)
insert into servidor (fkEmpresa, status) values
(1, 'ativo'), (1, 'ativo'), (1, 'ativo'), (1, 'ativo'),
(2, 'ativo'), (2, 'ativo'), (2, 'ativo'), (2, 'ativo'),
(3, 'ativo'), (3, 'ativo'), (3, 'ativo'), (3, 'ativo');

-- Populando a tabela servico_monitorado para cada servidor (com base no plano da empresa)
insert into servico_monitorado (fkServidor, fkServico, capacidadeTotal, unidadeMedida) values
-- Servidores do Banco do Brasil (Plano Básico - CPU e RAM)
(1, 1, 2.3, 'GHz'), (1, 2, 8, 'GB'), 
(2, 1, 2.3, 'GHz'), (2, 2, 8, 'GB'), 
(3, 1, 2.3, 'GHz'), (3, 2, 8, 'GB'), 
(4, 1, 2.3, 'GHz'), (4, 2, 8, 'GB'), 
-- Servidores do Banco Bradesco (Plano Intermediário - CPU, RAM e Disco)
(5, 1, 3.0, 'GHz'), (5, 2, 16, 'GB'), (5, 3, 128, 'GB'),
(6, 1, 3.0, 'GHz'), (6, 2, 16, 'GB'), (6, 3, 128, 'GB'),
(7, 1, 3.0, 'GHz'), (7, 2, 16, 'GB'), (7, 3, 128, 'GB'),
(8, 1, 3.0, 'GHz'), (8, 2, 16, 'GB'), (8, 3, 128, 'GB'),
-- Servidores do Banco Itaú (Plano Pro - CPU, RAM, Disco e Rede)
(9, 1, 3.0, 'GHz'), (9, 2, 16.0, 'GB'), (9, 3, 256.0, 'GB'), (9, 4, 100.0, 'MBps'),
(10, 1, 3.0, 'GHz'), (10, 2, 32.0, 'GB'), (10, 3, 512.0, 'GB'), (10, 4, 200.0, 'MBps'),
(11, 1, 2.5, 'GHz'), (11, 2, 16.0, 'GB'), (11, 3, 128.0, 'GB'), (11, 4, 100.0, 'MBps'),
(12, 1, 3.5, 'GHz'), (12, 2, 64.0, 'GB'), (12, 3, 1.0, 'TB'), (12, 4, 500.0, 'MBps');

-- Populando a tabela limite_servico_monitorado (limites para todos os serviços monitorados em todos os servidores)
insert into limite_servico_monitorado (fkServicoMonitorado, valor, unidadeMedida) values
-- Limites para os servidores do Banco do Brasil (CPU e RAM)
(1, 80, 'porcentagem'), (2, 90, 'porcentagem'), 
(3, 80, 'porcentagem'), (4, 90, 'porcentagem'), 
(5, 80, 'porcentagem'), (6, 90, 'porcentagem'), 
(7, 80, 'porcentagem'), (8, 90, 'porcentagem'), 
-- Limites para os servidores do Banco Bradesco (CPU, RAM e Disco)
(9, 80, 'porcentagem'), (10, 90, 'porcentagem'), (11, 70, 'GB'),
(12, 80, 'porcentagem'), (13, 90, 'porcentagem'), (14, 70, 'GB'),
(15, 80, 'porcentagem'), (16, 90, 'porcentagem'), (17, 70, 'GB'),
(18, 80, 'porcentagem'), (19, 90, 'porcentagem'), (20, 70, 'GB'),
-- Limites para os servidores do Banco Itaú (Plano Pro - CPU, RAM, Disco e Rede)
(9, 90.0, '%'), (9, 14.0, 'GB'), (9, 240.0, 'GB'), (9, 90.0, 'MBps'),
(10, 90.0, '%'), (10, 28.0, 'GB'), (10, 480.0, 'GB'), (10, 180.0, 'MBps'),
(11, 90.0, '%'), (11, 14.0, 'GB'), (11, 120.0, 'GB'), (11, 90.0, 'MBps'),
(12, 90.0, '%'), (12, 58.0, 'GB'), (12, 900.0, 'GB'), (12, 450.0, 'MBps');

-- Populando a tabela registro (4 registros por serviço monitorado em todos os servidores)
insert into registro (fkServidor, fkServico, valor) values
-- Servidores do Banco do Brasil (CPU e RAM)
(1, 1, 45), (1, 1, 50), (1, 1, 60), (1, 1, 75),
(1, 2, 30), (1, 2, 40), (1, 2, 60), (1, 2, 80),
(2, 1, 45), (2, 1, 55), (2, 1, 65), (2, 1, 85),
(2, 2, 35), (2, 2, 45), (2, 2, 65), (2, 2, 85),
(3, 1, 45), (3, 1, 50), (3, 1, 65), (3, 1, 75),
(3, 2, 35), (3, 2, 50), (3, 2, 70), (3, 2, 85),
(4, 1, 40), (4, 1, 55), (4, 1, 65), (4, 1, 75),
(4, 2, 30), (4, 2, 50), (4, 2, 70), (4, 2, 90),
-- Servidores do Banco Bradesco (CPU, RAM, Disco)
(5, 1, 50), (5, 1, 60), (5, 1, 70), (5, 1, 90),
(5, 2, 30), (5, 2, 50), (5, 2, 70), (5, 2, 90),
(5, 3, 40), (5, 3, 50), (5, 3, 80), (5, 3, 100),
(6, 1, 55), (6, 1, 65), (6, 1, 75), (6, 1, 85),
(6, 2, 35), (6, 2, 55), (6, 2, 75), (6, 2, 95),
(6, 3, 50), (6, 3, 60), (6, 3, 90), (6, 3, 120),
(7, 1, 60), (7, 1, 70), (7, 1, 80), (7, 1, 95),
(7, 2, 40), (7, 2, 60), (7, 2, 80), (7, 2, 100),
(7, 3, 60), (7, 3, 70), (7, 3, 100), (7, 3, 130),
(8, 1, 50), (8, 1, 65), (8, 1, 80), (8, 1, 90),
(8, 2, 35), (8, 2, 55), (8, 2, 75), (8, 2, 95),
(8, 3, 40), (8, 3, 60), (8, 3, 80), (8, 3, 100),
-- Servidores do Banco Itaú (CPU, RAM, Disco, Rede)
(9, 1, 80.0), (9, 1, 85.0), (9, 1, 87.0), (9, 1, 89.0),
(9, 2, 10.0), (9, 2, 12.0), (9, 2, 13.0), (9, 2, 14.0),
(9, 3, 200.0), (9, 3, 210.0), (9, 3, 220.0), (9, 3, 230.0),
(9, 4, 75.0), (9, 4, 80.0), (9, 4, 85.0), (9, 4, 90.0),
(10, 1, 75.0), (10, 1, 78.0), (10, 1, 82.0), (10, 1, 88.0),
(10, 2, 25.0), (10, 2, 27.0), (10, 2, 30.0), (10, 2, 32.0),
(10, 3, 400.0), (10, 3, 420.0), (10, 3, 450.0), (10, 3, 480.0),
(10, 4, 150.0), (10, 4, 160.0), (10, 4, 170.0), (10, 4, 180.0),
(11, 1, 70.0), (11, 1, 72.0), (11, 1, 74.0), (11, 1, 76.0),
(11, 2, 12.0), (11, 2, 13.0), (11, 2, 14.0), (11, 2, 15.0),
(11, 3, 100.0), (11, 3, 110.0), (11, 3, 115.0), (11, 3, 120.0),
(11, 4, 80.0), (11, 4, 85.0), (11, 4, 88.0), (11, 4, 90.0),
(12, 1, 85.0), (12, 1, 87.0), (12, 1, 88.0), (12, 1, 90.0),
(12, 2, 55.0), (12, 2, 56.0), (12, 2, 57.0), (12, 2, 58.0),
(12, 3, 800.0), (12, 3, 850.0), (12, 3, 900.0), (12, 3, 950.0),
(12, 4, 400.0), (12, 4, 410.0), (12, 4, 420.0), (12, 4, 450.0);


-- Populando a tabela alerta (2 alertas por serviço monitorado em todos os servidores)
insert into alerta (fkLimiteServicoMonitorado, fkEmpresa, descricao) values
-- Alertas para os servidores do Banco do Brasil
(1, 1, 'Utilização de CPU acima de 80%'), (2, 1, 'Utilização de RAM acima de 90%'),
(3, 1, 'Utilização de CPU acima de 80%'), (4, 1, 'Utilização de RAM acima de 90%'),
(5, 1, 'Utilização de CPU acima de 80%'), (6, 1, 'Utilização de RAM acima de 90%'),
(7, 1, 'Utilização de CPU acima de 80%'), (8, 1, 'Utilização de RAM acima de 90%'),
-- Alertas para os servidores do Banco Bradesco
(9, 2, 'Utilização de CPU acima de 80%'), (10, 2, 'Utilização de RAM acima de 90%'),
(11, 2, 'Utilização de Disco acima de 70GB'), (12, 2, 'Utilização de CPU acima de 80%'),
(13, 2, 'Utilização de RAM acima de 90%'), (14, 2, 'Utilização de Disco acima de 70GB'),
(15, 2, 'Utilização de CPU acima de 80%'), (16, 2, 'Utilização de RAM acima de 90%'),
(17, 2, 'Utilização de Disco acima de 70GB'), (18, 2, 'Utilização de CPU acima de 80%'),
(19, 2, 'Utilização de RAM acima de 90%'), (20, 2, 'Utilização de Disco acima de 70GB'),
-- Alertas para os servidores do Banco Itaú
(9, 3, 'CPU acima de 85% no servidor 1'), (9, 3, 'CPU atingiu 89% no servidor 1'),
(10, 3, 'RAM acima de 12 GB no servidor 1'), (10, 3, 'RAM atingiu 14 GB no servidor 1'),
(11, 3, 'Disco acima de 220 GB no servidor 1'), (11, 3, 'Disco atingiu 230 GB no servidor 1'),
(12, 3, 'Rede acima de 85 MBps no servidor 1'), (12, 3, 'Rede atingiu 90 MBps no servidor 1'),
(13, 3, 'CPU acima de 80% no servidor 2'), (13, 3, 'CPU atingiu 88% no servidor 2'),
(14, 3, 'RAM acima de 30 GB no servidor 2'), (14, 3, 'RAM atingiu 32 GB no servidor 2'),
(15, 3, 'Disco acima de 450 GB no servidor 2'), (15, 3, 'Disco atingiu 480 GB no servidor 2'),
(16, 3, 'Rede acima de 170 MBps no servidor 2'), (16, 3, 'Rede atingiu 180 MBps no servidor 2'),
(17, 3, 'CPU acima de 74% no servidor 3'), (17, 3, 'CPU atingiu 76% no servidor 3'),
(18, 3, 'RAM acima de 14 GB no servidor 3'), (18, 3, 'RAM atingiu 15 GB no servidor 3'),
(19, 3, 'Disco acima de 115 GB no servidor 3'), (19, 3, 'Disco atingiu 120 GB no servidor 3'),
(20, 3, 'Rede acima de 88 MBps no servidor 3'), (20, 3, 'Rede atingiu 90 MBps no servidor 3'),
(21, 3, 'CPU acima de 88% no servidor 4'), (21, 3, 'CPU atingiu 90% no servidor 4'),
(22, 3, 'RAM acima de 57 GB no servidor 4'), (22, 3, 'RAM atingiu 58 GB no servidor 4'),
(23, 3, 'Disco acima de 900 GB no servidor 4'), (23, 3, 'Disco atingiu 950 GB no servidor 4'),
(24, 3, 'Rede acima de 420 MBps no servidor 4'), (24, 3, 'Rede atingiu 450 MBps no servidor 4');

-- ------------------------------------------------------------ VIEWS ------------------------------------------------------------ --

-- ------------------------------ view endereço empresas ------------------------------ --

create view vw_empresa_endereco as
select 
    e.id as id_empresa,
    e.razaoSocial,
    e.cnpj,
    e.fkEndereco,
    e.status,
    en.nomeLogradouro,
    en.numLogradouro,
    en.cidade,
    en.estado,
    en.bairro,
    en.cep,
    en.complemento,
    l.tipo as tipo_logradouro,
    l.id as id_logradouro
from 
    empresa e
join 
    endereco en on e.fkEndereco = en.id
join 
    logradouro l on en.fkLogradouro = l.id;

select * from vw_empresa_endereco;


-- ------------------------------ view registro servico servidor servicomonitorado ------------------------------ --


create view vw_registro_servico as
select 
    r.id as id_registro,
    r.valor,	
    r.data,
    s.funcao as funcao_servidor,
    sr.nome as servico_nome,
    sr.descricao as descricao_servico,
    sr.unidadeMedida as unidade_medida_servico,
    sm.capacidadeTotal as capacidade_total_servico,
    sm.fkServidor,
    sm.fkServico
from 
    registro r
join 
    servico_monitorado sm on r.fkServidor = sm.fkServidor and r.fkServico = sm.fkServico
join 
    servidor s on sm.fkServidor = s.id
join 
    servico sr on sm.fkServico = sr.id
join 
    empresa e on s.fkEmpresa = e.id;


-- ------------------------------ view select cards ------------------------------ --


create view vw_servidor_card as
select 
    vrs_cpu.fkServidor as id_servidor,
    s.fkEmpresa as id_empresa,
    s.status,
    e.razaoSocial as nome_empresa,
    max(vrs_cpu.valor) as valorCpu,
    max(vrs_cpu.capacidade_total_servico) as capacidade_total_cpu,
    max(vrs_ram.valor) as valorRam,
    max(vrs_ram.capacidade_total_servico) as capacidade_total_ram,
    max(vrs_disco.valor) as valorDisco,
    max(vrs_disco.capacidade_total_servico) as capacidade_total_disco,
    max(vrs_rede.valor) as valorRede,
    max(vrs_rede.capacidade_total_servico) as capacidade_total_rede,
    greatest(
        max(vrs_cpu.data), 
        max(vrs_ram.data), 
        max(vrs_disco.data), 
        max(vrs_rede.data), 
        max(coalesce(vrs_disco.data, vrs_cpu.data))
    ) as data
from 
    (select fkServidor, valor, data, capacidade_total_servico
     from vw_registro_servico 
     where servico_nome = 'cpu') as vrs_cpu
join 
    servidor s on vrs_cpu.fkServidor = s.id
join 
    empresa e on s.fkEmpresa = e.id
left join 
    (select fkServidor, valor, data, capacidade_total_servico
     from vw_registro_servico 
     where servico_nome = 'ram') as vrs_ram 
    on vrs_cpu.fkServidor = vrs_ram.fkServidor
left join 
    (select fkServidor, valor, data, capacidade_total_servico
     from vw_registro_servico 
     where servico_nome = 'disco') as vrs_disco 
    on vrs_cpu.fkServidor = vrs_disco.fkServidor
left join 
    (select fkServidor, valor, data, capacidade_total_servico
     from vw_registro_servico 
     where servico_nome = 'rede') as vrs_rede 
    on vrs_cpu.fkServidor = vrs_rede.fkServidor
group by vrs_cpu.fkServidor, s.fkEmpresa, e.razaoSocial
order by data desc
limit 0, 1000;


-- Esse selct estava travando meu workbench, então comentei (md)
select * from vw_servidor_card where id_empresa = 1 order by id_servidor ;

select * from vw_servidor_card where id_empresa = 1 and status = 'ativo' order by id_servidor ;

-- ------------------------------ view para extração no (r) média cada componente ------------------------------ --

create view media_servico_servidor as
select 
    sm.fkServidor as id,  -- id do servidor
    s.fkEmpresa as fkEmpresa,  -- id da empresa
    avg(case when sr.nome = 'cpu' then r.valor else null end) as cpu,  -- média de cpu
    avg(case when sr.nome = 'ram' then r.valor else null end) as ram,  -- média de ram
    avg(case when sr.nome = 'disco' then r.valor else null end) as hd,  -- média de hd
    avg(case when sr.nome = 'rede' then r.valor else null end) as rede,  -- média de rede
    max(r.data) as data  -- data do registro mais recente
from 
    vw_registro_servico r  -- referência à view existente
join 
    servico_monitorado sm on r.fkServidor = sm.fkServidor and r.fkServico = sm.fkServico
join 
    servico sr on sm.fkServico = sr.id
join 
    servidor s on sm.fkServidor = s.id  -- join com a tabela servidor
join 
    empresa e on s.fkEmpresa = e.id  -- join com a tabela empresa
group by 
    sm.fkServidor, s.fkEmpresa;  -- agrupar pelo id do servidor e id da empresa



select * from media_servico_servidor;

-- ------------------------------ view usuario empresa ------------------------------ --


create view vw_usuario_empresa as
select 
    u.id as idUsuario,
    u.nome as nomeUsuario,
    u.cpf as cpfUsuario,
    u.email as emailUsuario,
    u.senha,
    e.id as idEmpresa,
    e.fkPlano,
    e.razaoSocial as razaoSocial,
    e.cnpj as cnpjEmpresa,
    tu.id as idTipoUsuario,
    tu.tipo as tipoUsuario
from 
    usuario u
left join 
    empresa e on u.fkEmpresa = e.id
left join 
    tipo_usuario tu on u.fkTipoUsuario = tu.id;

select * from vw_usuario_empresa where idEmpresa = 1 AND idUsuario != 1;

select * from vw_usuario_empresa;

-- ------------------------------ view listagem alertas ------------------------------ --

create view vw_alertas as
select 
    a.id as alerta_id,
    a.descricao as alerta_descricao,
    a.data as alerta_data,
    lsm.valor as limite_valor,
    lsm.unidadeMedida as limite_unidade,
    e.id as id_empresa,
    s.id as id_servidor,
    sm.fkServico as id_servico,
    se.nome as nome_servico,
    sm.capacidadeTotal as capacidade_total,
    e.razaoSocial as empresa_nome,
    s.funcao as servidor_funcao
from 
    alerta a
join 
    limite_servico_monitorado lsm on a.fkLimiteServicoMonitorado = lsm.id
join 
    servico_monitorado sm on lsm.fkServicoMonitorado = sm.id
join 
    servidor s on sm.fkServidor = s.id
join 
    empresa e on s.fkEmpresa = e.id
join 
    servico se on sm.fkServico = se.id;

select * from vw_alertas;

select * from registro where fkServidor = 9 and fkServico = 4 order by data desc limit 1;

select idUsuario, nomeUsuario, cpfUsuario, emailUsuario, tipoUsuario from vw_usuario_empresa where idEmpresa = 1;