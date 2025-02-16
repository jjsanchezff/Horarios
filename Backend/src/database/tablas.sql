CREATE TABLE rol(
    id_rol SERIAL,
    nombre VARCHAR(18) NOT NULL,
    descripcion VARCHAR(30)
)

CREATE TABLE usuario(
    id_usuario SERIAL,
    nombres VARCHAR(30) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    correo VARCHAR(80) NOT NULL,
    id_rol SERIAL,
    CONSTRAINT pk_usuario PRIMARY KEY (id_usuario),
    CONSTRAINT uq_usuario_correo UNIQUE (correo),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)

CREATE TABLE estudiante(
    id_estudiante SERIAL,
    anio_ingreso SMALLINT NOT NULL,
    id_usuario SERIAL,
    CONSTRAINT pk_estudiante PRIMARY KEY (id_estudiante),
    CONSTRAINT fk_estudiante_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)

CREATE TABLE curso(
    id_curso SERIAL,
    nombre VARCHAR(40) NOT NULL,
    codigo VARCHAR(6) NOT NULL,
    creditos SMALLINT,
    CONSTRAINT pk_curso PRIMARY KEY (id_curso)
)

CREATE TABLE periodo(
    id_periodo SERIAL,
    nombre VARCHAR(20) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    CONSTRAINT pk_periodo PRIMARY KEY (id_periodo)
)

CREATE TABLE docente(
    id_docente SERIAL,
    grado VARCHAR(18),
    id_usuario SERIAL,
    CONSTRAINT pk_docente PRIMARY KEY (id_docente),
)

CREATE TABLE contrato(
    id_contrato SERIAL,
    categoria VARCHAR(15) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    modalidad VARCHAR(18),
    horas: SMALLINT,
    id_docente SERIAL,
    id_periodo SERIAL,
    CONSTRAINT pk_contrato PRIMARY KEY (id_contrato),
    CONSTRAINT fk_contrato_docente FOREIGN KEY (id_docente) REFERENCES docente(id_docente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_contrato_periodo FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)


CREATE TABLE matricula(
    id_matricula SERIAL,
    num_vez: int,
    id_estudiante SERIAL,
    id_periodo SERIAL,
    id_curso SERIAL,
    CONSTRAINT pk_matricula PRIMARY KEY (id_matricula),
    CONSTRAINT fk_matricula_estudiante FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_matricula_periodo FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT fk_matricula_curso FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)

CREATE TABLE preferencia_horario(
    id_preferencia SERIAL,
    dia VARCHAR(10) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    horas SMALLINT NOT NULL,
    aula VARCHAR(10),
    id_docente SERIAL,
    id_periodo SERIAL,
    id_curso SERIAL,
    CONSTRAINT pk_preferencia PRIMARY KEY (id_preferencia),
    CONSTRAINT fk_preferencia_docente FOREIGN KEY (id_docente) REFERENCES docente(id_docente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_preferencia_periodo FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT fk_preferencia_curso FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

CREATE TABLE horario(
    id_horario SERIAL,
    dia VARCHAR(10) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    aula VARCHAR(10),
    id_docente SERIAL,
    id_periodo SERIAL,
    id_curso SERIAL,
    CONSTRAINT pk_horario PRIMARY KEY (id_horario),
    CONSTRAINT fk_horario_docente FOREIGN KEY (id_docente) REFERENCES docente(id_docente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_horario_periodo FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT fk_horario_curso FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

CREATE TABLE parte(
    id_parte SERIAL,
    orden SMALLINT,
    id_docente SERIAL,
    id_periodo SERIAL,
    CONSTRAINT pk_parte PRIMARY KEY (id_parte),
    CONSTRAINT fk_parte_docente FOREIGN KEY (id_docente) REFERENCES docente(id_docente)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_parte_periodo FOREIGN KEY (id_periodo) REFERENCES periodo(id_periodo)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)