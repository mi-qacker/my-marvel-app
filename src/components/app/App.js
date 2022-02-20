import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const NotFoundPage = lazy(() => import('../pages/notFoundPage/NotFoundPage'));
const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const ComicsPage = lazy(() => import('../pages/comicsPage/ComicsPage'));
const SingleComicPage = lazy(() =>
	import('../pages/singleComicPage/SingleComicPage')
);
const SingleCharPage = lazy(() =>
	import('../pages/singleCharPage/SingleCharPage')
);

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
