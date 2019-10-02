drop_table = """
DROP table IF EXISTS membership, user, schedule, aircraft, flight, seat,
flightschedule, booking, availability
"""



create_membership_table = """
create table membership(
    membership_id bigint,
    points int,
    points_redeemed int,
    expiry date,
    tier varchar(256),
    primary key (membership_id)
);
"""

create_user_table = """
create table user(
    nric_id varchar(256),
    name varchar(256),
    country varchar(256),
    email varchar(256),
    phone varchar(256),
    type varchar(256),
    password varchar(256),
    membership_id bigint,
    primary key (nric_id),
    foreign key (membership_id) references membership(membership_id)
    
);
"""

create_schedule_table = """
create table schedule(
    schedule_id bigint,
    arrival_airport varchar(256),
    arrival_datetime date,
    depart_airport varchar(256),
    depart_datetime date,
    price int,
    primary key(schedule_id)
);

"""

create_aircraft_table = """
create table aircraft(
    aircraft_id varchar(256),
    model varchar(256),
    manufacturer varchar(256),
    capacity int,
    primary key(aircraft_id)
);
"""


create_flight_table = """
create table flight(
    flight_id varchar(256),
    aircraft_id varchar(256),
    primary key(flight_id),
    foreign key (aircraft_id) references aircraft(aircraft_id)
);
"""


create_seat_table = """
create table seat(
    seat_id varchar(256),
    travel_class varchar(256),
    flight_id varchar(256),
    primary key(seat_id),
    foreign key (flight_id) references flight(flight_id)
);
"""

create_flight_schedule_table = """
create table flightschedule(
    flight_schedule_id bigint,
    schedule_id bigint,
    flight_id varchar(256),
    primary key (flight_schedule_id),
    foreign key (flight_id) references flight(flight_id),
    foreign key (schedule_id) references schedule(schedule_id)
);

"""

create_booking_table = """
create table booking(
    booking_id bigint,
    nric_id varchar(256),
    flight_schedule_id bigint,
    primary key (booking_id),
    foreign key (nric_id) references user(nric_id),
    foreign key (flight_schedule_id) references flightschedule(flight_schedule_id)
);
"""


create_availability_table = """
create table availability(
    availability bool,
    seat_id varchar(256) ,
    flight_schedule_id bigint,
    primary key (seat_id, flight_schedule_id),
    foreign key (seat_id) references seat(seat_id),
    foreign key (flight_schedule_id) references flightschedule(flight_schedule_id)
);
"""

create_table = [create_membership_table, create_user_table, create_schedule_table, 
                create_aircraft_table, create_flight_table, 
                create_seat_table, create_flight_schedule_table,
                create_booking_table, create_availability_table
               ]
