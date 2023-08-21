import { tv } from 'tailwind-variants'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  bgClassName?: string
  colorClassName?: string
}

const logo = tv({
  base: '',
  slots: {
    bg: 'fill-[#00204a]',
    color: 'fill-[#d9faff]'
  }
})

export function Logo({ width = 300, height = 300, className, bgClassName, colorClassName }: LogoProps) {
  const { base, bg, color } = logo()

  return (
    <svg width={width} height={height} className={base({ className })} viewBox="0 0 312.5 312.5">
      <g className={bg({ className: bgClassName })} transform="matrix(6.25,0,0,6.25,0,0)">
        <path d="M50 25c0 8.88-3.62 15.67-10.6 20.11C35.53 47.58 29.93 50 25 50c-8.63 0-14.24-1.37-18.73-8C3.57 38 0 30.2 0 25c0-6.85 1.76-14.06 6.22-18.58S18.04 0 25 0c9.5 0 16.77 5.3 21 13.11 1.88 3.53 4 7.58 4 11.89z"></path>
      </g>
      <g
        className={color({ className: colorClassName })}
        transform="matrix(0.13238701344323298,0,0,0.13238701344323298,115.48957679021488,68.71216985438055)"
      >
        <g>
          <path d="M198.1,507c11.4,0,20.7-9.2,20.6-20.6V205.8c0-2.1,1.7-3.8,3.8-3.8H365c11.4,0,20.6-9.2,20.6-20.6s-9.2-20.6-20.6-20.6   H222.5c-24.8,0-45,20.2-45,45v280.6C177.5,497.8,186.7,507,198.1,507z"></path>
          <path d="M227.4,566l-36.5,23.6c-1,0.5-2,0.4-2.6,0.2c-0.7-0.2-1.7-0.6-2.3-1.7l-140.3-243c-0.7-1.1-0.6-2.2-0.4-2.9   s0.6-1.7,1.7-2.3l86.5-51.6c9.8-5.9,13-18.5,7.2-28.3c-5.9-9.8-18.5-13-28.3-7.2l-86.2,51.4c-10.3,6-17.7,15.7-20.8,27.3   c-3.1,11.7-1.5,23.8,4.5,34.2l140.2,242.9c6,10.4,15.8,17.9,27.4,21c3.9,1.1,7.9,1.6,11.8,1.6c7.8,0,15.5-2,22.5-6l0.5-0.3   l37.5-24.3c9.6-6.2,12.3-18.9,6.1-28.5C249.7,562.5,237,559.8,227.4,566z"></path>
          <path d="M606.6,320.7c-3.2-11.7-10.6-21.4-21-27.4L460.4,221c-6.8-3.9-14.5-6-22.4-6c-16.1,0-31.1,8.6-39.1,22.5l-140.3,243   c-6,10.4-7.6,22.6-4.5,34.2c3.2,11.7,10.6,21.4,21,27.4l125.3,72.3c6.8,3.9,14.5,6,22.4,6c16.1,0,31-8.7,39-22.5l140.3-243   C608.1,344.5,609.7,332.3,606.6,320.7z M566.3,334.3L426,577.3c-0.7,1.4-2.2,1.9-3.3,1.9c-0.6,0-1.2-0.2-1.8-0.5l-125.2-72.3   c-1.1-0.6-1.5-1.6-1.7-2.3c-0.1-0.7-0.2-1.8,0.4-2.9l140.3-243c0.7-1.4,2.2-1.9,3.3-1.9c0.6,0,1.2,0.1,1.7,0.5l125.2,72.3   c1.1,0.6,1.5,1.6,1.7,2.3S566.9,333.2,566.3,334.3z"></path>
        </g>
      </g>
      <g
        className={color({ className: colorClassName })}
        transform="matrix(1.3846499209017464,0,0,1.3846499209017464,55.83500124127476,160.23241153276305)"
      >
        <path d="M10.8 38.96 c0.08 -1.2 -0.04 -2.56 -0.2 -3.72 c-2.88 0.4 -4.44 0 -4.84 -0.56 c-0.28 -0.4 -0.88 -4.48 -0.88 -8.64 c0 -4.12 0.44 -9 1.16 -9.92 c0.84 -1.12 2.68 -1.4 4.64 -1.2 c0.04 -1.12 0.08 -2.48 0 -3.52 c-3.88 -0.52 -5.64 -0.28 -6.28 0.28 c-1.2 1.04 -2.52 10.48 -2.4 14.44 c0.08 3.52 0.96 12.68 2.04 13.2 c0.92 0.44 3.88 0.32 6.76 -0.36 z M12.92 9.120000000000001 c0.2 2.28 0.08 5.16 -0.24 7.8 c-3.4 -0.6 -4.56 -0.08 -4.76 0.2 s-0.92 4.32 -1.08 8.92 c-0.16 3.64 0 6.88 0.24 7.2 c0.28 0.4 1.48 0.36 4.76 -0.36 c0.4 2.64 0.52 5.08 0.12 7.76 c-3.68 1.16 -7.6 1.72 -9.28 0.92 c-1.2 -0.56 -2.6 -11.08 -2.56 -15.16 c0.04 -3.72 1.52 -14.48 3.56 -16.4 c1.52 -1.4 4.48 -1.44 9.24 -0.88 z M21.759999999999998 27.16 c0.12 -0.2 0.12 -3.04 -0.12 -5.4 c-0.08 -0.76 -0.48 -0.76 -0.64 -0.08 c-0.48 2.24 -0.88 5.08 -0.56 5.52 c0.2 0.24 1.28 0.04 1.32 -0.04 z M23.52 28.2 c-0.84 1.36 -3.6 1.44 -4.6 0.16 c-0.64 -0.84 0.16 -7.88 0.56 -9.64 c0.32 -1.36 2.24 -2.68 3.2 -0.48 c0.72 1.68 1.56 8.76 0.84 9.96 z M27.6 38.32 c-0.44 -8.08 -1.56 -20.44 -2.56 -27.04 c-1.96 -0.08 -5.24 0.2 -7.6 0.76 c-0.88 7.92 -1.8 19.76 -2.24 27.04 c1.08 0.16 1.8 0.2 2.8 0.16 c0.08 -1.52 0.12 -3.56 0.52 -5.04 c0.52 -1.88 4.76 -2.28 5.4 -0.36 c0.48 1.4 0.52 3.72 0.48 5.2 c1.08 -0.16 2.16 -0.44 3.2 -0.72 z M29 39.88 c-2.64 0.76 -4.48 1.48 -7.32 1.52 c0.24 -2 0.44 -5.32 0 -6.76 c-0.12 -0.4 -1.4 -0.2 -1.56 0.32 c-0.56 1.8 -0.56 4.64 -0.72 6.52 c-2.8 0.32 -3.84 0.32 -6.72 -0.12 c0.76 -8.44 2.24 -21.88 3.56 -31 c3.52 -1.12 8.04 -1.68 10.96 -1.44 c0.92 7.48 1.68 21.52 1.8 30.96 z M38.24 16.68 c-0.08 -0.32 -0.48 -0.4 -0.52 -0.04 c-0.16 1.52 -0.44 5.24 -0.36 6.64 c0.04 0.44 0.76 -0.08 0.84 -0.64 c0.28 -1.96 0.32 -4.84 0.04 -5.96 z M40.08 22.96 c-0.16 1.4 -1.28 2.2 -2.24 2.44 c-0.76 0.2 -2.44 0.08 -2.6 -1.52 c-0.12 -1.44 0 -5.68 0.12 -7.24 c0.16 -1.96 3.56 -3.72 4.44 -0.76 c0.44 1.48 0.52 5.04 0.28 7.08 z M44.16 38.32 c-0.64 -3.08 -1.76 -8.32 -2.68 -11.2 c1.64 -1.96 1.72 -2.36 1.8 -3.92 c0.08 -2.36 0 -10.72 -1.04 -11.64 c-0.6 -0.56 -6.8 -0.88 -9.92 0.8 c0.16 5.72 0.6 17.36 0.2 26.88 c0.84 -0.04 1.68 -0.12 2.4 -0.4 c0.2 -2.24 0.44 -4.96 0.4 -7.16 c0 -0.92 0.44 -1.72 1.16 -2.12 c0.84 -0.44 1.88 -0.2 2.36 0.84 c0.92 2.04 2.28 6.4 3.08 9.4 c0.84 -0.4 1.44 -0.8 2.24 -1.48 z M45.72 39.04 c-1.96 1.84 -2.88 2.44 -5.8 3.68 c-0.72 -3.6 -1.92 -8.16 -2.8 -10.64 c-0.08 2.48 -0.4 5.48 -0.76 8.32 c-1.76 1.16 -3.56 1.32 -6.32 1.44 c0.96 -11.28 0.92 -24.28 0.96 -30.6 c3.8 -2.76 11.56 -3.08 13.08 -1.68 c1.12 1.04 1.36 10.64 1.16 13.4 c-0.12 1.92 -0.32 2.68 -1.68 4.44 c0.72 2.84 1.6 8.2 2.16 11.64 z M54.68 18.6 c-0.08 -0.32 -0.56 -0.32 -0.6 -0.04 c-0.52 4.4 -0.68 10.24 -0.52 14.32 c0.04 1.28 0.76 0.28 0.88 -0.24 c0.72 -3.44 0.92 -10.36 0.24 -14.04 z M56.68 32.88 c-0.24 1.36 -1.32 2.16 -2.28 2.4 c-0.8 0.2 -2.44 0.08 -2.56 -1.52 c-0.36 -4.32 -0.32 -12.4 0.12 -16.76 c0.24 -2.48 3.48 -2.2 4.04 -0.32 c1.04 3.56 1.4 12.36 0.68 16.2 z M59.28 32.519999999999996 c0.32 -2.68 0.72 -17.44 -1.64 -20.32 c-0.84 -1.04 -6.32 -1.64 -8.72 -0.56 c0.2 5.8 0.68 17.88 0.56 27.4 c2.72 0.44 6.32 0.84 7.4 0.12 c1.24 -0.88 2.2 -5 2.4 -6.64 z M60.88 32.64 c-0.28 2.04 -1.92 7.24 -3.48 8.36 c-1.4 1 -6.36 0.84 -10.36 0.24 c0.6 -11.04 0.52 -24.36 0.56 -30.72 c3.12 -2.24 10.36 -2.24 12 -0.08 c2.36 3.08 1.72 19.28 1.28 22.2 z M73.16000000000001 18.76 l1.68 -0.56 c0.08 -2.24 0.12 -6.4 -0.76 -6.96 c-1.32 -0.88 -6.76 0.04 -8.04 1.4 c-1.24 1.32 -0.8 12.32 0.08 13 s2.12 1.16 3.12 1.68 c1.56 0.84 2.72 1.88 2.76 2.92 c0.12 1.84 0 4.64 -0.84 5.44 c-1.24 1.16 -3.44 0.64 -3.72 -0.16 c-0.32 -0.88 -0.32 -1.88 -0.32 -2.8 l-2.44 0.16 c-0.2 3.24 0.2 5.88 0.76 6.48 c0.96 1 8.12 -0.36 8.68 -1.44 c1.12 -2.12 0.92 -10.36 0.44 -11 c-0.56 -0.76 -2.04 -1.4 -2.84 -1.76 c-1.4 -0.6 -2.68 -1.32 -3.08 -2.08 c-0.84 -1.52 -0.52 -4.44 -0.2 -6.16 s3.44 -3.48 4.28 -0.72 c0.2 0.72 0.36 1.56 0.44 2.56 z M76.88000000000001 19.32 l-5.4 2 c0 -2.48 -0.2 -3.68 -0.36 -4.56 c-0.04 -0.24 -0.48 -0.2 -0.52 0 c-0.2 1 -0.56 4.32 -0.08 5.28 c0.24 0.48 1.12 0.8 2 1.16 c1 0.44 2.24 0.84 3.12 1.52 c1.92 1.48 0.84 12 -0.36 14.2 c-1.16 2.2 -9.76 4.36 -11.68 2.32 c-1.32 -1.4 -1.36 -5.52 -0.84 -9.84 l6.16 -0.72 c-0.04 1.72 -0.08 2.36 -0.08 2.96 c0 0.92 0.36 1.04 0.64 0.76 c0.6 -0.6 0.4 -2.64 0.36 -3.96 c0 -0.56 -0.84 -0.84 -1.64 -1.24 c-1.04 -0.56 -2.36 -1.04 -3.28 -1.76 c-1.92 -1.52 -1.68 -14.16 0.24 -16.28 c1.88 -2.08 8.24 -3.52 10.44 -2.08 c1.16 0.76 1.52 7.12 1.28 10.24 z M95.36 17.24 c-0.12 -0.68 -1.04 -0.32 -1.16 0.52 c-0.44 2.92 -0.84 11.4 -0.6 13.72 c0.08 0.76 1.48 0.6 1.6 -0.64 c0.28 -3.48 0.56 -11.48 0.16 -13.6 z M97.44 30.84 c-0.08 1.68 -1.32 2.6 -2.56 2.8 c-1.04 0.16 -2.8 -0.12 -3 -1.68 c-0.36 -2.48 -0.28 -11.32 0.08 -14.28 c0.16 -1.4 1.12 -2.44 2.24 -2.72 c1.2 -0.32 2.52 0.24 2.84 1.68 c0.52 2.36 0.56 10.8 0.4 14.2 z M99.92 35.32 c0.72 -2.28 0.68 -21.28 -0.28 -23.28 c-0.68 -1.4 -8.96 -1.44 -10.16 0.56 c-1.04 1.72 -1.24 22.2 0.48 24.4 c0.68 0.88 2.76 0.96 4.84 0.6 c0.32 1.52 0.8 3.16 1.2 4.64 c0.72 -0.16 1.36 -0.4 2.08 -0.88 c-0.32 -1.24 -0.6 -2.8 -0.72 -4.4 c1.36 -0.48 2.4 -1.04 2.56 -1.64 z M101.8 10.760000000000002 c1.12 2.56 0.32 22.48 -0.52 25.08 c-0.24 0.68 -0.84 1.32 -1.72 1.92 c0.16 1.56 0.4 3.04 0.76 4.24 c-2.28 1.8 -3.64 2.28 -6 2.68 c-0.4 -1.56 -0.76 -3.2 -1.08 -4.72 c-2.24 0.24 -4.32 -0.12 -5.24 -1.36 c-2.16 -2.92 -0.96 -24.64 0.4 -26.96 c1.84 -3.08 12 -4.08 13.4 -0.88 z M117.44 38.88 c-0.52 -6.72 -0.72 -20.4 -0.44 -27.24 c-0.84 -0.08 -1.76 -0.08 -2.52 0.04 c-0.28 5.76 -0.56 13.24 -0.48 20.92 c0 0.88 -0.24 1.6 -1.2 1.76 c-1.76 0.28 -2.96 0 -3.56 -0.8 c-0.96 -1.28 -0.76 -14 -0.12 -20.12 c-0.84 -0.2 -1.72 -0.32 -2.68 -0.28 c-0.6 6.32 -1.16 18.04 -0.28 22.84 c0.28 1.48 0.2 2.6 1.08 2.92 c1 0.36 3.28 -0.48 6.84 -1.8 c0.08 1.64 0.12 1.88 0.12 2.16 c1.04 -0.04 2.4 -0.2 3.24 -0.4 z M119.52000000000001 9.399999999999999 c-0.68 7.68 -1.04 23.4 -0.64 30.8 c-1.72 0.92 -4.8 1.44 -7.12 1.28 c0 -0.52 -0.04 -0.92 -0.04 -1.28 c-2.36 0.88 -4.56 1.44 -5.6 1.08 c-1.36 -0.48 -1.8 -2.04 -2.16 -4.48 c-0.76 -5.4 0.36 -18.52 1.32 -25.52 c2.6 -0.36 4.2 -0.24 6.52 0.52 c-1.12 7.12 -1.56 20.24 -1.2 20.76 c0.2 0.28 0.64 0.24 1.12 0.12 c0.16 -7.72 0.8 -15.96 1.36 -22.88 c2.12 -0.72 4.2 -0.8 6.44 -0.4 z M125.48 38.28 c0.4 -6.32 0.44 -17.48 -0.08 -26 c-0.96 0.04 -2.12 0.2 -3 0.44 c0.32 6.6 0.52 18.92 0.52 25.72 c0.84 0 1.72 0 2.56 -0.16 z M127.76 10 c0.32 10.04 -0.24 22.76 -1 30.04 c-2.48 0.76 -3.8 0.72 -6.32 0.72 c0.32 -7.92 0.56 -22.08 0.44 -29.64 c1.92 -0.76 4.4 -1.36 6.88 -1.12 z M141.2 11.04 c-3.2 0.04 -7.72 0.48 -10.28 0.96 c-0.24 1.08 -0.36 2.96 -0.32 4.32 c1.48 -0.28 2.6 -0.44 3.88 -0.44 c1.12 0 1.32 0.64 1.04 1.76 c-2.16 8.72 -4.08 15.68 -5.12 21.76 c3.04 0.08 7.28 -0.52 9.44 -1.24 c0.04 -1.04 0.08 -2.4 0.04 -3.32 c-1.44 0.16 -3.4 0.44 -4.6 0.52 c-0.84 0.04 -1.08 -0.68 -0.88 -1.84 c1.44 -8.12 4.72 -17.28 6.8 -22.48 z M144.56 8.559999999999999 c-2.72 6.44 -6.76 16.88 -8.36 24.76 c1.12 -0.12 2.8 -0.32 5.04 -0.8 c0.24 2 0.12 4.88 -0.12 7.12 c-3.08 1.44 -8.92 2.44 -13.44 2.16 c1.4 -7.6 3.68 -14.88 6.08 -23.68 c-1.96 0.08 -3.04 0.32 -4.56 0.6 c-0.24 -2.64 0.04 -6.36 0.84 -8.48 c3.44 -0.92 9.72 -1.76 14.52 -1.68 z"></path>
      </g>
    </svg>
  )
}
