import view from "../utils/view.js";
import Story from "../components/Story.js";

export default async function Stories(path) {
    const stories = await getStories(path);
    // view.innerHTML = `<div>${stories.length > 0 ? stories.map(story => JSON.stringify(story)) : 'No stories so far'}</div>`;
    view.innerHTML = `<div>${stories.length > 0 ? stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : 'No stories so far'}</div>`;
}

async function getStories(path) {
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
    const response = await fetch(`https://node-hnapi.herokuapp.com${apiPath}`);
    return await response.json();
}
