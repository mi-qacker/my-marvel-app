import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const { loading, request, error, clearError, process, setProcess } =
		useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=194a2c0a68b0b60721642cca84f1871a';
	const _baseCharOffset = 210;
	const _baseComicsOffset = 210;

	const getAllCharacters = async (offset = _baseCharOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacterById = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const findCharByName = async (name) => {
		const res = await request(
			`${_apiBase}characters?name=${name}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getAllComics = async (offset = _baseComicsOffset) => {
		const res = await request(
			`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};
	const getComicById = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _transformComics = (comic) => {
		const {
			id,
			title,
			prices,
			thumbnail,
			description,
			pageCount,
			textObjects,
		} = comic;
		return {
			id,
			title,
			description,
			pageCount,
			language: textObjects.length > 0 ? textObjects[0].language : null,
			price: prices[0].price,
			thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
		};
	};
	return {
		loading,
		error,
		process,
		setProcess,
		clearError,
		getAllCharacters,
		getCharacterById,
		findCharByName,
		getAllComics,
		getComicById,
	};
};

export default useMarvelService;
