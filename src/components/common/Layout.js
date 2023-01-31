import React from 'react'

// Layout.js : 공통 요소를 적용하기 위한 처리 컴포넌트 
// 이용해서 className으로 활용
const Layout = (props) => {
  return (
    <section className={`content ${props.title}`}>
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