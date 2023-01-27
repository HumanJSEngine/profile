import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../scss/style.scss";
/*
 a 태그 href를 이용하면 페이지갱신
 Link 컴포넌트를 이용하면 컴포넌트 갱신(SPA)
 : a 태그로 자동 변환이 된다.
 : to="URI" 라는 props가 필요하다.
 NavLink 
 : 객체를 이용해서 포커스 스타일 적용
 :activeStyle="CSS객체" 이라는 props에 적용
 : to="URI" props는 필수

*/

const Header = () => {
  const active = {color:'skyblue'};

  return (
    <header>
      <div className="inner">
        <h1>
          <Link to="/">Logo</Link>
        </h1>
        <ul id="gnb">
          <li>
            <NavLink activeStyle={active} to="/department">Department</NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/community">Community</NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/youtube">Youtube</NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/location">Location</NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/join">Join</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
