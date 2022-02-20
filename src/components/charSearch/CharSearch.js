import './charSearch.scss';

const CharSearch = () => {
	return (
		<div className="char__search">
			<div className="char__search_title">
				Or find a character by name:
			</div>
			<input
				className="char__input"
				type="text"
				placeholder="Enter name"
			/>
			<a className="button button__main">
				<div className="inner">find</div>
			</a>
			{/*<div className="char__search_result">
				<div className="success">There is! Visit name page?</div>
				<a className="button button__secondary">
					<div className="inner">to page</div>
				</a>
			</div>*/}
			{/*<div className="char__search_result">
				<div className="error">
					The character was not found. Check the name and try again
				</div>
			</div>*/}
			{/*<div className="char__search_result">
				<div className="error">This field is required</div>
			</div>*/}
		</div>
	);
};

export default CharSearch;
