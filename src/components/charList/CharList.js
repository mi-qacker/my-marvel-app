import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';

import './charList.scss';

class CharList extends Component {
	state = {
		chars: [],
	};
	marvelService = new MarvelService();

	componentDidMount() {
		this.marvelService.getAllCharacters().then((chars) => {
			this.setState({ chars });
		});
	}

	render() {
		const elements = this.state.chars.map((char) => (
			<CharListItem key={char.id} char={char} />
		));
		return (
			<div className="char__list">
				<ul className="char__grid">{elements}</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;
