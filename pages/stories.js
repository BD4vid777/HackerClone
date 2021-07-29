import view from "../utils/view.js";
import baseUrl from "../utils/baseUrl.js";
import store from "../store.js";
import checkFavorite from "../utils/checkFavorite.js";
import Story from "../components/Story.js";

export default async function Stories(path) {
    const { favorites } = store.getState();
    const stories = await getStories(path);
    view.innerHTML = `<div>${stories.length > 0 ? stories.map((story, i) => Story({ ...story, index: i + 1, isFavorite: checkFavorite(favorites, story) })).join('') : 'No stories so far'}</div>`;

    document.querySelectorAll('.favorite').forEach(favButton => {
        favButton.addEventListener('click', async function() {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story);
            store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: {favorite: story} })
            await Stories(path);
        });
    });
}

async function getStories(path) {
    let apiPath;
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
    }
    const response = await fetch(`${baseUrl}${apiPath}`);
    return await response.json();
}
