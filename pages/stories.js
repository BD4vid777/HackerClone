import view from "../utils/view.js";

export default async function Stories(path) {
    const stories = await getStories(path);
    view.innerHTML = `<div>${stories.length > 0 ? stories.map(story => JSON.stringify(story)) : 'No stories so far'}</div>`;
}

async function getStories(path) {
    const apiRoute = "https://node-hnapi.herokuapp.com"
    let apiPath = '';
    switch (path) {
        case '/':
            apiPath = '/news';
            break;
        case '/new':
            apiPath = '/newest';
            break;
        case '/ask':
            apiPath = '/ask';
            break;
        case '/show':
            apiPath = '/show';
            break;
        default:
            apiPath = '/new'
    };
    const response = await fetch(`${apiRoute}${apiPath}`);
    return await response.json();
}

// https://node-hnapi.herokuapp.com

// / (Top) -> /new
// /new (New) -> /newest
// /ask (Ask) -> /ask
// /show (Show) -> /show
