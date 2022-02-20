import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleChar.scss';

const SingleCharPage = () => {
	const [char, setChar] = useState(null);
	const { id } = useParams();
	const { loading, error, getCharacterById } = useMarvelService();

	useEffect(() => {
		getCharacterById(id).then(setChar);
	}, [id]);
	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = char && !(loading || error) ? <View char={char} /> : null;
	return (
		<>
			<AppBanner />
			{spinner}
			{errorMessage}
			{content}
		</>
	);
};

const View = ({ char }) => {
	return (
		<div className="single-char">
			<div>
				<img src={char.thumbnail} alt={char.name} />
				<div className="single-char__btns">
					<a href={char.homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={char.wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
			<div className="single-char__info">
				<h2>{char.name}</h2>
				<p>
					{char.description
						? char.description
						: 'DESCRIPTION NOT FOUND'}
				</p>
			</div>
			<Link to="/" className="single-char__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleCharPage;
