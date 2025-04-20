/**
 * King Wen Sequence Mapping
 * Maps binary representations to their King Wen sequence numbers
 */

export const KING_WEN_SEQUENCE = {
    // Format: binary: kingWenNumber
    "111111": 1,   // ䷀ 乾 (Force)
    "000000": 2,   // ䷁ 坤 (Field)
    "010001": 3,   // ䷂ 屯 (Sprouting)
    "100010": 4,   // ䷃ 蒙 (Enveloping)
    "010111": 5,   // ䷄ 需 (Waiting)
    "111010": 6,   // ䷅ 訟 (Conflict)
    "000010": 7,   // ䷆ 師 (Army)
    "010000": 8,   // ䷇ 比 (Holding Together)
    "110111": 9,   // ䷈ 小畜 (Small Accumulating)
    "111011": 10,  // ䷉ 履 (Treading)
    "000111": 11,  // ䷊ 泰 (Peace)
    "111000": 12,  // ䷋ 否 (Standstill)
    "111101": 13,  // ䷌ 同人 (Fellowship)
    "101111": 14,  // ䷍ 大有 (Great Possession)
    "000100": 15,  // ䷎ 謙 (Modesty)
    "001000": 16,  // ䷏ 豫 (Enthusiasm)
    "011001": 17,  // ䷐ 隨 (Following)
    "100110": 18,  // ䷑ 蠱 (Work on the Decayed)
    "000011": 19,  // ䷒ 臨 (Approaching)
    "110000": 20,  // ䷓ 觀 (Contemplation)
    "101001": 21,  // ䷔ 噬嗑 (Biting Through)
    "100101": 22,  // ䷕ 賁 (Grace)
    "100000": 23,  // ䷖ 剝 (Splitting Apart)
    "000001": 24,  // ䷗ 復 (Return)
    "111001": 25,  // ䷘ 無妄 (Innocence)
    "100111": 26,  // ䷙ 大畜 (Great Accumulating)
    "100001": 27,  // ䷚ 頤 (Corners of the Mouth)
    "011110": 28,  // ䷛ 大過 (Great Exceeding)
    "010010": 29,  // ䷜ 坎 (Abysmal Water)
    "101101": 30,  // ䷝ 離 (Clinging Fire)
    "011100": 31,  // ䷞ 咸 (Influence)
    "001110": 32,  // ䷟ 恆 (Duration)
    "111100": 33,  // ䷠ 遯 (Retreat)
    "001111": 34,  // ䷡ 大壯 (Great Power)
    "101000": 35,  // ䷢ 晉 (Progress)
    "000101": 36,  // ䷣ 明夷 (Darkening of the Light)
    "110101": 37,  // ䷤ 家人 (Family)
    "101011": 38,  // ䷥ 睽 (Opposition)
    "010100": 39,  // ䷦ 蹇 (Obstruction)
    "001010": 40,  // ䷧ 解 (Deliverance)
    "100011": 41,  // ䷨ 損 (Decrease)
    "110001": 42,  // ䷩ 益 (Increase)
    "011111": 43,  // ䷪ 夬 (Breakthrough)
    "111110": 44,  // ䷫ 姤 (Coming to Meet)
    "011000": 45,  // ䷬ 萃 (Gathering Together)
    "000110": 46,  // ䷭ 升 (Pushing Upward)
    "011010": 47,  // ䷮ 困 (Oppression)
    "010110": 48,  // ䷯ 井 (The Well)
    "011101": 49,  // ䷰ 革 (Revolution)
    "101110": 50,  // ䷱ 鼎 (The Cauldron)
    "001001": 51,  // ䷲ 震 (Arousing Thunder)
    "100100": 52,  // ䷳ 艮 (Keeping Still Mountain)
    "110100": 53,  // ䷴ 漸 (Development)
    "001011": 54,  // ䷵ 歸妹 (The Marrying Maiden)
    "001101": 55,  // ䷶ 豐 (Abundance)
    "101100": 56,  // ䷷ 旅 (The Wanderer)
    "110110": 57,  // ䷸ 巽 (The Gentle Wind)
    "011011": 58,  // ䷹ 兌 (The Joyous Lake)
    "110010": 59,  // ䷺ 渙 (Dispersion)
    "010011": 60,  // ䷻ 節 (Limitation)
    "110011": 61,  // ䷼ 中孚 (Inner Truth)
    "001100": 62,  // ䷽ 小過 (Small Exceeding)
    "101010": 63,  // ䷾ 既濟 (After Completion)
    "010101": 64   // ䷿ 未濟 (Before Completion)
};

// Reverse mapping for looking up binary from King Wen number
export const REVERSE_KING_WEN = Object.fromEntries(
    Object.entries(KING_WEN_SEQUENCE).map(([binary, number]) => [number, binary])
);

/**
 * Convert binary array to King Wen sequence number
 * @param {Array<number>} lines - Array of 6 binary values (0/1)
 * @returns {number} King Wen sequence number
 */
export function binaryToKingWen(lines) {
    const binary = lines.join('');
    return KING_WEN_SEQUENCE[binary] || null;
}

/**
 * Convert King Wen number to binary array
 * @param {number} kingWenNumber - Number in King Wen sequence (1-64)
 * @returns {Array<number>} Array of 6 binary values
 */
export function kingWenToBinary(kingWenNumber) {
    const binary = REVERSE_KING_WEN[kingWenNumber];
    return binary ? binary.split('').map(Number) : null;
}

/**
 * Get opposite hexagram in King Wen sequence
 * @param {number} kingWenNumber - Number in King Wen sequence (1-64)
 * @returns {number} Opposite hexagram number
 */
export function getOppositeHexagram(kingWenNumber) {
    // In King Wen sequence, opposites are typically separated by 32
    // with wrapping around 64
    return ((kingWenNumber + 31) % 64) + 1;
}

/**
 * Get complementary hexagram (all lines reversed)
 * @param {number} kingWenNumber - Number in King Wen sequence (1-64)
 * @returns {number} Complementary hexagram number
 */
export function getComplementaryHexagram(kingWenNumber) {
    const binary = REVERSE_KING_WEN[kingWenNumber];
    if (!binary) return null;
    
    const complementary = binary
        .split('')
        .map(bit => bit === '0' ? '1' : '0')
        .join('');
    
    return KING_WEN_SEQUENCE[complementary];
} 