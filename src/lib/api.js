import config from '../config/config';
const BUNGIE_DOMAIN = 'https://www.bungie.net/Platform';

export async function getManifest() {
    const response = await fetch(`${BUNGIE_DOMAIN}/Destiny2/Manifest`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch manifest.');
    }
    console.log('data: ', data);
    console.log('data.response: ', data.Response);

    const transformedManifest = [];

    for (const key in data) {
        const manifestObj = {
            id: key,
            ...data[key],
        };

        transformedManifest.push(manifestObj);
    }

    return transformedManifest;
}

export async function getDestinyPlayer(displayName) {
    console.log("displayName: ", displayName);
    let url = `${BUNGIE_DOMAIN}/Destiny2/SearchDestinyPlayer/-1/${displayName}`;
    console.log("url: ", url);
    url = url.split(' ').join('%20');
    url = url.split('#').join('%23');
    console.log("url: ", url);
    const response = await fetch(url, {
        METHOD: 'GET',
        headers: {
            'X-API-Key': config.apikey
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch player.');
    }

    console.log("data: ", data);
    console.log("data.response", data);

    const loadedPlayer = {
        id: displayName,
        ...data,
    };

    return loadedPlayer;
}

export async function addQuote(quoteData) {
    const response = await fetch(`${BUNGIE_DOMAIN}/quotes.json`, {
        method: 'POST',
        body: JSON.stringify(quoteData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create quote.');
    }

    return null;
}

export async function addComment(requestData) {
    const response = await fetch(`${BUNGIE_DOMAIN}/comments/${requestData.quoteId}.json`, {
        method: 'POST',
        body: JSON.stringify(requestData.commentData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not add comment.');
    }

    return { commentId: data.name };
}

export async function getAllComments(quoteId) {
    const response = await fetch(`${BUNGIE_DOMAIN}/comments/${quoteId}.json`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not get comments.');
    }

    const transformedComments = [];

    for (const key in data) {
        const commentObj = {
            id: key,
            ...data[key],
        };

        transformedComments.push(commentObj);
    }

    return transformedComments;
}
