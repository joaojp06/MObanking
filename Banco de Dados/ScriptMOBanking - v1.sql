create database MOBanking;
use MOBanking;

create table Empresa(
idEmpresa int primary key auto_increment, 
CNPJ char(14),
nome varchar(45)
) auto_increment = 1820;

desc Empresa;

create table Usuario (
idUsuario int, 
fkEmpresa int, 
primary key (idUsuario, fkEmpresa),
constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa), 
nome varchar(45), 
cpf char(11),
email varchar(80), 
senha varchar(45),
cargo varchar(7),
fkUsuario int, 
constraint FkCargoUsuario foreign key (fkUsuario) references Usuario (idUsuario),
constraint chkCargo CHECK (cargo IN('suporte','gerente'))
);
 
 desc Usuario;
 
 create table servidor (
 idServidor int, 
 fkEmpresa int, 
 primary key (idServidor, fkEmpresa),
constraint fkServidorEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa), 
Nome varchar(45)
);

desc Servidor;

create table Dados (
idDados int primary key,
porcCPU float, 
porcMemoria float, 
porcDisco float
); 

create table Alertas(
fkServidor int, 
fkDados int, 
 primary key (fkServidor, fkDados),
constraint fkAlertaServidor foreign key (fkServidor) references Servidor (idServidor), 
constraint fkAlertaDados foreign key (fkDados) references Dados (idDados), 
descricao varchar(45), 
dataHora datetime
);

desc Alertas;

