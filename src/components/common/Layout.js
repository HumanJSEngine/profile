import React, { useEffect, useRef } from 'react'

// Layout.js : 공통 요소를 적용하기 위한 처리 컴포넌트 
// 이용해서 className으로 활용
const Layout = (props) => {

  // useRef는 변수를 관리
  // 아래 구문을 real Dom을 참조함.
  // 하지만 아직, real DOM이 안 만들어 졌으므로 
  // 참조가 어렵다.

  const frame = useRef(null);
  

  useEffect(()=> {
    // useRef를 활용해서 section 태그를 참조 
    frame.current.classList.remove('on');
    frame.current.classList.add('on');
    return () => {
      
    }
  },[])

  return (
    <section className={`content ${props.title}`} ref={frame}>
      <figure>

      </figure>
      <div className='inner'>
        <h1>{props.title}</h1>
        {props.children}
      </div>
      
      </section>
  )
}

export default Layout