/* eslint-disable indent */
const convert = (d) => {
  return d.constructor === Date
    ? d
    : d.constructor === Array
    ? new Date(d[0], d[1], d[2])
    : d.constructor === Number
    ? new Date(d)
    : d.constructor === String
    ? new Date(d)
    : typeof d === 'object'
    ? new Date(d.year, d.month, d.date)
    : NaN
}

const compare = (a, b) => {
  return isFinite((a = convert(a).valueOf())) && isFinite((b = convert(b).valueOf()))
    ? +(a > b) - +(a < b)
    : NaN
}

const inRange = (d, start, end) => {
  return isFinite((d = convert(d).valueOf())) &&
    isFinite((start = convert(start).valueOf())) &&
    isFinite((end = convert(end).valueOf()))
    ? start <= d && d <= end
    : NaN
}

export { compare, convert, inRange }
