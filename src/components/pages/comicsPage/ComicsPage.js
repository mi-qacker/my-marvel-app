import AppBanner from '../../appBanner/AppBanner';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import ComicsList from '../../comicsList/ComicsList';

const ComicsPage = () => {
	return (
		<>
			<AppBanner />
			<ErrorBoundary>
				<ComicsList />
			</ErrorBoundary>
		</>
	);
};

export default ComicsPage;
