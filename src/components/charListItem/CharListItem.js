const CharListItem = ({ char, onCharSelected }) => {
	const { name, thumbnail } = char;
	const imgStyle = thumbnail.includes('image_not_available')
		? { objectFit: 'contain' }
		: { objectFit: 'cover' };
	return (
		<li className="char__item" onClick={onCharSelected}>
			<img src={thumbnail} alt="abyss" style={imgStyle} />
			<div className="char__name">{name}</div>
		</li>
	);
};

export default CharListItem;
