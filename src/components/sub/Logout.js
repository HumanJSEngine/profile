import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();
    //카카오 기능
    //카카오 로그아웃

    const kakaoLogOut = () => {
        if (!window.Kakao.Auth.getAccessToken()) {
            console.log('Not logged in.');
            return;
        }
        window.Kakao.Auth.logout(function (response) {
            alert(response + ' logout');
            // window.location.href='/'
            history.push('/');
        });
    };
    //카카오 회원탈퇴
    const memberOut = () => {
        window.Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response);
                //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
                // window.location.href='/'
                history.push('/');
            },
            fail: function (error) {
                console.log('탈퇴 미완료');
                console.log(error);
            },
        });
    };

    const naverLogout = () => {
        // localStorage.removeItem("com.naver.nid.access_token");
        localStorage.removeItem('com.naver.nid.oauth.state_token');
        history.push('/');
    };

    return (
        <div>
            <button onClick={kakaoLogOut}>카카오 로그아웃</button>
            <button onClick={memberOut}>카카오 서비스 탈퇴</button>
            <button onClick={naverLogout}>네이버 로그아웃</button>
        </div>
    );
};

export default Logout;
