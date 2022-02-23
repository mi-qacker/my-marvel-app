import { useCallback, useState } from 'react';

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [process, setProcess] = useState('waiting');
	const request = useCallback(
		async (
			url,
			method = 'GET',
			body = null,
			headers = { 'Content-type': 'application/json' }
		) => {
			setLoading(true);
			setProcess('loading');
			try {
				const response = await fetch(url, { method, body, headers });
				if (!response.ok)
					sendError(
						`Could not fetch ${url}, status: ${response.status}`
					);
				const data = await response.json();
				setLoading(false);
				return data;
			} catch (e) {
				setLoading(false);
				setError(e.message);
				setProcess('error');
				throw e;
			}
		},
		[]
	);
	const sendError = (error) => {
		throw new Error(error);
	};
	const clearError = useCallback(() => {
		setError(null);
		setProcess('waiting');
	}, []);
	return { loading, error, process, setProcess, request, clearError };
};
