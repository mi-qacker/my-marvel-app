import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import './singleComic.scss';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

const SingleComicPage = () => {
	const [comic, setComic] = useState(null);
	const { id } = useParams();
	const { loading, error, clearError, getComicById } = useMarvelService();

	useEffect(() => {
		updateComic();
	}, [id]);

	const updateComic = () => {
		clearError();
		getComicById(id).then(comicLoaded);
	};

	const comicLoaded = (comic) => {
		setComic(comic);
	};

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = !(loading || error || !comic) ? (
		<View comic={comic} />
	) : null;
	return (
		<>
			<AppBanner />
			{spinner}
			{errorMessage}
			{content}
		</>
	);
};

const View = ({ comic }) => {
	const { title, price, thumbnail, description, pageCount, language } = comic;
	return (
		<div className="single-comic">
			<img src={thumbnail} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">
					{description ? description : 'DESCRIPTION NOT FOUND'}
				</p>
				<p className="single-comic__descr">
					{pageCount > 0
						? `${pageCount} pages`
						: 'PAGE COUNT NOT FOUND'}
				</p>
				<p className="single-comic__descr">
					Language: {language ? language : 'NOT FOUND'}
				</p>
				<div className="single-comic__price">
					{price ? `${price}$` : 'NOT AVAILABLE'}
				</div>
			</div>
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleComicPage;
