import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TwitterShareButton,
    TwitterIcon,
    LineShareButton,
    LineIcon,
} from 'react-share';

const Login = () => {
    const history = useHistory();
    const jsKey = process.env.REACT_APP_KAKAO;

    // SDK는 한 번만 초기화해야 한다.
    // 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
    if (!window.Kakao.isInitialized()) {
        // JavaScript key를 인자로 주고 SDK 초기화
        window.Kakao.init(jsKey);
        // SDK 초기화 여부를 확인하자.
        console.log(window.Kakao.isInitialized());
    }

    const kakaoLogin = () => {
        window.Kakao.Auth.login({
            scope: 'profile_nickname, profile_image, account_email', //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
            success: function (response) {
                console.log(response); // 로그인 성공하면 받아오는 데이터
                window.Kakao.API.request({
                    // 사용자 정보 가져오기
                    url: '/v2/user/me',
                    success: (res) => {
                        const kakao_account = res.kakao_account;
                        console.log('사용자 정보', kakao_account);
                        //사용자 정보를 받은 경우 localStorage 또는 redux 저장

                        history.push('/logout');
                    },
                });
            },
            fail: function (error) {
                console.log('에러', error);
            },
        });
    };

    const shareToKatalk = () => {
        window.Kakao.Share.createDefaultButton({
            container: '#kakaotalk-sharing-btn',
            objectType: 'feed',
            content: {
                title: '딸기 치즈 케익',
                description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
                imageUrl:
                    'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                link: {
                    // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                    mobileWebUrl: 'http://localhost:3000',
                    webUrl: 'http://localhost:3000',
                },
            },
            social: {
                likeCount: 286,
                commentCount: 45,
                sharedCount: 845,
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com',
                    },
                },
                {
                    title: '앱으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com',
                    },
                },
            ],
        });
    };

    //네이버 로그인
    const { naver } = window;
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: process.env.REACT_APP_NAVER, // 발급 받은 Client ID 입력
            callbackUrl: 'http://localhost:3000/login', // 작성했던 Callback URL 입력,
            // 팝업창으로 로그인을 진행할 것인지?
            isPopup: false,
            // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
            loginButton: { color: 'green', type: 2, height: 50 },
            callbackHandle: true,
        });

        naverLogin.init();
        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                console.log('naverLogin.user', naverLogin.user);
                const userid = naverLogin.user.getEmail();
                const nickname = naverLogin.user.getNickName();
                console.log(userid);
                console.log(nickname);
            }
        });
    };

    // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 토큰이 붙어서 전달됨.
    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken();
    };

    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0];
        console.log('토큰', token);
        localStorage.setItem('access_token', token);
        // setGetToken(token)
    };

    // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
    useEffect(() => {
        initializeNaverLogin();
        userAccessToken();
    }, []);

    const currentUrl = 'http://www.naver.com';
    return (
        <div>
            <FacebookShareButton
                style={{ marginRight: '20px' }}
                url={currentUrl}
            >
                <FacebookIcon
                    size={48}
                    round={true}
                    borderRadius={24}
                ></FacebookIcon>
            </FacebookShareButton>
            <FacebookMessengerShareButton
                style={{ marginRight: '20px' }}
                url={currentUrl}
            >
                <FacebookMessengerIcon
                    size={48}
                    round={true}
                    borderRadius={24}
                ></FacebookMessengerIcon>
            </FacebookMessengerShareButton>
            <TwitterShareButton
                style={{ marginRight: '20px' }}
                url={currentUrl}
            >
                <TwitterIcon
                    size={48}
                    round={true}
                    borderRadius={24}
                ></TwitterIcon>
            </TwitterShareButton>
            <LineShareButton url={currentUrl}>
                <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
            </LineShareButton>
            <button onClick={kakaoLogin}> 카카오 로그인 </button>
            {/* 네이버 로그인은 반드시 id="naverIdLogin" */}
            <button id='naverIdLogin'> 네이버 로그인 </button>
            <button onClick={shareToKatalk} id='kakaotalk-sharing-btn'>
                <img
                    src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
                    alt='카카오톡 공유 보내기 버튼'
                />
            </button>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
                <GoogleLogin
                    buttonText='google login'
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default Login;
