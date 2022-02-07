import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';

import './charList.scss';

class CharList extends Component {
	state = {
		chars: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,
		charEnded: false,
	};
	marvelService = new MarvelService();

	componentDidMount() {
		this.onRequest();
	}

	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError);
	};

	onCharListLoading = () => {
		this.setState({
			newItemLoading: true,
		});
	};

	onCharListLoaded = (newChars) => {
		let ended = false;
		if (newChars.length < 9) {
			ended = true;
		}
		this.setState(({ chars, offset }) => ({
			chars: [...chars, ...newChars],
			loading: false,
			error: false,
			newItemLoading: false,
			offset: offset + newChars.length,
			charEnded: ended,
		}));
	};

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		});
	};

	renderList = () => {
		const items = this.state.chars.map((char) => (
			<CharListItem
				key={char.id}
				onCharSelected={() => this.props.onCharSelected(char.id)}
				char={char}
			/>
		));
		return <ul className="char__grid">{items}</ul>;
	};

	render() {
		const { loading, error, newItemLoading, offset, charEnded } =
			this.state;
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(errorMessage || loading) ? this.renderList() : null;
		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button
					className="button button__main button__long"
					disabled={newItemLoading}
					style={{ display: charEnded ? 'none' : 'block' }}
					onClick={() => this.onRequest(offset)}
				>
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

CharList.propTypes = {
	onCharSelected: PropTypes.func,
};

export default CharList;
