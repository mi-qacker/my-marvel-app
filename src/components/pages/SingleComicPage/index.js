import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import './singleComic.scss';
import ErrorMessage from '../../errorMessage/ErrorMessage';

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
			{spinner}
			{errorMessage}
			{content}
		</>
	);
};

const View = ({ comic }) => {
	const { title, price, thumbnail, description, pageCount } = comic;
	return (
		<div className="single-comic">
			<img src={thumbnail} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount} pages</p>
				<p className="single-comic__descr">Language: en-us</p>
				<div className="single-comic__price">{price}$</div>
			</div>
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleComicPage;
