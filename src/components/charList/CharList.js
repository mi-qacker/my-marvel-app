import { Component } from 'react';

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
	};
	marvelService = new MarvelService();

	componentDidMount() {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		});
	};

	onCharLoaded = (chars) => {
		this.setState({ chars, loading: false, error: false });
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
		const { loading, error } = this.state;
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(errorMessage || loading) ? this.renderList() : null;
		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;
