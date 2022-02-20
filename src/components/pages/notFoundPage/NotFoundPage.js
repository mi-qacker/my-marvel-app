import { Helmet } from 'react-helmet';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div>
			<Helmet>
				<meta name="description" content="Not found page" />
				<title>Not Found</title>
			</Helmet>
			<ErrorMessage />
			<p
				style={{
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '24px',
				}}>
				Page does not exist
			</p>
			<Link
				style={{
					display: 'block',
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '24px',
					marginTop: '30px',
				}}
				to="/">
				Back to main page
			</Link>
		</div>
	);
};

export default NotFoundPage;
