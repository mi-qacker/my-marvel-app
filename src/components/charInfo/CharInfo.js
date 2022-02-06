import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return;
		}
		this.onCharLoading();
		this.marvelService
			.getCharacterById(charId)
			.then(this.onCharLoaded)
			.catch(this.onError);
	};

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		});
	};

	onCharLoading = () => {
		this.setState({ loading: true });
	};

	onCharLoaded = (char) => {
		this.setState({ char, loading: false, error: false });
	};

	render() {
		const { char, loading, error } = this.state;
		const skeleton = char || loading || error ? null : <Skeleton />;
		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error || !char) ? (
			<View char={char} />
		) : null;
		return (
			<div className="char__info">
				{spinner}
				{skeleton}
				{errorMessage}
				{content}
			</div>
		);
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
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
					.map((c, i) => (
						<li className="char__comics-item" key={i}>
							{c.name}
						</li>
					))
					.slice(0, 10)}
			</ul>
		</>
	);
};

export default CharInfo;
