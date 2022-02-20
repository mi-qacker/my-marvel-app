import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const SingleCharPage = () => {
	const [char, setChar] = useState(null);
	const { id } = useParams();
	const { loading, error, getCharacterById } = useMarvelService();

	useEffect(() => {
		getCharacterById(id).then(setChar);
	}, [id]);
	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = char && !(loading || error) ? <View char={char} /> : null;
	return (
		<>
			<AppBanner />
			{spinner}
			{errorMessage}
			{content}
		</>
	);
};

const View = ({ char }) => {
	return (
		<>
			<h1>{char.name}</h1>
			<img src={char.thumbnail} alt={char.name} />
		</>
	);
};

export default SingleCharPage;
