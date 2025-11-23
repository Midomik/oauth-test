import { useEffect, useState } from 'react';

export const Callback = () => {
  const [userName, setUserName] = useState('');
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/callback/profile');
      if (!response.ok) {
        throw new Error('Failed to load profile');
      }
      const data = await response.json();
      console.log('profile data:', data);
      if (data && data.name) {
        setUserName(data.name);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load profile');
    }
  };

  const fetchFeed = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/callback/feed');
      if (!response.ok) {
        throw new Error('Failed to load feed');
      }
      const data = await response.json();
      console.log('feed data:', data);
      if (data && Array.isArray(data.data)) {
        setFeed(data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load feed');
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFeed();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <p>Hello {userName && <span>{userName}</span>} !!!</p>

      <h2>User Feed</h2>
      <ul>
        {feed.map((item) => (
          <li key={item.id || item.created_time}>
            {item.message || item.story || '[no text]'}
          </li>
        ))}
      </ul>
    </div>
  )
}

