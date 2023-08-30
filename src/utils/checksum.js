function c0(v) {
  return c1(v) ^ c2(v) ^ c3(v);
}

function c1(v) {
  return c2(c3(convertByte(v)));
}

function c2(v) {
  return c3(convertByte(v));
}

function c3(v) {
  return convertByte(v) ^ v;
}

function convertByte(v) {
  return v & 0x80 ? 0xff & ((v << 1) ^ 0x1b) : v << 1;
}

/**
 * Calculate checksum for a 4-byte data.
 * @param {number[]} data
 * @returns {number}
 */
export const checksum = (data) =>
  [
    c0(data[0]) ^ c1(data[1]) ^ c2(data[2]) ^ c3(data[3]),
    c3(data[0]) ^ c0(data[1]) ^ c1(data[2]) ^ c2(data[3]),
    c2(data[0]) ^ c3(data[1]) ^ c0(data[2]) ^ c1(data[3]),
    c1(data[0]) ^ c2(data[1]) ^ c3(data[2]) ^ c0(data[3]),
  ].reduce((prev, value) => prev + value) % 100;
