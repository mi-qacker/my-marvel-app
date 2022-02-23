import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (process, Component, data) => {
	switch (process) {
		case 'waiting':
			return <Skeleton />;
		case 'loading':
			return <Spinner />;
		case 'success':
			return <Component data={data} />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unknown process');
	}
};

export default setContent;