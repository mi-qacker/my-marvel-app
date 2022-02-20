import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './charSearch.scss';
import useMarvelService from '../../services/MarvelService';

const CharSearch = () => {
	const [char, setChar] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { loading, error, findCharByName, clearError } = useMarvelService();
	const onSubmit = (data) => {
		clearError();
		findCharByName(data.name).then(setChar);
	};
	return (
		<div className="char__search">
			<div className="char__search_title">
				Or find a character by name:
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('name', { required: true })}
					className="char__input"
					type="text"
					placeholder="Enter name"
				/>
				<button
					className="button button__main"
					type="submit"
					disabled={loading}>
					<div className="inner">find</div>
				</button>
			</form>
			{errors.name ? (
				<ErrorResult>This field is required</ErrorResult>
			) : null}
			{error ? (
				<ErrorResult>
					An error has occurred. Try again later
				</ErrorResult>
			) : null}
			{char && char.length === 0 ? (
				<ErrorResult>
					The character was not found. Check the name and try again
				</ErrorResult>
			) : null}
			{char && char.length > 0 ? (
				<div className="char__search_result">
					<div className="success">
						There is! Visit {char[0].name} page?
					</div>
					<a className="button button__secondary">
						<div className="inner">to page</div>
					</a>
				</div>
			) : null}
		</div>
	);
};

const ErrorResult = ({ children }) => {
	return (
		<div className="char__search_result">
			<div className="error">{children}</div>
		</div>
	);
};

export default CharSearch;
