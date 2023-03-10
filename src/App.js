import { Route, Switch } from 'react-router-dom';
// common
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
// main
import Visual from './components/main/Visual';
import Content from './components/main/Content';
// sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Join from './components/sub/Join';
import Location from './components/sub/Location';
import Schedule from './components/sub/Schedule';
import Login from './components/sub/Login';
import Logout from './components/sub/Logout';

function App() {
    const jsKey = process.env.REACT_APP_KAKAO;

    // SDK는 한 번만 초기화해야 한다.
    // 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
    if (!window.Kakao.isInitialized()) {
        // JavaScript key를 인자로 주고 SDK 초기화
        window.Kakao.init(jsKey);
        // SDK 초기화 여부를 확인하자.
        console.log(window.Kakao.isInitialized());
    }

    return (
        <>
            {/* 동일한 컴포넌트가 출력될때 조건에 따라 하나만 출력된다 */}
            <Switch>
                <Route exact path='/'>
                    {/* router 값에 따라서 header props로 type="main" 전달 */}
                    <Header type={'main'} />
                    <Visual />
                    <Content />
                </Route>
                {/* 컴포넌트를 출력하는 3번째 방법 */}
                {/* <Header type={'sub'}/>  props를 내리기 위해서 */}
                <Route path='/' render={() => <Header type={'sub'} />} />
            </Switch>

            {/* 화면별 Link에 출력될 단위 
      Route : 화면별 Link에 의해 출력될 단위
      path : 연결할 주소
      exact : 정확하게 path가 같을 때만 보여준다.*/}
            {/* Route 1번 방식 */}
            {/* <Route path="/department">
        <Department />
      </Route> */}

            {/* 라우터에 따라서 header의 css를 달리하겠다 */}
            {/* 중첩되는 Header에 대한 처리가 필요하다 */}
            <Route path='/department' component={Department} />
            <Route path='/community' component={Community} />
            <Route path='/schedule' component={Schedule} />
            <Route path='/gallery' component={Gallery} />
            <Route path='/youtube' component={Youtube} />
            <Route path='/location' component={Location} />
            <Route path='/join' component={Join} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Footer />
        </>
    );
}

export default App;
