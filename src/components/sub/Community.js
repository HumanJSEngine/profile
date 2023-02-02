import React, { useEffect } from "react";
import Layout from "../common/Layout";

const Community = () => {
  useEffect(() => {
    //하고 싶은일
    //클린업 함수 : 컴포넌트 제거시 실행
    console.log("mount : 컴포넌트 생성");
    // axios, html 요소 선택하는 작업....
    return () => {
      console.log("unmount : 컴포넌트 제거");
    };
  }, []);

  return <Layout title={"Community"}>Community</Layout>;
};

export default Community;
