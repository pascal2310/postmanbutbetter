package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"postmanbutbetter/models"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) RetrievePokemons() (*models.PokemonResponse, error) {
	return doGetRequest[models.PokemonResponse]("https://pokeapi.co/api/v2/pokemon")
}

func (a *App) RetrieveDetails(name string) (*models.PokemonDetail, error) {
	return doGetRequest[models.PokemonDetail](fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%s", name))
}

func doGetRequest[T any](url string) (*T, error) {

	response, err := http.Get(url)
	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}
	respBody, _ := io.ReadAll(response.Body)
	var marshalledResponse T

	err = json.Unmarshal(respBody, &marshalledResponse)
	if err != nil {
		fmt.Printf(err.Error())
		return nil, err
	}

	return &marshalledResponse, nil

}

func (a *App) SendRequest(url string, method string) string {
	response, err := http.Get(url)
	if err != nil {
		fmt.Println(err.Error())
		return err.Error()
	}

	respBody, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return err.Error()
	}

	return string(respBody)

}
