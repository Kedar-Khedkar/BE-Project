// import image from "./img.jpg";
import { Button } from "@mantine/core";
import React, { useState, useRef } from "react";
import axios from "axios";

export function ImageWithRectangles(props) {
  console.log(props);
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [clientDimensions, setClientDimensions] = useState({
    clientWidth: 0,
    clientHeight: 0,
  });

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setRectangles((prevState) => [
      ...prevState,
      { x: offsetX, y: offsetY, width: 0, height: 0 },
    ]);
    setDrawing(true);
  };

  const endDrawing = () => {
    setDrawing(false);
    const lastRectangle = rectangles[rectangles.length - 1];
    // console.log("Coordinates:", lastRectangle.x, lastRectangle.y);
    // console.log("Width:", Math.abs(lastRectangle.width));
    // console.log("Height:", Math.abs(lastRectangle.height));
  };

  const drawRect = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;

    const lastRectangle = rectangles[rectangles.length - 1];
    const width = offsetX - lastRectangle.x;
    const height = offsetY - lastRectangle.y;

    setRectangles((prevState) => {
      const newRectangles = [...prevState];
      newRectangles[newRectangles.length - 1] = {
        ...lastRectangle,
        width: width,
        height: height,
      };
      return newRectangles;
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0);

    rectangles.forEach((rectangle) => {
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        rectangle.x,
        rectangle.y,
        rectangle.width,
        rectangle.height
      );
    });
  };

  const onImageLoad = (e) => {
    const canvas = canvasRef.current;
    const { naturalWidth, naturalHeight } = e.target;
    setClientDimensions({
      clientWidth: naturalWidth,
      clientHeight: naturalHeight,
    });
    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgRef.current, 0, 0);
  };

  const onReset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0);
    setRectangles([]);
  };

  const onExport = () => {
    let coords = [];
    let seatnos = [];
    let pages = 4;
    let name = props.filepath;
    let width = props.width;
    let height = props.height;
    let displayHt = clientDimensions.clientHeight;
    let displayWdth = clientDimensions.clientWidth;
    console.log(displayWdth, displayHt);
    let scaleX = width / displayWdth;
    let scaleY = height / displayHt;
    console.log("SCALING FACTORS:", scaleX, scaleY);
    rectangles.forEach((rect) => {
      if (rect.width !== 0 && rect.height !== 0) {
        let tmp = [
          Math.round(rect.y * scaleY),
          Math.round((rect.y + rect.height) * scaleY),
          Math.round(rect.x * scaleX),
          Math.round((rect.x + rect.width) * scaleX),
        ];
        if (rect.width > 1000) {
          coords.push(tmp);
        } else {
          seatnos.push(tmp);
        }
      }
    });

    console.log(document.querySelector("#selectorImg").clientHeight);
    const reqBody = {
      coords: coords,
      seatnos: seatnos,
      pages: pages,
      name: name,
    };
    console.log(JSON.stringify(reqBody));
    axios
      .post("http://localhost:5000/marks/cropCoordinates", reqBody, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={drawRect}
        onMouseUp={endDrawing}
      >
        <img
          id="selectorImg"
          src={`${props.imagePath}`}
          alt=""
          // width={800}
          // height={600}
          ref={imgRef}
          onLoad={onImageLoad}
          style={{ overflow: "scroll" }}
        />
      </canvas>
      <Button onClick={onReset}>Reset</Button>
      <Button onClick={onExport}>Export</Button>
    </div>
  );
}
