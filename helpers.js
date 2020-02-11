const roundDecimal = (n) => Math.round(n * 100) / 100

const showTime = (hrstart) => {
    const hrend = process.hrtime(hrstart)
    const totalTime = roundDecimal(hrend[0] + (hrend[1] / 1000000000))
    console.log(`Benchmark took ${totalTime} seconds`)
}

module.exports = {
    showTime
}