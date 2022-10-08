function makeExtSeq(sequence) {
    try {
        if(!Array.isArray(sequence) || sequence.length === 0) throw new TypeError('arg must be array');
    } catch (e) {
        console.log(e.message);
        return undefined;
    }
    let tmpSeq = [].concat(sequence);
    let extendedSequence = null;
    if(sequence.length === 1) {
        extendedSequence = new Array(3);
        this._controlBitIndices = new Array(2);
    }
    else if(sequence.length === 2) {
        extendedSequence = new Array(5);
    }
    else {
        let controlBitsQuantity = Math.floor(Math.log(sequence.length)/Math.log(2)) + 1;
        extendedSequence = new Array(sequence.length + controlBitsQuantity);
    }
    extendedSequence[0] = 0;
    for(let i = 1; i < extendedSequence.length; i++) {
        if (Number.isInteger(Math.log(i + 1) / Math.log(2))) {
            extendedSequence[i] = 0;
            continue;
        }
        extendedSequence[i] = tmpSeq.shift();
    }
    return extendedSequence;
}
function countControlBits(extSeq, controlBitIndices) {
    try {
        if(!Array.isArray(extSeq) || extSeq.length === 0) throw new TypeError('arg must be array');
    } catch (e) {
        console.log(e.message);
        return undefined;
    }
    let newExtSeq = [].concat(extSeq);
    for(let i = 0; i < controlBitIndices.length; i++) {
        let controlledBitsSum = 0;
        for(let j = controlBitIndices[i]; j < newExtSeq.length; j += (2**(i+1))) {
            for(let k = j; k < j+2**i; k++) {
                if(controlBitIndices[i] === k) continue; // skip control bit
                if(k >= newExtSeq.length) break;
                controlledBitsSum += newExtSeq[k];
                //          console.log(i,j,k, controlledBitsSum);
            }
        }
        newExtSeq[controlBitIndices[i]] = controlledBitsSum % 2;
        controlledBitsSum = 0;
    }
    return newExtSeq;
}
function getControlBitIndices(extSeq) {
    let controlBitIndices = [];
    controlBitIndices.push(0);
    for(let i = 1; i < extSeq.length; i++) if(Number.isInteger(Math.log(i+1)/Math.log(2))) controlBitIndices.push(i);
    return controlBitIndices;
}
function fixExtSeq(extSeq, controlBitIndices){
    let fixingExtSeq = [].concat(extSeq);
    //console.log('fixingExtSeq',fixingExtSeq);
    let newExtSeq = countControlBits(extSeq, controlBitIndices);
    //console.log('newExtSeq',newExtSeq);
    let mistakeNum = 0;
    for (let i = 0; i < controlBitIndices.length; i++) {
        if(fixingExtSeq[controlBitIndices[i]] !== newExtSeq[controlBitIndices[i]]) {
            mistakeNum += controlBitIndices[i] + 1;
            console.log(i,mistakeNum);
        }
    }
    if(mistakeNum !== 0) {
        console.log('m',mistakeNum);
        fixingExtSeq[mistakeNum-1] = fixingExtSeq[mistakeNum-1] === 0? 1:0;
    }
    return fixingExtSeq;
}

let seq = [1,1,0,0];
let extSeq = makeExtSeq(seq);
let controlBitsIndices = getControlBitIndices(extSeq);
extSeq = countControlBits(extSeq, controlBitsIndices);
console.log(extSeq);
let fixedExtSeq = fixExtSeq([0, 1, 1, 1, 1, 0, 0], controlBitsIndices);
console.log('fes', fixedExtSeq)