package main

import (
	"log"
	"net/http"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Go Movies up and running",
		Version: "1.0.0",
	}

	// Replaced by writeJSON
	// out, err := json.Marshal(payload)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(http.StatusOK)
	// w.Write(out)

	_ = app.writeJSON(w, http.StatusOK, payload)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	// rd, _ := time.Parse("2004-5-10", "1986-5-10")

	// highlander := models.Movie{
	// 	ID:          1,
	// 	Title:       "Highlander",
	// 	ReleaseDate: rd,
	// 	RunTime:     116,
	// 	MPAARating:  "PG-13",
	// 	Description: "a nice description",
	// 	CreatedAt:   time.Now(),
	// 	UpdatedAt:   time.Now(),
	// }

	// movies = append(movies, highlander)

	movies, err := app.DB.AllMovies()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	_ = app.writeJSON(w, http.StatusOK, movies)
}

func (app *application) authenticate(w http.ResponseWriter, r *http.Request) {
	// read json payload

	// validate user against database

	// check password

	// create jwt user
	u := jwtUser{
		ID:        1,
		FirstName: "Admin",
		LastName:  "user",
	}

	// generate tokens
	tokens, err := app.auth.GenerateTokenPair(&u)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	log.Println(tokens.Token)

	refreshCookie := app.auth.getRefreshCookie(tokens.RefreshToken)
	http.SetCookie(w, refreshCookie)

	w.Write([]byte(tokens.Token))
}
