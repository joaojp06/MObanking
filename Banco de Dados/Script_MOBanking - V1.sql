create database MOBanking;
use MOBanking;

create table Empresa(
idEmpresa int primary key auto_increment, 
CNPJ char(14) unique,
nome varchar(45), 
) auto_increment = 1820;

insert into Empresa values
(default, 12345678901234, "C6 Bank");

create table Usuario (
idUsuario int, 
fkEmpresa int, 
primary key (idUsuario, fkEmpresa),
constraint fkUsuarioEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa), 
nome varchar(45), 
cpf char(11) unique,
email varchar(80), 
senha varchar(45),
cargo varchar(13),
fkResponsavel int, 
constraint FkResponsavelUsuario foreign key (fkResponsavel) references Usuario (idUsuario),
constraint chkCargo CHECK (cargo IN('suporte','gerente', 'responsavel'))
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
ipv6 varchar(32)
);

insert into Servidor values
(1, 1820, "Aplicação", 101836158, 'fe80::4163:9071:431f:5e18%10');

create table Disco(
    idDisco int primary key auto_increment,
    fkServidor int,
    fkEmpresa int,
    constraint fkServidorDisco foreign key (fkServidor) references Servidor (idServidor),
    constraint fkEmpresaDisco foreign key (fkEmpresa) references Empresa (idEmpresa),
    nomeDisco varchar(10),
    capacidade float
);
    /*nomeDisco seria o nome que encontra na máquina, ou seja, por exemplo o nome do disco de um windows que seria "C://"
    será que seria melhor "localização disco"?*/
insert into Disco values
(default, 1, 1820, "C://", 512.0);

    /*Talvez seja uma boa colocar um campo de sistema operacional para saber qual é o sistema usado no servidor.*/

create table Captura (
idCaptura int primary key auto_increment,
porcCPU float, 
porcMemoria float, 
porcDisco float,
dataHora datetime default current_timestamp
); 


create table Alerta(
idAlerta int auto_increment,
fkServidor int, 
fkCaptura int, 
 primary key (idAlerta,fkServidor,fkCaptura),
constraint fkAlertaServidor foreign key (fkServidor) references Servidor (idServidor), 
constraint fkAlertaCaptura foreign key (fkCaptura) references Captura (idCaptura), 
descricao varchar(250), 
dataHora datetime default current_timestamp
);