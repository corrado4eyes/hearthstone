import 'isomorphic-fetch';

export const urlIsFound = (url: string) => {
    return fetch(url)
    .then((response) => {
        if (response.status === 404) {
            return false;
        } else {
            return true;
        }
    }).catch((error) => error);
}