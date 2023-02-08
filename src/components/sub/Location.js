import React, { useState, useEffect, useRef } from "react";
import Layout from "../common/Layout";

const Location = () => {
    const path = process.env.PUBLIC_URL;
    const { kakao } = window;

    const infoArr = [
        {
            title: "대구 GREEN1",
            latLng: new kakao.maps.LatLng(33.450701, 126.570667),
            imgSrc: `${path}/images/starbucks.png`,
            imgSize: new kakao.maps.Size(64, 69),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
        },
        {
            title: "대구 GREEN2",
            latLng: new kakao.maps.LatLng(55.450701, 100.570667),
            imgSrc: `${path}/images/starbucks.png`,
            imgSize: new kakao.maps.Size(64, 69),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
        },
        {
            title: "대구 GREEN3",
            latLng: new kakao.maps.LatLng(33.450701, 126.570667),
            imgSrc: `${path}/images/starbucks.png`,
            imgSize: new kakao.maps.Size(64, 69),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
        },
    ];

    const [info, setInfo] = useState(infoArr);

    const [pos, setPos] = useState(null);

    const [idx, setIdx] = useState(0);

    const container = useRef(null);

    const btns = useRef(null);

    const options = {
        center: info[idx].latLng,
        level: 3,
    };

    console.log(infoArr);
    useEffect(() => {
        // 중첩되는 지도 html 태그 제거
        container.current.innerHtml = "";
        const map = new kakao.maps.Map(container.current, options);
        const markerPosition = info[idx].latLng;
        const imageSrc = info[idx].imgSrc;
        const imageSize = info[idx].imgSize;
        const imageOption = info[idx].imgPos;
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
        setPos(map);

        for (let i of btns.current.children) {
            i.classList.add("on");
        }

        btns.current.children[idx].classList.add("on");

        const mapCenter = () => {
            map.setCenter(info[idx].latLng);
        };

        window.addEventListener("resize", mapCenter);

        //스카이뷰 전환버튼 추가
        //스카이뷰 전환버튼 추가
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

        // 확대 축소버튼 추가
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        return () => {
            window.removeEventListener("resize", mapCenter);
        };
    }, [idx]);

    return (
        <Layout title={"Location"}>
            <div id="map" ref={container}></div>

            <div className="btnSet">
                <ul ref={btns}>
                    {info.map((item, idx) => {
                        return (
                            <li key={idx} onClick={() => setIdx(idx)}>
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Layout>
    );
};

export default Location;
