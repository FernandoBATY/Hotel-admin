# Database Documentation for Hotel Reservation Application

This directory contains the database-related files for the hotel reservation application.

## Migrations

The `migrations` folder includes SQL scripts for initializing the database schema. The `init.sql` file contains the necessary commands to set up the database structure.

## Seeders

The `seeders` folder contains SQL scripts for populating the database with initial data. The `seed.sql` file includes commands to insert sample records into the database for testing purposes.

## Usage

To set up the database, run the SQL commands in `migrations/init.sql` to create the necessary tables. After that, you can use `seeders/seed.sql` to populate the database with initial data.

Make sure to configure your database connection settings in the backend application to connect to this database.