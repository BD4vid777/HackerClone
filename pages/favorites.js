import store from "../store.js";
import view from "../utils/view.js";
import checkFavorite from "../utils/checkFavorite.js";
import Story from "../components/Story.js";

export default function Favorites() {
    const { favorites } = store.getState();
    view.innerHTML = `<div>${favorites.length > 0 ? favorites.map(story => Story({
        ...story,
        isFavorite: checkFavorite(favorites, story)
    })).join("") : "No favorites added"}</div>`

    document.querySelectorAll('.favorite').forEach(favButton => {
        favButton.addEventListener('click', function() {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story);
            store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: {favorite: story} })
            Favorites();
        });
    });
}
