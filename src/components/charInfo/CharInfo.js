import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const { getCharacterById, clearError, process, setProcess } =
		useMarvelService();

	useEffect(() => {
		updateChar();
	}, []);

	useEffect(() => {
		updateChar();
	}, [props.charId]);

	const updateChar = () => {
		const { charId } = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacterById(charId)
			.then(onCharLoaded)
			.then(() => setProcess('success'));
	};

	const onCharLoaded = (char) => {
		setChar(char);
	};
	const content = useMemo(setContent(process, View, char), [process]);
	return <div className="char__info">{content}</div>;
};

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data;
	const desc = description ? description : '[NOT FOUND]';
	const imgStyle = thumbnail.includes('image_not_available')
		? { objectFit: 'contain' }
		: { objectFit: 'cover' };
	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt="abyss" style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{desc}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : '[COMICS NOT FOUND]'}
				{comics
					.map((c, i) => {
						const linkArr = c.resourceURI.split('/');
						return (
							<Link
								to={`/comics/${linkArr[linkArr.length - 1]}`}
								className="char__comics-item"
								key={i}>
								{c.name}
							</Link>
						);
					})
					.slice(0, 10)}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: PropTypes.number,
};

export default CharInfo;
