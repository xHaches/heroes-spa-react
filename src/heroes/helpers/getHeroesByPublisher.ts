import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher: string) => {
    const validPublihsers = ['DC Comics', 'Marvel Comics'];
    if(!validPublihsers.includes(publisher)) {
        throw new Error(`${publisher} is not a valid publisher`)
    }
    return heroes.filter(heroe => heroe.publisher === publisher);
}