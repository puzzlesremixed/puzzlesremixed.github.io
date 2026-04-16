"use client"

import {ReactSVG} from "react-svg";
import {cn} from "@/lib/utils";

export default function CustomSvg({src, className, style}: { src?: string, className?: string, style?: string }) {
  if (src) return <ReactSVG src={src} beforeInjection={(svg) => {
    svg.removeAttribute('width')
    svg.removeAttribute('height')
    svg.setAttribute("class", cn(className ?? ''))
    svg.setAttribute('style', cn(style ?? ''));
  }}/>
  else return null
}