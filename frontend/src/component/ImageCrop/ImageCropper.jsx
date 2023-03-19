import image from "./img.jpg";
import { Button } from '@mantine/core';
import React, { useState, useRef } from "react";

export function ImageWithRectangles() {
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

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
    console.log("Coordinates:", lastRectangle.x, lastRectangle.y);
    console.log("Width:", Math.abs(lastRectangle.width));
    console.log("Height:", Math.abs(lastRectangle.height));
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

  const onImageLoad = () => {
    const canvas = canvasRef.current;
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
    console.log(JSON.stringify(rectangles));
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
          src={image}
          alt=""
          ref={imgRef}
          onLoad={onImageLoad}
          style={{ display: "none" }}
        />
      </canvas>
      <Button onClick={onReset}>Reset</Button>
      <Button onClick={onExport}>Export</Button>
    </div>
  );
}
