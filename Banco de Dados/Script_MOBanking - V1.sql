create database MOBanking;
use MOBanking;

create table Empresa(
idEmpresa int primary key auto_increment, 
CNPJ char(14) unique,
nome varchar(45), 
email varchar(80), 
senha varchar(45)
) auto_increment = 1820;

insert into Empresa values
(default, 12345678901234, "C6 Bank", "c6bank@gmail.com","c123456");

create table Usuario (
idUsuario int, 
fkEmpresa int, 
primary key (idUsuario, fkEmpresa),
constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa), 
nome varchar(45), 
cpf char(11) unique,
email varchar(80), 
senha varchar(45),
cargo varchar(7),
fkUsuario int, 
constraint FkCargoUsuario foreign key (fkUsuario) references Usuario (idUsuario),
constraint chkCargo CHECK (cargo IN('suporte','gerente'))
);

insert into Usuario values
(120, 1820, "Debora", "12345678901", "debora@gmail.com", "1234567890", "gerente", null),
(121, 1820, "Jailson", "12345678902", "jailson@gmail.com", "1234567891", "suporte", 120);
 
 
 create table Servidor (
 idServidor int, 
 fkEmpresa int, 
 primary key (idServidor, fkEmpresa),
constraint fkServidorEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa), 
Nome varchar(45), 
ipv4 varchar(12), 
ipv6 varchar(32), 
Disco float
);

insert into Servidor values
(1, 1820, "Aplicação", 101836158, 'fe80::4163:9071:431f:5e18%10', 256.0);

create table Dado (
idDado int primary key auto_increment,
porcCPU float, 
porcMemoria float, 
porcDisco float,
dataHora datetime default current_timestamp
); 


create table Alerta(
idAlerta int,
fkServidor int, 
fkDado int, 
 primary key (idAlerta,fkServidor,fkDado),
constraint fkAlertaServidor foreign key (fkServidor) references Servidor (idServidor), 
constraint fkAlertaDado foreign key (fkDado) references Dado (idDado), 
descricao varchar(250), 
dataHora datetime default current_timestamp
);