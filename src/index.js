import domready from "domready"
import "./style.css"
import { randomPaletteWithBlack } from "./randomPalette"
import Color from "./Color"
const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;
const DEG2RAD_FACTOR = TAU / 360;

const config = {
    width: 0,
    height: 0,
    palette: ["#000", "#fff"],
    bg: "#000"
};

/**
 * @type CanvasRenderingContext2D
 */
let ctx;
let canvas;

domready(
    () => {

        canvas = document.getElementById("screen");
        ctx = canvas.getContext("2d");

        const width = (window.innerWidth) | 0;
        const height = (window.innerHeight) | 0;

        config.width = width;
        config.height = height;

        canvas.width = width;
        canvas.height = height;

        const cx = width >> 1
        const cy = height >> 1

        const diagonal = Math.atan2(height, width)
        const diagonal2 = Math.atan2(height, -width)
        const angles = [
            0,
            TAU/4,
            diagonal,
            diagonal + TAU / 4,
        ]


        if (diagonal !== diagonal2)
        {
            angles.push(diagonal2, diagonal2 + TAU/4)
        }

        const paint = () => {

            const palette = randomPaletteWithBlack()

            config.palette = palette

            ctx.fillStyle = "#000";
            ctx.fillRect(0,0, width, height);


            const cx = width >> 1
            const cy = height >> 1

            const draw = (x,y, size = 100) => {
                ctx.moveTo(x, y - size)
                ctx.lineTo(x - size, y)
                ctx.lineTo(x, y + size)
                ctx.lineTo(x + size, y)
            }




            let count = 100
            let repeat = 8
            const step = TAU / count
            const step2 = step/repeat
            
            const col = Color.from("#0f0").toRGBA(1 / repeat)
            console.log(col)
            ctx.fillStyle = col
            
            for (let j=0; j < repeat; j++)
            {
                let angle = j * step2
                ctx.beginPath()
                for (let i = 0; i < count; i++)
                {
                    draw(
                        cx + Math.cos(angle) * 400,
                        cy + Math.sin(angle) * 300,
                        200
                    )

                    angle += step
                }
                ctx.fill("evenodd")
            }


        }

        paint()

        canvas.addEventListener("click", paint, true)
    }
);
