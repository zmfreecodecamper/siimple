//Get start position
export function getStartPosition (pos, size) {
    return (size >= 0) ? pos : pos + size;
}

//Get end position
export function getEndPosition (pos, size) {
    return (size >= 0) ? pos + size : pos;
}

