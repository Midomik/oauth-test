import { useEffect, useState } from "react";
import { Button } from "../../shared/ui/Button";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:3000/api`).replace(/\/$/, '');
const FACEBOOK_REDIRECT_URI =
  import.meta.env.VITE_FACEBOOK_REDIRECT_URI || `http://${window.location.hostname}:3000/api/callback`;

export const UserFriends = () => {
    const requestAccesCode = async () => {
        const redirectUri = FACEBOOK_REDIRECT_URI;
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: '1393923432300044',
            redirect_uri: redirectUri,
            scope: 'user_friends',
        });

        const authUrl = `https://www.facebook.com/dialog/oauth?${params.toString()}`;
        const width = 600;
        const height = 700;

        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
            authUrl,
            'facebookLogin',
            `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=yes,status=no`
        );
    };

    const [userName, setUserName] = useState('');
    const [friends, setFriends] = useState([]);
    const [totalFriends, setTotalFriends] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (window.opener && !window.opener.closed) {
            window.opener.location.assign('/user-friends');
            window.close();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_BASE}/callback/profile`);
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

    const fetchFriends = async () => {
        try {
            const response = await fetch(`${API_BASE}/callback/friends`);
            if (!response.ok) {
                throw new Error('Failed to load friends');
            }
            const data = await response.json();
            console.log('friends data:', data);
            if (data && Array.isArray(data.data)) {
                setFriends(data.data);
                setTotalFriends(data.summary.total_count);
            }
        } catch (err) {
            console.error(err);
            setError('Unable to load friends');
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchFriends();
    }, []);

    return (
        <div>
            <Button type="button" className="bg-blue text-white mt-[50px] mb-[50px]" onClick={requestAccesCode}>Fetch Friends from Facebook</Button>
            {userName && <div>
                {error && <p>{error}</p>}
                <p>Hello {userName && <span>{userName}</span>} !!!</p>

                <h2>User Friends</h2>
                <p>Total friends count: {totalFriends? totalFriends : '0'}</p>
                {friends.length > 0 &&
                    <>
                        <ul>
                            {friends.map((friend) => (
                                <li key={friend.id}>{friend.name}</li>
                            ))}
                        </ul>
                    </>
                }
            </div>}
        </div>
    )
}

