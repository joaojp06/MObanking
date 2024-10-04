create database if not exists  mobanking;
-- drop database mobanking;

use mobanking;

create table if not exists usuarioDev (
	id int primary key,
    nome varchar(45),
    email varchar(256),
    senha varchar(256));

create table if not exists plano (
	id int primary key auto_increment,
    nome varchar(45),
    descricao varchar(45));

create table if not exists servico (
	id int primary key auto_increment,
    nome varchar(45) not null,
    descricao varchar(90) not null,
    unidadeMedida varchar(45) not null);

create table if not exists planoServico (
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

create table if not exists tipoUsuario (
    id int primary key auto_increment,
    tipo varchar(45));

create table if not exists usuario (
    id int auto_increment,
    fkEmpresa int,
    fkTipoUsuario int,
    nome varchar(90) not null,
    cpf char(11) not null,
    email varchar(256) not null,
    senha varchar(256) not null,
    status varchar(45),
		foreign key (fkEmpresa) references empresa(id),
		primary key (id, fkEmpresa),
		foreign key (fkTipoUsuario) references tipoUsuario(id));

create table if not exists servidor (
    id int auto_increment,
    fkEmpresa int,
    funcao varchar(90) not null,
		foreign key (fkEmpresa) references empresa(id),
		primary key (id, fkEmpresa));

create table if not exists servicoMonitorado (
	id int auto_increment,
	fkServidor INT,
    fkServico INT,
    capacidadeTotal double,
    unidadeMedida varchar(45),
    foreign key (fkServidor) references servidor(id),
    foreign key (fkServico) references servico(id),
    primary key (id, fkServidor, fkServico));

create table if not exists limiteServicoMonitorado (
	id int auto_increment,
    fkServicoMonitorado int,
    valor double,
    unidadeMedida varchar(45),
		foreign key (fkServicoMonitorado)
			references servicoMonitorado(id),
            primary key (id, fkServicoMonitorado));

create table if not exists registro (
    id int auto_increment,
    fkServidor int,
    fkServico int,
    valor double,
    data datetime default current_timestamp not null,
		foreign key (fkServidor)
			references servicoMonitorado(fkServidor),
		foreign key (fkServico) 
			references servicoMonitorado(fkServico),
            primary key (id, fkServidor, fkServico));

create table if not exists alerta (
    id int primary key auto_increment,
    fkLimiteServicoMonitorado int,
    fkEmpresa int,
    descricao varchar(90) not null,
    data datetime default current_timestamp not null,
		foreign key (fkLimiteServicoMonitorado)
			references limiteServicoMonitorado(id),
		foreign key (fkEmpresa) references empresa(id));

-- ------------------------------------------------------------ INSERTS ------------------------------------------------------------ --

-- Populando a tabela usuarioDev
insert into usuarioDev (id, nome, email, senha) values
(1, 'Gabriel', 'gabriel@gmail.com', 'mob100'),
(2, 'Maikon', 'maikon@gmail.com', 'mob100'),
(3, 'João', 'joao@gmail.com', 'mob100'),
(4, 'Kauã', 'kaua@gmail.com', 'mob100'),
(5, 'Julia', 'julia@gmail.com', 'mob100'),
(6, 'Fabio', 'fabio@gmail.com', 'mob100');

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

-- Relacionando planos e serviços (planoServico)
insert into planoServico (fkPlano, fkServico) values
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
(3, 3, 'Itaú Unibanco S.A.', '98765432000198', 'ativo');

-- Populando a tabela tipoUsuario
insert into tipoUsuario (tipo) values ('Administrador'), ('Analista'), ('Suporte');

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
(3, 1, 'maria', '12345678901', 'maria@banco-mundial.com', 'senha123', 'ativo'), -- Banco Itaú: Administrador
(3, 2, 'carlos', '23456789012', 'carlos@banco-mundial.com', 'senha123', 'ativo'), -- Analista
(3, 3, 'antonio', '34567890123', 'antonio@banco-mundial.com', 'senha123', 'ativo'), -- Suporte
(3, 3, 'fernanda', '45678901234', 'fernanda@banco-mundial.com', 'senha123', 'ativo'); -- Suporte

-- Populando a tabela servidor (4 servidores por empresa)
insert into servidor (fkEmpresa, funcao) values
(1, 'Servidor de Autenticação'), (1, 'Servidor de Backup'), (1, 'Servidor de BD'), (1, 'Servidor Web'),
(2, 'Servidor de Autenticação'), (2, 'Servidor de Backup'), (2, 'Servidor de BD'), (2, 'Servidor Web'),
(3, 'Servidor de autenticação'), (3, 'Servidor de BD'), (3, 'Servidor de arquivos'), (3, 'Servidor web');

-- Populando a tabela servicoMonitorado para cada servidor (com base no plano da empresa)
insert into servicoMonitorado (fkServidor, fkServico, capacidadeTotal, unidadeMedida) values
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

-- Populando a tabela limiteServicoMonitorado (limites para todos os serviços monitorados em todos os servidores)
insert into limiteServicoMonitorado (fkServicoMonitorado, valor, unidadeMedida) values
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

drop view vw_empresa_endereco;

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
    servicoMonitorado sm on r.fkServidor = sm.fkServidor and r.fkServico = sm.fkServico
join 
    servidor s on sm.fkServidor = s.id
join 
    servico sr on sm.fkServico = sr.id
join 
    empresa e on s.fkEmpresa = e.id;


select * from vw_registro_servico order by data;


-- ------------------------------ view select cards ------------------------------ --


create view vw_servidor_card as
select 
    vrs_cpu.fkservidor as id_servidor,
    s.fkEmpresa as id_empresa,
    e.razaoSocial as nome_empresa,
    max(vrs_cpu.valor) as valorCpu,
    max(vrs_ram.valor) as valorRam,
    max(vrs_disco.valor) as valorRisco,
    max(vrs_rede.valor) as valorRede,
    greatest(
        max(vrs_cpu.data), 
        max(vrs_ram.data), 
        max(vrs_disco.data), 
        max(vrs_rede.data), 
        max(coalesce(vrs_disco.data, vrs_cpu.data))
    ) as data
from 
    (select fkservidor, valor, data 
     from vw_registro_servico 
     where servico_nome = 'cpu') as vrs_cpu
join 
    servidor s on vrs_cpu.fkservidor = s.id
join 
    empresa e on s.fkEmpresa = e.id
left join 
    (select fkservidor, valor, data 
     from vw_registro_servico 
     where servico_nome = 'ram') as vrs_ram 
    on vrs_cpu.fkservidor = vrs_ram.fkservidor
left join 
    (select fkservidor, valor, data 
     from vw_registro_servico 
     where servico_nome = 'disco') as vrs_disco 
    on vrs_cpu.fkservidor = vrs_disco.fkservidor
left join 
    (select fkservidor, valor, data 
     from vw_registro_servico 
     where servico_nome = 'rede') as vrs_rede 
    on vrs_cpu.fkservidor = vrs_rede.fkservidor
group by vrs_cpu.fkservidor, s.fkEmpresa, e.razaoSocial
order by data desc
limit 0, 1000;

select * from vw_servidor_card order by id_servidor;

-- ------------------------------ view para extração no (r) ------------------------------ --


create view vw_extracao_r as
select 
    sm.fkServidor as id,  -- id do servidor
    max(case when sr.nome = 'cpu' then r.valor end) as cpu,  -- valor de cpu
    max(case when sr.nome = 'ram' then r.valor end) as ram,  -- valor de ram
    max(case when sr.nome = 'disco' then r.valor end) as disco,  -- valor de disco
    max(r.data) as data  -- data do registro
from 
    vw_registro_servico r  -- referência à view existente
join 
    servicoMonitorado sm on r.fkServidor = sm.fkServidor and r.fkServico = sm.fkServico
join 
    servico sr on sm.fkServico = sr.id
group by 
    sm.fkServidor  -- agrupar pelo id do servidor
order by 
    data desc;  -- ordenar pela data

select * from vw_extracao_r;

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
join 
    empresa e on u.fkEmpresa = e.id
join 
    tipoUsuario tu on u.fkTipoUsuario = tu.id;

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
    limiteServicoMonitorado lsm on a.fkLimiteServicoMonitorado = lsm.id
join 
    servicoMonitorado sm on lsm.fkServicoMonitorado = sm.id
join 
    servidor s on sm.fkServidor = s.id
join 
    empresa e on s.fkEmpresa = e.id
join 
    servico se on sm.fkServico = se.id;

select * from vw_alertas;