import { useEffect, useState } from "react";
import { Button } from "../../shared/ui/Button";
import { instance } from "../../redux/API/axios";
import { useDispatch } from "react-redux";
import { refreshThunk } from '../../redux/auth/operations';


const FACEBOOK_REDIRECT_URI =
  import.meta.env.VITE_FACEBOOK_REDIRECT_URI || `http://${window.location.hostname}:3000/api/callback`;

export const UserFriends = () => {

    const requestAccesCode = async () => {
        try {
            const { data } = await instance.post('/callback/start');
            const { state } = data;

            const redirectUri = FACEBOOK_REDIRECT_URI;
            const params = new URLSearchParams({
                response_type: 'code',
                client_id: '1393923432300044',
                redirect_uri: redirectUri,
                scope: 'user_friends',
                state,
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
        } catch (error) {
            console.error('Failed to start Facebook login', error);
        }
    };

    const [userName, setUserName] = useState('');
    const [friends, setFriends] = useState([]);
    const [totalFriends, setTotalFriends] = useState(0);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (window.opener && !window.opener.closed) {
            window.opener.location.assign('/user-friends');
            window.close();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await instance.get('/callback/profile');
            const data = response.data;
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
            const response = await instance.get('/callback/friends');
            const data = response.data;
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
        dispatch(refreshThunk());
    }, [dispatch]);

    useEffect(() => {
        fetchProfile();
        fetchFriends();
    }, []);

    return (
        <div className="mb-[20px] mobile-sm:pr-[20px] tablet:pr-[32px] desktop:pr-[40px]">
            <div className="flex mobile-sm:flex-col tablet:flex-row mobile-sm:items-start tablet:items-center justify-between mobile-sm:mt-[40px] tablet:mt-[50px] gap-[16px]">
                <div>
                    <h2 className="mb-[4px] font-[600] leading-[117%] mobile-sm:text-[20px] tablet:text-[24px]">
                        Facebook friends
                    </h2>
                    <p className="font-[400] text-dark-0.4">
                        {userName
                            ? `Connected as ${userName}.`
                            : 'Connect your Facebook account to see friends who use this app.'}
                    </p>
                </div>
                <Button
                    type="button"
                    className="bg-blue text-white mt-[12px] tablet:mt-0"
                    onClick={requestAccesCode}
                >
                    Fetch Friends from Facebook
                </Button>
            </div>

            {error && (
                <p className="mt-[12px] text-sm text-red-500">
                    {error}
                </p>
            )}

            {userName && (
                <div className="mt-[24px] rounded-[20px] border border-dark-0.1 bg-white p-[24px]">
                    <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-[8px] mb-[16px]">
                        <div>
                            <p className="text-xs text-dark-0.4 mb-[4px]">Connected profile</p>
                            <p className="text-[18px] font-[600]">{userName}</p>
                        </div>
                        <p className="text-sm text-dark-0.4">
                            Total friends using app:{' '}
                            <span className="font-[600]">{totalFriends || 0}</span>
                        </p>
                    </div>

                    <div>
                        <p className="mb-[8px] text-sm text-dark-0.4">Friends list</p>
                        {friends.length > 0 ? (
                            <ul className="rounded-[16px] border border-dark-0.1 divide-y divide-dark-0.1">
                                {friends.map((friend) => (
                                    <li
                                        key={friend.id}
                                        className="px-[16px] py-[10px] flex items-center gap-[12px]"
                                    >
                                        {friend.picture?.data?.url && (
                                            <img
                                                src={friend.picture.data.url}
                                                alt={friend.name}
                                                className="h-[32px] w-[32px] rounded-full object-cover"
                                            />
                                        )}
                                        <span className="font-[500]">{friend.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-dark-0.4">
                                Facebook may not return all friend details because of privacy rules,
                                even if the total count is greater than zero.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

