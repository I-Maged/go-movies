package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	// create a router mux
	mux := chi.NewRouter()

	// middleware
	mux.Use(middleware.Recoverer)

	// routes
	mux.Get("/", app.Home)

	return mux
}
