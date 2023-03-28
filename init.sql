CREATE TABLE public.users
(
    id serial NOT NULL,
    name varchar,
    password varchar,
    created_at timestamp(3) without time zone DEFAULT LOCALTIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);
