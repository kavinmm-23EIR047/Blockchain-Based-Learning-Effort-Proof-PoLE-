import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator({ value }) {
  return (
    <QRCodeCanvas value={value} size={180} bgColor="#ffffff" fgColor="#000000"/>
  );
}
