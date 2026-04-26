package main

import (
	"backend/internal/repository"
	"backend/internal/repository/dbrepo"
	"flag"
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
	DSN    string
	DB     repository.DatabaseRepo
}

func main() {
	// set application config
	var app application

	// read from command line
	flag.StringVar(&app.DSN, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=moviesDB sslmode=disable timezone=UTC connect_timeout=5", "postgres connection string")

	flag.Parse()

	// connect to the datebase
	conn, err := app.connectToDB()

	if err != nil {
		log.Fatal(err)
	}

	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	// we can close connection directly
	// defer conn.Close()

	defer app.DB.Connection().Close()

	app.Domain = "example.com"

	// start a web server
	log.Println("Starting server on port: ", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
