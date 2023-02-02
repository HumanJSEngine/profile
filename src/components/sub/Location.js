import React, { useEffect, useRef } from "react";
import Layout from "../common/Layout";


//카카오 지도 API를 React 적용
// 1.개발자 등록
// 지도 코드 작성
// 위도 경도 파악
//
const Location = () => {
  const path = process.env.PUBLIC_URL;
  const { kakao } = window;
  const container = useRef(null);

  console.log(kakao);
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);

    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    const imageSrc = `${path}/images/starbucks.png`, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    marker.setMap(map);
  }, []);

  return (
    <Layout title={"Location"}>
      <div id="map" ref={container}></div>
    </Layout>
  );
};

export default Location;
