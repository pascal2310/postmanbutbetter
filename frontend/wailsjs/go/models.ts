export namespace models {
	
	export class Pokemon {
	    name: string;
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new Pokemon(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.url = source["url"];
	    }
	}
	export class PokemonSprite {
	    front_default: string;
	    front_shiny: string;
	
	    static createFrom(source: any = {}) {
	        return new PokemonSprite(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.front_default = source["front_default"];
	        this.front_shiny = source["front_shiny"];
	    }
	}
	export class PokemonDetail {
	    name: string;
	    height: number;
	    weight: number;
	    sprites: PokemonSprite;
	
	    static createFrom(source: any = {}) {
	        return new PokemonDetail(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.height = source["height"];
	        this.weight = source["weight"];
	        this.sprites = this.convertValues(source["sprites"], PokemonSprite);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PokemonResponse {
	    count: number;
	    results: Pokemon[];
	
	    static createFrom(source: any = {}) {
	        return new PokemonResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.count = source["count"];
	        this.results = this.convertValues(source["results"], Pokemon);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

