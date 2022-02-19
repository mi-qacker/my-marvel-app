import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
	const [chars, setChars] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters, clearError } = useMarvelService();

	useEffect(() => {
		onRequest(true);
	}, []);

	const onRequest = (initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (newChars) => {
		clearError();
		const ended = newChars.length < 9;
		setChars((charList) => [...charList, ...newChars]);
		setNewItemLoading(false);
		setOffset((offset) => offset + newChars.length);
		setCharEnded(ended);
	};

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach((item) =>
			item.classList.remove('char__item_selected')
		);
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	};

	const renderList = () => {
		const items = chars.map((char, i) => {
			const { name, thumbnail } = char;
			const imgStyle = thumbnail.includes('image_not_available')
				? { objectFit: 'contain' }
				: { objectFit: 'cover' };
			return (
				<li
					key={char.id}
					className="char__item"
					tabIndex={0}
					ref={(el) => (itemRefs.current[i] = el)}
					onClick={() => {
						props.onCharSelected(char.id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							props.onCharSelected(char.id);
							focusOnItem(i);
						}
					}}>
					<img src={thumbnail} alt="thumbnail" style={imgStyle} />
					<div className="char__name">{name}</div>
				</li>
			);
		});
		return (
			<ul className="char__grid">
				<TransitionGroup component={null}>
					{items.map((elem, i) => (
						<CSSTransition
							key={i}
							timeout={300}
							classNames="char__item">
							{elem}
						</CSSTransition>
					))}
				</TransitionGroup>
			</ul>
		);
	};

	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{renderList()}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ display: charEnded ? 'none' : 'block' }}
				onClick={() => onRequest(false)}>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
