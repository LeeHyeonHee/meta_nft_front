import React from "react";
import ReactLoading from "react-loading";

function Loader({type, color, message}) {
  return (
    <div className="contentWrap">
      <div style={{
        position: "absolute",
        top:"50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}>
        <h2>{message}</h2>
        <h2>창을 닫지 말아주세요.</h2>
        <div className="spinnerWrap" style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5px"
        }}>
          <ReactLoading 
            type={type}
            color={color}
            height={'80%'}
            width={'80%'}
          />
        </div>
      </div>
    </div>
  )
}

export default Loader;