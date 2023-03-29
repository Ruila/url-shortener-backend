CREATE TABLE public.users
(
    id serial NOT NULL,
    name varchar UNIQUE,
    password varchar,
    created_at timestamp(3) without time zone DEFAULT LOCALTIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO public.users (name, password)
VALUES ('root', 'root');

CREATE TABLE public.urls
(
    id serial NOT NULL,
    shorten_url varchar UNIQUE,
    origin_url varchar,
    created_by integer,
    created_at timestamp(3) without time zone DEFAULT LOCALTIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT LOCALTIMESTAMP,
    PRIMARY KEY (id)
);
