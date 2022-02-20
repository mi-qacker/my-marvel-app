import { useForm } from 'react-hook-form';
import './charSearch.scss';

const CharSearch = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => console.log(data);
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
				<button className="button button__main" type="submit">
					<div className="inner">find</div>
				</button>
			</form>
			{errors.name ? (
				<div className="char__search_result">
					<div className="error">This field is required</div>
				</div>
			) : null}
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
		</div>
	);
};

export default CharSearch;
