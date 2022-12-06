create table products(
    id int primary key not null auto_increment,
    title varchar(255) not null,
    price decimal(10,2) not null,
    description text not null,
    imageUrl varchar(255) not null,
    user_id int not null,
    foreign key(user_id) references Users(id) on delete cascade 
)

insert into products(title, price, description, imageUrl),
values("Half of a yellow sun", 45, "Great book on war, love, and family ties", "https://c7.alamy.com/comp/2JJAMN8/rosemawle-half-of-a-yellow-sun-2013-2JJAMN8.jpg");


create table Users(
  id int auto_increment not null primary key,
  name text,
  email text
) 


ALTER TABLE table_name
MODIFY COLUMN column_name datatype;

  create table cart (
    id int not null auto_increment primary key,
    user_id int not null unique,
    foreign key(user_id) references Users(id) on delete cascade 
  )

  create table cartItem (
    id int not null auto_increment primary key,
    quantity int
    cart_id int not null,
    product_id int not null,
    foreign key(cart_id) references Cart(id) on delete cascade
    foreign key(product_id) references products(id) on delete cascade
  )


