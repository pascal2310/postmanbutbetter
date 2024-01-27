<script lang="ts">
  import logo from './assets/images/logo-universal.png';
  import { SendRequest, RetrievePokemons, RetrieveDetails } from '../wailsjs/go/main/App.js';
  import type { main } from '../wailsjs/go/models';

  let resultText: any[] = [];
  let pokemonResponse: main.PokemonResponse;
  let pokemons: main.Pokemon[] = [];
  let pokemonDetail: main.PokemonDetail;
  let url: string;

  function sendRequest(): void {
    SendRequest(url, 'GET').then((result: string) => {
      JSON.parse(result);
      resultText = Object.entries(JSON.parse(result));
      console.log(result);
    });
  }
  function retrievePokemons(): void {
    RetrievePokemons().then((response) => {
      pokemonResponse = response;
      pokemons = response.results;
    });
  }

  function retrieveDetails(name: string): void {
    RetrieveDetails(name).then((response) => {
      pokemonDetail = response;
    });
  }
</script>

<main>
  <div class="input-box" id="input">
    <input autocomplete="off" bind:value={url} class="input" placeholder="url" id="name" type="text" />
    <button class="btn" on:click={sendRequest}>Send Request</button>
    <button class="btn" on:click={retrievePokemons}>Retrieve Pokemons</button>
  </div>
  <div style="display: flex;">
    <div style="width: 40%;">
      {#if pokemons.length > 0}
        <ul>
          {#each pokemons as { name, url }}
            <li>
              <button class="btn" on:click={retrieveDetails(name)}>{name}</button>
            </li>
          {/each}
        </ul>
      {:else}
        <p>pokemons are not retrieved</p>
      {/if}
    </div>
    <div style="width: 40%">
      {#if pokemonDetail}
        <ul>
          <li>
            Name: {pokemonDetail.name}
          </li>
          <li>
            Weight: {pokemonDetail.weight}
          </li>
          <li>
            Height: {pokemonDetail.height}
          </li>
          <img src={pokemonDetail.sprites.front_default} alt="default" width="200px" height="200px" />
          <img src={pokemonDetail.sprites.front_shiny} alt="shiny" width="200px" height="200px" />
        </ul>
      {/if}
    </div>
  </div>
</main>

<style>
  #logo {
    display: block;
    width: 50%;
    height: 50%;
    margin: auto;
    padding: 10% 0 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-origin: content-box;
  }

  .result {
    height: 20px;
    line-height: 20px;
    margin: 1.5rem auto;
  }

  .input-box .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: none;
    margin: 0 0 0 20px;
    padding: 0 8px;
    cursor: pointer;
  }

  .input-box .btn:hover {
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    color: #333333;
  }

  .input-box .input {
    border: none;
    border-radius: 3px;
    outline: none;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: rgba(240, 240, 240, 1);
    -webkit-font-smoothing: antialiased;
  }

  .input-box .input:hover {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

  .input-box .input:focus {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }
</style>
