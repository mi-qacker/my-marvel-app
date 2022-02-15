import ErrorMessage from '../../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div>
			<ErrorMessage />
			<p
				style={{
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '24px',
				}}
			>
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
				to="/"
			>
				Back to main page
			</Link>
		</div>
	);
};

export default NotFoundPage;
