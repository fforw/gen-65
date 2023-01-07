import Color, { getLuminance } from "./Color";


const allPalettes = [
    ["#000", "#fff"],
    ["#888c6c", "#a67244", "#402110", "#8c2016", "#590a0a"],
    ["#bf656d", "#732944", "#a67665", "#d9a796", "#8c5042"],
    ["#565bbf", "#071526", "#d6d98b", "#d9984a", "#d99873"],
    ["#613873", "#5d3b8c", "#382859", "#bf5b45", "#d9a19c"],
    ["#d94a64", "#d99379", "#f2cbbd", "#a6523f", "#f2f2f2"],
    ["#d9d9d9", "#a6a6a6", "#8c8c8c", "#595959", "#262626"],
    ["#8c5626", "#bf6836", "#592614", "#bf5a36", "#a64029"],
    ["#bf7c63", "#d9a796", "#a63429", "#590a0a", "#d96262"],
    ["#a6032f", "#022873", "#035aa6", "#04b2d9", "#05dbf2"],
    ["#58735c", "#f2dc9b", "#bf8a6b", "#260101", "#0d0d0d"],
    ["#8c0712", "#bf8a49", "#bfbcba", "#73574d", "#400303"],
    ["#d9d9d9", "#a6a6a6", "#595959", "#262626", "#0d0d0d"],
    ["#d7d9d9", "#a69d8d", "#d9a282", "#401f14", "#734136"],
    ["#03738c", "#037f8c", "#04d9d9", "#f28972", "#f20505"],
    ["#bf4e63", "#f2f2f2", "#d9ae5f", "#bf7d65", "#d9a38f"],
    ["#a6a6a6", "#f2f2f2", "#595959", "#262626", "#0d0d0d"],
    ["#f2dcc9", "#593018", "#734c36", "#d9b6a3", "#0d0d0d"],
    ["#a6a4a5", "#d9d9d9", "#594f56", "#262626", "#0d0d0d"],
    ["#021f59", "#2c4001", "#f25c05", "#bf7665", "#a60303"],
    ["#d94e5a", "#012e40", "#add1d9", "#8c0303", "#a64b4b"],
    ["#32a65a", "#84d9a2", "#014005", "#f2f2f2", "#0d0d0d"],
    ["#b3c3f2", "#8fa690", "#73450d", "#bfa78a", "#403d3c"],
    ["#1b3da6", "#26488c", "#2372d9", "#62abd9", "#f2d857"],
    ["#f21326", "#60bfbf", "#98d979", "#d99e30", "#f29999"],
    ["#a65b69", "#733c4a", "#3e4c59", "#bfb19f", "#f2e5d5"],
    ["#302840", "#1f1d59", "#3e518c", "#77a688", "#f2e2c4"],
    ["#9672a6", "#684f73", "#2d2c40", "#737065", "#0d0d0d"],
    ["#3f0259", "#f2e205", "#f2b705", "#f2ebdc", "#d95e32"],
    ["#663f8c", "#038c4c", "#f29727", "#f25f29", "#bf2626"],
    ["#779da6", "#034001", "#f2df7e", "#f2efe9", "#f25244"],
    ["#f21b2d", "#f23d5e", "#777cd9", "#525559", "#e9eff2"],
    ["#6d8ba6", "#bfcfd9", "#bfb84e", "#8c6e37", "#bf9e75"],
    ["#a6a6a6", "#737373", "#404040", "#262626", "#0d0d0d"],
    ["#222626", "#bdbfbf", "#48592f", "#7e8c61", "#9ea68f"],
    ["#bfb0a3", "#a64521", "#400d01", "#737373", "#404040"],
    ["#403f3c", "#f2bb77", "#59372a", "#a68376", "#bfbfbf"],
    ["#731a22", "#a63f48", "#bdd959", "#bfa095", "#8c5042"],
    ["#222e73", "#032ca6", "#85bff2", "#f2c84b", "#f29f05"],
    ["#a66a75", "#580259", "#f05cf2", "#f2e205", "#f2d43d"],
    ["#0476d9", "#05aff2", "#a4d932", "#f2be22", "#f2cc85"],
    ["#d99e30", "#a67a44", "#732002", "#d94625", "#400101"],
    ["#314259", "#d9843b", "#73310a", "#a64914", "#0d0d0d"],
    ["#0f5cbf", "#072b59", "#0f6dbf", "#042940", "#72dbf2"],
    ["#204037", "#558c3b", "#9cd95f", "#bfa78a", "#f2541b"],
    ["#0442bf", "#5cacf2", "#f2b705", "#f29f05", "#f2b8a2"],
    ["#c2d2f2", "#5176a6", "#70731f", "#a67d4b", "#a64b29"],
    ["#485922", "#798c35", "#b4bf5e", "#242614", "#f2f2f2"],
    ["#f2d8c9", "#260b01", "#73564c", "#bf9484", "#d9beb4"],
    ["#f2c063", "#a68446", "#d9a25f", "#8c6a3f", "#59452c"],
    ["#a2cdf2", "#0367a6", "#49b1f2", "#027373", "#7f8c1c"],
    ["#1f4c73", "#387ca6", "#96d2d9", "#f2e8c9", "#402f11"],
    ["#4c6c73", "#8a8c3e", "#59452c", "#d9b88f", "#bf8f65"],
    ["#f2bb13", "#f28c0f", "#d9a577", "#a61b0f", "#f2f2f2"],
    ["#323e40", "#f2ab27", "#d97d0d", "#732002", "#d94d1a"],
    ["#264022", "#698c46", "#bf9278", "#d9ccc5", "#735e5a"],
    ["#0468bf", "#05aff2", "#f2b705", "#f28705", "#bf3604"],
    ["#730217", "#090b0d", "#f2cb05", "#594302", "#d94f30"],
    ["#bfa004", "#bf7e04", "#bf4904", "#bf1304", "#0d0d0d"],
    ["#d90d32", "#d3d9a7", "#f25116", "#bf3111", "#f2f2f2"],
    ["#f2cb05", "#f2b705", "#262523", "#d97904", "#d92818"],
    ["#7eb3bf", "#8c8630", "#f2f0ce", "#f2bb9b", "#d9765f"],
    ["#034aa6", "#03588c", "#aab7bf", "#56a662", "#f26e22"],
    ["#f26d85", "#bf214b", "#c1d0d9", "#0e6973", "#0e7373"],
    ["#224021", "#5f8c4a", "#59734d", "#35402d", "#592c22"],
    ["#89b3d9", "#f2e6d8", "#d9985f", "#59220e", "#a64521"],
    ["#034c8c", "#69a7bf", "#f2e205", "#f2cb05", "#f2d49b"],
    ["#bf2633", "#f2b90f", "#f2b33d", "#a67a29", "#a66249"],
    ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"],
    ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"],
    ["#ECD078", "#D95B43", "#C02942", "#542437", "#53777A"],
    ["#556270", "#4ECDC4", "#C7F464", "#FF6B6B", "#C44D58"],
    ["#774F38", "#E08E79", "#F1D4AF", "#ECE5CE", "#C5E0DC"],
    ["#E8DDCB", "#CDB380", "#036564", "#033649", "#031634"],
    ["#490A3D", "#BD1550", "#E97F02", "#F8CA00", "#8A9B0F"],
    ["#594F4F", "#547980", "#45ADA8", "#9DE0AD", "#E5FCC2"],
    ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"],
    ["#E94E77", "#D68189", "#C6A49A", "#C6E5D9", "#F4EAD5"],
    ["#3FB8AF", "#7FC7AF", "#DAD8A7", "#FF9E9D", "#FF3D7F"],
    ["#D9CEB2", "#948C75", "#D5DED9", "#7A6A53", "#99B2B7"],
    ["#FFFFFF", "#CBE86B", "#F2E9E1", "#1C140D", "#CBE86B"],
    ["#EFFFCD", "#DCE9BE", "#555152", "#2E2633", "#99173C"],
    ["#343838", "#005F6B", "#008C9E", "#00B4CC", "#00DFFC"],
    ["#413E4A", "#73626E", "#B38184", "#F0B49E", "#F7E4BE"],
    ["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#E1F5C4"],
    ["#99B898", "#FECEA8", "#FF847C", "#E84A5F", "#2A363B"],
    ["#655643", "#80BCA3", "#F6F7BD", "#E6AC27", "#BF4D28"],
    ["#00A8C6", "#40C0CB", "#F9F2E7", "#AEE239", "#8FBE00"],
    ["#8a00d4", "#d527b7", "#f782c2", "#f9c46b", "#e3e3e3"],
    ["#e74645", "#fb7756", "#facd60", "#fdfa66", "#1ac0c6"],
    ["#454d66", "#309975", "#58b368", "#dad873", "#efeeb4"],
    ["#272643", "#ffffff", "#e3f6f5", "#bae8e8", "#2c698d"],
    ["#361d32", "#543c52", "#f55951", "#edd2cb", "#f1e8e6"],
    ["#072448", "#54d2d2", "#ffcb00", "#f8aa4b", "#ff6150"],
    ["#12492f", "#0a2f35", "#f56038", "#f7a325", "#ffca7a"],
    ["#122c91", "#2a6fdb", "#48d6d2", "#81e9e6", "#fefcbf"],
    ["#27104e", "#64379f", "#9854cb", "#ddacf5", "#75e8e7"],
    ["#f7a400", "#3a9efd", "#3e4491", "#292a73", "#1a1b4b"],
    ["#343090", "#5f59f7", "#6592fd", "#44c2fd", "#8c61ff"],
    ["#1f306e", "#553772", "#8f3b76", "#c7417b", "#f5487f"],
    ["#e0f0ea", "#95adbe", "#574f7d", "#503a65", "#3c2a4d"],
    ["#f9b4ab", "#fdebd3", "#264e70", "#679186", "#bbd4ce"],
    ["#492b7c", "#301551", "#ed8a0a", "#f6d912", "#fff29c"],
    ["#ffa822", "#134e6f", "#ff6150", "#1ac0c6", "#dee0e6"],
    ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"],
    ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"],
    ["#ECD078", "#D95B43", "#C02942", "#542437", "#53777A"],
    ["#556270", "#4ECDC4", "#C7F464", "#FF6B6B", "#C44D58"],
    ["#774F38", "#E08E79", "#F1D4AF", "#ECE5CE", "#C5E0DC"],
    ["#E8DDCB", "#CDB380", "#036564", "#033649", "#031634"],
    ["#490A3D", "#BD1550", "#E97F02", "#F8CA00", "#8A9B0F"],
    ["#594F4F", "#547980", "#45ADA8", "#9DE0AD", "#E5FCC2"],
    ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"],
    ["#E94E77", "#D68189", "#C6A49A", "#C6E5D9", "#F4EAD5"],
    ["#3FB8AF", "#7FC7AF", "#DAD8A7", "#FF9E9D", "#FF3D7F"],
    ["#D9CEB2", "#948C75", "#D5DED9", "#7A6A53", "#99B2B7"],
    ["#FFFFFF", "#CBE86B", "#F2E9E1", "#1C140D", "#CBE86B"],
    ["#EFFFCD", "#DCE9BE", "#555152", "#2E2633", "#99173C"],
    ["#343838", "#005F6B", "#008C9E", "#00B4CC", "#00DFFC"],
    ["#413E4A", "#73626E", "#B38184", "#F0B49E", "#F7E4BE"],
    ["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#E1F5C4"],
    ["#99B898", "#FECEA8", "#FF847C", "#E84A5F", "#2A363B"],
    ["#655643", "#80BCA3", "#F6F7BD", "#E6AC27", "#BF4D28"],
    ["#00A8C6", "#40C0CB", "#F9F2E7", "#AEE239", "#8FBE00"],
    ["#8a00d4", "#d527b7", "#f782c2", "#f9c46b", "#e3e3e3"],
    ["#e74645", "#fb7756", "#facd60", "#fdfa66", "#1ac0c6"],
    ["#454d66", "#309975", "#58b368", "#dad873", "#efeeb4"],
    ["#272643", "#ffffff", "#e3f6f5", "#bae8e8", "#2c698d"],
    ["#361d32", "#543c52", "#f55951", "#edd2cb", "#f1e8e6"],
    ["#072448", "#54d2d2", "#ffcb00", "#f8aa4b", "#ff6150"],
    ["#12492f", "#0a2f35", "#f56038", "#f7a325", "#ffca7a"],
    ["#122c91", "#2a6fdb", "#48d6d2", "#81e9e6", "#fefcbf"],
    ["#27104e", "#64379f", "#9854cb", "#ddacf5", "#75e8e7"],
    ["#f7a400", "#3a9efd", "#3e4491", "#292a73", "#1a1b4b"],
    ["#343090", "#5f59f7", "#6592fd", "#44c2fd", "#8c61ff"],
    ["#1f306e", "#553772", "#8f3b76", "#c7417b", "#f5487f"],
    ["#e0f0ea", "#95adbe", "#574f7d", "#503a65", "#3c2a4d"],
    ["#f9b4ab", "#fdebd3", "#264e70", "#679186", "#bbd4ce"],
    ["#492b7c", "#301551", "#ed8a0a", "#f6d912", "#fff29c"],
    ["#ffa822", "#134e6f", "#ff6150", "#1ac0c6", "#dee0e6"]
]
export default function randomPalette(rnd = Math.random(), filter) {
    const all = filter ? allPalettes.filter(filter) : allPalettes
    return all[0 | rnd * all.length]
}

export function randomPaletteWithBlack(rnd = Math.random(), filter, minLuminance = 1200) {
    let palette = randomPalette(rnd, filter);

    let min = Infinity
    let darkest


    const luminances = {}

    palette.forEach(col => luminances[col] = getLuminance(Color.from(col)));
    palette.sort(
        (a,b) => {
            return luminances[a] - luminances[b]
        }
    )


    if (luminances[palette[0]] > minLuminance)
    {
        //console.log("Add black")
        palette = palette.slice()
        palette.unshift("#000")
        luminances["#000"]  = 0
    }

    // for (let i = 0; i < palette.length; i++)
    // {
    //     const col = palette[i];
    //     console.log(col, ": ", luminances[col])
    // }

    return palette
    
}
