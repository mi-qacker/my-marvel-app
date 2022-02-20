import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
import MainPage from '../pages/mainPage/MainPage';
import ComicsPage from '../pages/comicsPage/ComicsPage';
import SingleComicPage from '../pages/singleComicPage/SingleComicPage';
import SingleCharPage from '../pages/singleCharPage/SingleCharPage';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';

// const NotFoundPage = lazy(() => import('../pages/notFoundPage/NotFoundPage'));
// const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
// const ComicsPage = lazy(() => import('../pages/comicsPage/ComicsPage'));
// const SingleComicPage = lazy(() =>
// 	import('../pages/singleComicPage/SingleComicPage')
// );
// const SingleCharPage = lazy(() =>
// 	import('../pages/singleCharPage/SingleCharPage')
// );

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/comics" element={<ComicsPage />} />
							<Route
								path="/comics/:id"
								element={<SingleComicPage />}
							/>
							<Route
								path="/chars/:id"
								element={<SingleCharPage />}
							/>
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
