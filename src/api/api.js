import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';


export async function getImagesFromApi(urlOptions) {
    const response = await axios.get(BASE_URL, urlOptions);
    return response.data;
}

//=== ФУНКЦИЯ СОЗДАНИЯ ОБЪЕКТА НАСТРОЙКИ URL ЗАПРОСА ================//
export function createUrlParameters(inputValue, pageCurrent) {
    return {
        params: {
            key: "34323245-7786a126c6836dc3f9fefa48e",
            q: inputValue,
            page: pageCurrent,
            per_page: 12,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        }  
    }
}