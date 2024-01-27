package models

type PokemonResponse struct {
	Count   int32     `json:"count"`
	Results []Pokemon `json:"results"`
}

type Pokemon struct {
	Name string `json:"name"`
	Url  string `json:"url"`
}
type PokemonDetail struct {
	Name    string        `json:"name"`
	Height  int32         `json:"height"`
	Weight  int32         `json:"weight"`
	Sprites PokemonSprite `json:"sprites"`
}
type PokemonSprite struct {
	FrontDefault string `json:"front_default"`
	FrontShiny   string `json:"front_shiny"`
}
