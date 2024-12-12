import * as c from 'chance';

let chance = new c.Chance();

export function getRandomName() {
    return chance.name();
}

export function getRandomMail() {
    return chance.email();
}

export function getRandomIpv4() {
    return chance.ip();
}

export function getRandomIpv6() {
    return chance.ipv6();
}

export function getRandomPhone() {
    return chance.phone();
}

export function getRandomUrl() {
    return chance.url();
}

export function getRandomWord(options?: { length?: number; capitalize?: boolean }) {
    return chance.word({
        length: options?.length ?? 1,
        capitalize: options?.capitalize ?? false,
    });
}

export function getSentence(words?: number) {
    return chance.sentence({ words: words });
}

export function getParagraph() {
    return chance.paragraph();
}

// Additional Random Generators
export function getRandomDate() {
    return chance.date();
}

export function getRandomInteger(min: number, max: number) {
    return chance.integer({ min, max });
}

export function getRandomNatural(min: number, max: number) {
    return chance.natural({ min, max });
}

export function getRandomFloat(min: number, max: number, fixed: number = 2) {
    return chance.floating({ min, max, fixed });
}

export function getRandomWeekday() {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return chance.pickone(weekdays);
}

export function getRandomBool() {
    return chance.bool();
}

export function getUuid() {
    return chance.guid();
}

export function getRandomFromList<T>(list: T[]): T {
    return chance.pickone(list);
}

export function getRandomCountry() {
    return chance.country();
}

export function getRandomZipCode() {
    return chance.zip();
}

export function getRandomCity() {
    return chance.city();
}

export function getRandomFlag() {
    const flags = ['🇺🇸', '🇨🇦', '🇲🇽', '🇬🇱', '🇧🇷', '🇦🇷', '🇨🇴', '🇨🇱', '🇵🇪', '🇪🇨', '🇻🇪', '🇺🇾', '🇧🇴',
        '🇬🇧', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇵🇹', '🇳🇱', '🇨🇿', '🇸🇰', '🇨🇭', '🇧🇬', '🇺🇦', '🇸🇪', '🇳🇴', '🇫🇮',
        '🇷🇺', '🇲🇨', '🇿🇦', '🇰🇪', '🇬🇭', '🇪🇬', '🇳🇬', '🇹🇿', '🇺🇬', '🇲🇦', '🇧🇮', '🇲🇱', '🇸🇩', '🇮🇳', '🇵🇰',
        '🇧🇩', '🇨🇳', '🇯🇵', '🇰🇷', '🇮🇩', '🇵🇭', '🇲🇲', '🇰🇭', '🇱🇦', '🇳🇵', '🇲🇳', '🇦🇪', '🇸🇬', '🇦🇺', '🇳🇿',
        '🇫🇯', '🇵🇬', '🇼🇸', '🇧🇭', '🇶🇦', '🇸🇾', '🇱🇧', '🇮🇷', '🇮🇶', '🇱🇾', '🇦🇫',];

    return chance.pickone(flags);
}

export function getRandomOcean() {
    const oceans = ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Southern Ocean', 'Arctic Ocean'];
    return chance.pickone(oceans);
}

export function getRandomAnimal() {
    return chance.animal();
}

export function getRandomBird() {
    const birds = ['Sparrow', 'Peacock', 'Eagle', 'Penguin', 'Ostrich', 'Flamingo', 'Parrot', 'Crow'];
    return chance.pickone(birds);
}

export function getRandomMovie() {
    const movies = ['Inception', 'The Matrix', 'The Godfather', 'Titanic', 'Pulp Fiction', 'The Dark Knight', 'Forrest Gump'];
    return chance.pickone(movies);
}

export function getRandomAnime() {
    const animes = ['Naruto', 'One Piece', 'Attack on Titan', 'Hunter X Hunter', 'Dandadan', 'Dorohedoro', 'Kaiju no 8',
        'Solo Leveling', 'Demon Slayer', 'My Hero Academia', 'Death Note', 'Dragon Ball Z', 'Death Note', 'Spy X Family'];
    return chance.pickone(animes);
}

export function getRandomPrice(min: number = 1, max: number = 1000) {
    return `$${chance.floating({ min, max, fixed: 2 })}`;
}

export function getRandomFruit() {
    const fruits = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Strawberry', 'Pineapple', 'Watermelon'];
    return chance.pickone(fruits);
}

export function getRandomColor() {
    return chance.color();
}

export function getRandomStreet() {
    return chance.street();
}

export function getRandomCoordinates() {
    return {
        latitude: chance.latitude(),
        longitude: chance.longitude(),
    };
}




// Export everything
export default {
    getRandomName,
    getRandomMail,
    getRandomIpv4,
    getRandomIpv6,
    getRandomPhone,
    getRandomUrl,
    getRandomWord,
    getSentence,
    getParagraph,
    getRandomDate,
    getRandomInteger,
    getRandomNatural,
    getRandomFloat,
    getRandomWeekday,
    getRandomBool,
    getUuid,
    getRandomFromList,
    getRandomCountry,
    getRandomZipCode,
    getRandomCity,
    getRandomFlag,
    getRandomOcean,
    getRandomAnimal,
    getRandomBird,
    getRandomMovie,
    getRandomAnime,
    getRandomPrice,
    getRandomFruit,
    getRandomColor,
    getRandomStreet,
    getRandomCoordinates,
};
