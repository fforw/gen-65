function toLinear(n)
{
    if (n < 0.03928)
    {
        return n / 12.92;
    }
    else
    {
        return Math.pow((( n + 0.055 ) / 1.055), 2.4)
    }
}

function toRGB(n)
{
    if (n < 0.003040247678018576)
    {
        return n * 12.92;
    }
    else
    {
        return Math.pow(n, 1 / 2.4) * 1.055 - 0.055
    }
}

const colorRegExp = /^(#)?([0-9a-f]+)$/i;

function hex(n)
{
    const s = n.toString(16);

    return s.length === 1 ? "0" + s : s;
}

function hue2rgb(p, q, t){
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
}

class Color
{
    r;
    g;
    b;

    constructor(r,g,b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    static toLinear(v)
    {
        return toLinear(v)
    }

    static toRGB(v)
    {
        return toRGB(v)
    }

    mix(other, ratio, out)
    {
        if (!out)
        {
            out = new Color();
        }


        // XXX: bad linear interpolation
        // out.r = (this.r + (other.r - this.r) * ratio)|0;
        // out.g = (this.g + (other.g - this.g) * ratio)|0;
        // out.b = (this.b + (other.b - this.b) * ratio)|0;

        const r0 = toLinear(this.r)
        const g0 = toLinear(this.g)
        const b0 = toLinear(this.b)

        const r1 = toLinear(other.r)
        const g1 = toLinear(other.g)
        const b1 = toLinear(other.b)


        out.r = toRGB(r0 + (r1 - r0) * ratio)|0;
        out.g = toRGB(g0 + (g1 - g0) * ratio)|0;
        out.b = toRGB(b0 + (b1 - b0) * ratio)|0;


        return out;
    }

    toRGBHex()
    {
        return "#" + hex(this.r) + hex(this.g) + hex(this.b );
    }

    toHex()
    {
        return (this.r << 16) + (this.g << 8) + this.b;
    }

    static validate(color)
    {

        let m;
        if (typeof color !== "string" || !(m = colorRegExp.exec(color)))
        {
            return null;
        }
        const col = m[2];

        if (col.length === 3)
        {
            return new Color(
                parseInt(col[0], 16) * 17,
                parseInt(col[1], 16) * 17,
                parseInt(col[2], 16) * 17
            )
        }
        else if (col.length === 6)
        {
            return new Color(
                parseInt(col.substring(0, 2), 16),
                parseInt(col.substring(2, 4), 16),
                parseInt(col.substring(4, 6), 16)
            )
        }
        else
        {
            return null;
        }
    }

    static from(color, factor = 1.0)
    {
        if (Array.isArray(color))
        {
            const length = color.length;
            const array = new Float32Array(length * 3);

            const f = factor/255;

            let off = 0;
            for (let i = 0; i < length; i++)
            {
                const col = Color.from(color[i]);
                array[off++] = col.r * f;
                array[off++] = col.g * f;
                array[off++] = col.b * f;
            }

            return array;
        }

        const col = Color.validate(color);

        if (!col)
        {
            throw new Error("Invalid color " + color);
        }

        col.r *= factor;
        col.g *= factor;
        col.b *= factor;

        return col;
    }

    static fromHSL(h,s,l)
    {
        let r, g, b;

        if(s <= 0){
            r = g = b = l; // achromatic
        }else{

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g= hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return new Color(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        );
    }

    luminosity()
    {
        const r = toLinear( this.r / 255);
        const g = toLinear( this.g / 255);
        const b = toLinear( this.b / 255);

        return r * perceptiveFactorR + g * perceptiveFactorG + b * perceptiveFactorB;
    }

    static fromLuminosity(n)
    {
        const r = n / perceptiveFactorR;
        const g = n / perceptiveFactorG;
        const b = n / perceptiveFactorB;

        return new Color(
            Math.round(toRGB( r) * 255),
            Math.round(toRGB( g) * 255),
            Math.round(toRGB( b) * 255)
        );
    }

}


const colorA = Color.from("#1e1109")
const colorB = Color.from("#eda773")
const colorC = Color.from("#930012")

colorC.r = 255
colorC.g = Math.round( toRGB(toLinear(colorC.g) + (toLinear(colorB.g) - toLinear(colorB.g)) * 255/265))
colorC.b = Math.round( toRGB(toLinear(colorC.b) + (toLinear(colorB.b) - toLinear(colorB.b)) * 255/265))

console.log(colorC.toRGBHex())

