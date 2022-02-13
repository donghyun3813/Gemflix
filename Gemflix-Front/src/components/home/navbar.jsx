import { React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../store/actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const Navbar = ({server, onClickLogout}) => {

    const [retryProfile , setRetryProfile] = useState(false);
    const user = useSelector(store => store.userReducer, shallowEqual);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(retryProfile){
            onClickProfile();
        }
    }, [user]);

    const onClickProfile = () => {
        //server reqeust
        server.profile(user.token)
        .then(response => {
            switch(response){
                case 1007: //accessToken 만료 -> 재발급
                    server.refresh()
                    .then(response => {
                        if(response === 1008){ //refreshToken 만료 -> 로그아웃
                            onClickLogout(true);
                        }else if(response == null){
                            alert("해당 작업을 수행할 수 없습니다. 잠시 후 다시 시도해주세요.");
                            navigate('/');
                        }else{ //accessToken 재발급 성공 -> 재요청
                            setRetryProfile(true);
                            dispatch(userLogin(response.accessToken));
                        }
                    })
                    .catch(ex => {
                        console.log("refresh requset fail : " + ex);
                    })
                    .finally(() => {
                        console.log("refresh request end");
                    });
                    break;

                case null: //fail
                    alert("해당 작업을 수행할 수 없습니다. 잠시 후 다시 시도해주세요.");
                    navigate('/');
                    break;

                default: //success
                    console.log("member: " + response.id + response.email + response.phone);
                    navigate('/profile');
                    break;
            }
        })
        .catch(ex => {
            console.log("profile requset fail : " + ex);
        })
        .finally(() => {
            console.log("profile request end");
        });
    }

    const onClickLogoutBtn = () => {
        console.log("=== onClickLogout");
        onClickLogout(false);
    }

    if(user.loggedIn){
        return (
            <>
            <nav className='navbar'>
              <ul className='navbar_menu'>
                <li><Link to="/reserve">예매</Link></li>
                <li><Link to="/movies">영화</Link></li>
                <li><Link to="/">스토어</Link></li>
              </ul>
              <ul className='navbar_member_button'>
                <li><button type='button' onClick={onClickProfile}>마이페이지</button></li>
                <li><button type='button' onClick={onClickLogoutBtn}>로그아웃</button></li>
              </ul>
            </nav>
            </>
        );
    }else{
        return (
            <>
            <nav className='navbar'>
              <ul className='navbar_menu'>
                <li><Link to="/reserve">예매</Link></li>
                <li><Link to="/movies">영화</Link></li>
                <li><Link to="/">스토어</Link></li>
              </ul>
              <ul className='navbar_member_button'>
                <li><button type='button' onClick={()=> { navigate('/join'); }}>회원가입</button></li>
                <li><button type='button' onClick={()=> { navigate('/login'); }}>로그인</button></li>
              </ul>
            </nav>
            </>
        );
    }
};

export default Navbar;