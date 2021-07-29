import view from "../utils/view.js";
import Story from "../components/Story.js";
import baseUrl from "../utils/baseUrl.js";

export default async function Stories(path) {
    const stories = await getStories(path);
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
    const response = await fetch(`${baseUrl}${apiPath}`);
    return await response.json();
}
