import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_TOKENS } from "@/lib/tokens";

export const alt = "Relevo Studio · Estudio de IA aplicada en Santiago de Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [extraBold, semiBold] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: OG_TOKENS.inkGradient,
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: OG_TOKENS.offwhite200,
              lineHeight: 1,
            }}
          >
            relev
          </span>
          <svg width="98" height="148" viewBox="0 0 69 104" style={{ margin: "0 -3px" }}>
            <circle
              cx="27"
              cy="63"
              r="22"
              fill="none"
              stroke={OG_TOKENS.tealBright}
              strokeWidth="10.5"
            />
            <circle
              cx="41"
              cy="63"
              r="22"
              fill="none"
              stroke={OG_TOKENS.coral300}
              strokeWidth="10.5"
            />
          </svg>
          <span
            style={{
              fontSize: 89,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: OG_TOKENS.teal300,
              lineHeight: 1,
              marginLeft: 20,
              marginTop: 52,
            }}
          >
            studio
          </span>
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: OG_TOKENS.offwhite200,
            opacity: 0.7,
          }}
        >
          ESTUDIO DE IA APLICADA · SANTIAGO DE CHILE
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: extraBold, weight: 800, style: "normal" },
        { name: "Plus Jakarta Sans", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
