const CharListItem = ({ char }) => {
	const { name, thumbnail } = char;
	const imgStyle = thumbnail.includes('image_not_available')
		? { objectFit: 'contain' }
		: null;
	return (
		<li className="char__item">
			<img src={thumbnail} alt="abyss" style={imgStyle} />
			<div className="char__name">{name}</div>
		</li>
	);
};

export default CharListItem;
