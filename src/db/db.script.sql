create table users (
    id serial primary key,
    name varchar(255),
    email varchar(255),
    password varchar(255)
);


create table card (
    id serial primary key,
    admin_id integer REFERENCES users(id)
);

create table task (
    id serial primary key,
    card_id integer REFERENCES card(id),
    title varchar(255),
    description varchar(255),
    start_date timestamptz,
    end_date timestamptz,
    completed boolean
);


