import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [map, setMap] = useState();
  const [startPath, setStartPath] = useState();
  let line = [startPath];

  // 1) 카카오맵 불러오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            ),
            level: 3,
          };

          setMap(new window.kakao.maps.Map(container, options));
        });

        setStartPath(
          new window.kakao.maps.LatLng(
            pos.coords.latitude, // 위도
            pos.coords.longitude // 경도
          )
        );
      },
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  }, []);

  // 2) 현재 위치 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos) => {
    // 현재 위치(위도, 경도) 가져온다.
    line.push(
      new window.kakao.maps.LatLng(
        37.2498552, // 위도
        127.1334291 // 경도
      )
    );

    map.panTo(
      new window.kakao.maps.LatLng(
        pos.coords.latitude, // 위도
        pos.coords.longitude // 경도
      )
    );

    var polyline = new window.kakao.maps.Polyline({
      path: line, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FFAE00", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    polyline.setMap(map);
    console.log(Math.round(polyline.getLength()));
    console.log(line);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div onClick={getCurrentPosBtn}>현재 위치!!!!!!!!!!</div>
    </div>
  );
}

export default App;
