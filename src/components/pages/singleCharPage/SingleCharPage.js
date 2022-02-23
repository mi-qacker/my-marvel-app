import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';
import AppBanner from '../../appBanner/AppBanner';

import './singleChar.scss';
import { Helmet } from 'react-helmet';

const SingleCharPage = () => {
	const [char, setChar] = useState(null);
	const { id } = useParams();
	const { getCharacterById, process, setProcess } = useMarvelService();

	useEffect(() => {
		getCharacterById(id)
			.then(setChar)
			.then(() => setProcess('success'));
	}, [id]);
	const content = setContent(process, View, char);
	return (
		<>
			<AppBanner />
			{content}
		</>
	);
};

const View = ({ data }) => {
	const { name, thumbnail, homepage, wiki, description } = data;
	return (
		<div className="single-char">
			<Helmet>
				<meta name="description" content={`${name} page`} />
				<title>{name}</title>
			</Helmet>
			<div>
				<img src={thumbnail} alt={name} />
				<div className="single-char__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
			<div className="single-char__info">
				<h2>{name}</h2>
				<p>{description ? description : 'DESCRIPTION NOT FOUND'}</p>
			</div>
			<Link to="/" className="single-char__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleCharPage;
