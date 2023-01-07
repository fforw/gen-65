import domready from "domready"
import "./style.css"
import { randomPaletteWithBlack } from "./randomPalette"
import Color from "./Color"


const PHI = (1 + Math.sqrt(5)) / 2
const TAU = Math.PI * 2
const DEG2RAD_FACTOR = TAU / 360

let angleResolution = TAU/4

const MIN = 12
const MIN_DITHER = MIN * 4
const DITHER_DISTANCE = 3
const DITHER_CHANCE = 0.2

const config = {
    width: 0,
    height: 0,
    palette: ["#000", "#fff"],
    bg: "#000",
    map: null
}

/**
 * @type CanvasRenderingContext2D
 */
let ctx
let canvas


const resolutions = [
    TAU/4,
    TAU/8,
    TAU/12,
    TAU/24,
    TAU/36,
    TAU/72,
]

function createBoids()
{
    const count = 100 + Math.random() * 400
    const boids = []
    for (let i = 0; i < count; i++)
    {

        const x = Math.round(Math.random() * config.width)
        const y = Math.round(Math.random() * config.height)
        const angle = randomAngle()
        const color = randomExcluding(config.bg)
        boids.push(
            new Boid(
                x,
                y,
                angle,
                color
            ),
            new Boid(
                x,
                y,
                angle + TAU/2,
                color
            )
        )
    }

    return boids
}


let boids = []


function randomAngle(max = TAU)
{
    return Math.round(max * Math.random() / angleResolution) * angleResolution
}


function randomExcluding(exclusion)
{
    const { palette } = config
    let color
    do
    {
        color = palette[0|Math.random() * palette.length]  

    } while(color === exclusion)

    return color
}


class Boid
{
    x
    y
    dx
    dy

    ix
    iy
    angle

    color

    alive = true

    noSplit = false

    size = 1// + Math.round(Math.random() * 2)

    constructor(
        x,y,angle, color = randomExcluding(config.bg)
    )
    {
        const { width, height,palette } = config


        this.color = color

        this.x = x
        this.y = y

        this.ix = this.x
        this.iy = this.y

        this.angle = angle;
        this.dx = Math.cos(angle)
        this.dy = Math.sin(angle)

    }

    simulate(count, deltaTime = 0.167)
    {

        if (!this.alive)
        {
            return
        }

        let { width, height, map } = config

        const isHit = (x,y, boid) => {

            x = Math.round(x)
            y = Math.round(y)

            if (x < 0 || x >= width || y < 0 || y >= height)
            {
                return true
            }

            const off = x + y * width
            const other = map[off]
            return other && other !== boid
        }

        const register = (x,y, boid) => {

            x = Math.round(x)
            y = Math.round(y)

            if (x >= 0 && x < width && y >= 0 && y < height)
            {
                const off = x + y * width
                map[off] = boid
            }
        }

        // // Update the position delta of the object using the acceleration and the elapsed time
        // this.dx += dx;
        // this.dy += dy;

        // Update the position of the object using the position delta


        this.x += this.dx
        this.y += this.dy

        if (isHit(this.x, this.y, this))
        {
            this.alive = false;

            const { x,y, ix,iy, angle} = this

            const dx = ix - x
            const dy = iy - y

            const distance = Math.sqrt(dx * dx + dy * dy)
            const newAngle = Math.random() < 0.5 ? angle + TAU / 4 : angle - TAU / 4
            if (distance > MIN && !this.noSplit)
            {
                if (distance > MIN_DITHER && Math.random() < DITHER_CHANCE)
                {
                    const num = Math.floor(distance / DITHER_DISTANCE);

                    const start = Math.round((distance - num * DITHER_DISTANCE) * 0.5);

                    //console.log("dither", { distance, num, start})
                    
                    for (let i = start; i < distance; i += DITHER_DISTANCE )
                    {
                        const t = i/distance

                        const xc = x + (ix - x ) * t
                        const yc = y + (iy - y ) * t

                        const b = new Boid(
                            xc,
                            yc,
                            newAngle,
                            this.color
                        )
                        b.noSplit = true

                        boids.push(
                            b
                        )

                    }

                }
                else
                {
                    const t = Math.random()
                    const xc = x + (ix - x ) * t
                    const yc = y + (iy - y ) * t

                    boids.push(
                        new Boid(
                            xc,
                            yc,
                            newAngle
                        )
                    )
                }
            }
        }

        register(this.x, this.y, this)

    }

    paint()
    {
        if (!this.alive)
        {
            return
        }

        ctx.fillStyle = this.color
        const {x , y, size} = this
        ctx.fillRect(x - (size>>1) ,y - (size>>1),size,size)
    }


    stop()
    {

    }
}

domready(
    () => {

        canvas = document.getElementById("screen")
        ctx = canvas.getContext("2d")

        const width = (window.innerWidth) | 0
        const height = (window.innerHeight) | 0

        config.width = width
        config.height = height

        canvas.width = width
        canvas.height = height


        const cx = width >> 1
        const cy = height >> 1

        const paint = () => {

            angleResolution = resolutions[0|Math.random() * resolutions.length]

            config.map = new Array(width * height)

            //const palette = config.palette
            const palette = randomPaletteWithBlack()
            config.palette = palette
            //config.bg = palette[0|Math.random() * palette.length]
            config.bg = palette[0]

            //ctx.fillStyle = palette[0]

            ctx.fillStyle = config.bg;
            ctx.fillRect(0, 0, width, height)

            boids = createBoids()

            const render = () => {

                for (let j = 0; j < 8; j++)
                {
                    for (let i = 0; i < boids.length; i++)
                    {
                        const b = boids[i]

                        b.simulate()
                        b.paint()
                    }
                }
                boids = boids.filter(b => b.alive)

                if (boids.length > 0)
                {
                    requestAnimationFrame(render)
                }
            }
            requestAnimationFrame(render)
        }

        paint()

        canvas.addEventListener("click", paint, true)
    }
)
