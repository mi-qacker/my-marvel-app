import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const NotFoundPage = lazy(() => import('../pages/notFoundPage'));
const MainPage = lazy(() => import('../pages/mainPage'));
const ComicsPage = lazy(() => import('../pages/comicsPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage'));

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
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
