import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContentList = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return newItemLoading ? <Component /> : <Spinner />;
		case 'success':
			return <Component />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unknown process');
	}
};

export default setContentList;
