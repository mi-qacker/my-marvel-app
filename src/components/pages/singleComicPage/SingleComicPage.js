import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';
import AppBanner from '../../appBanner/AppBanner';
import './singleComic.scss';

const SingleComicPage = () => {
	const [comic, setComic] = useState(null);
	const { id } = useParams();
	const { clearError, getComicById, process, setProcess } =
		useMarvelService();

	useEffect(() => {
		updateComic();
	}, [id]);

	const updateComic = () => {
		clearError();
		getComicById(id)
			.then(comicLoaded)
			.then(() => setProcess('success'));
	};

	const comicLoaded = (comic) => {
		setComic(comic);
	};

	const content = useMemo(() => setContent(process, View, comic), [process]);
	return (
		<>
			<AppBanner />
			{content}
		</>
	);
};

const View = ({ data }) => {
	const { title, price, thumbnail, description, pageCount, language } = data;
	return (
		<div className="single-comic">
			<Helmet>
				<meta name="description" content={`${title} comics book`} />
				<title>{title}</title>
			</Helmet>
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
