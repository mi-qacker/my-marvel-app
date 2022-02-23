import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContentList from '../../utils/setContentList';
import './comicsList.scss';

const ComicsList = () => {
	const [comics, setComics] = useState([]);
	const [offset, setOffset] = useState(200);
	const [newComicsLoading, setNewComicsLoading] = useState(false);
	const [comicsEnded, setComicsEnded] = useState(false);
	const { getAllComics, clearError, process, setProcess } =
		useMarvelService();

	useEffect(() => {
		onRequest(true);
	}, []);

	const onRequest = (initial) => {
		if (!initial) setNewComicsLoading(true);
		getAllComics(offset)
			.then(comicsLoaded)
			.then(() => setProcess('success'));
	};

	const comicsLoaded = (comics) => {
		clearError();
		const ended = comics.length < 8;
		setComics((prevComics) => [...prevComics, ...comics]);
		setOffset((prevOffset) => prevOffset + comics.length);
		setComicsEnded(ended);
		setNewComicsLoading(false);
	};

	const renderList = () => {
		const items = comics.map((book, i) => {
			const { id, title, price, thumbnail } = book;
			const bookPrice = price !== 0 ? `${price}$` : 'NOT AVAILABLE';
			const imgStyle = thumbnail.includes('image_not_available')
				? { objectFit: 'contain' }
				: { objectFit: 'cover' };
			return (
				<li key={i} className="comics__item">
					<Link to={`${id}`}>
						<img
							src={thumbnail}
							alt={title}
							style={imgStyle}
							className="comics__item-img"
						/>
						<div className="comics__item-name">{title}</div>
						<div className="comics__item-price">{bookPrice}</div>
					</Link>
				</li>
			);
		});
		return <ul className="comics__grid">{items}</ul>;
	};
	const content = useMemo(
		() => setContentList(process, () => renderList(), newComicsLoading),
		[process]
	);
	return (
		<div className="comics__list">
			{content}
			<button
				className="button button__main button__long"
				onClick={() => onRequest(false)}
				style={{ display: comicsEnded ? 'none' : 'block' }}
				disabled={newComicsLoading}>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
