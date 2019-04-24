export default class CinemaService {

    _apiBase = 'https://swapi.co/api/';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };

    getAllPeople = async () => {
        const res = await this.getResource(`people`);
        return res
    };

    getAllPlanets = async () => {
        const res = await this.getResource(`planets`);
        return res
    };

    getAllStarships = async () => {
        const res = await this.getResource(`starships`);
        return res
    };

}

// const test = new CinemaService();
//
// let teest = test.getAllPeople();
// test.getAllPeople().then((result) => {console.log(result)});
//
// console.log(teest);
//
