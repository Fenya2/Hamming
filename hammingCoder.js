class WorkPair{
    constructor(sequence) {
        this._extendedSequence = [];
        this._controlBitIndices = [];
        this._sequence = null;

        try {
            if(!Array.isArray(sequence) || sequence.length === 0) throw new TypeError('WorkPair constructor arg must be not empty array');
        } catch (e) {
            console.log(e.message);
            return undefined;
        }

        if(sequence.length === 1) {
            this._extendedSequence = new Array(3);
            this._controlBitIndices = new Array(2);
        }
        else if(sequence.length === 2) {
            this._extendedSequence = new Array(5);
            this._controlBitIndices = new Array(3);
        }
        else {
            let controlBitsQuantity = Math.floor(Math.log(sequence.length)/Math.log(2)) + 1;
            this._extendedSequence = new Array(sequence.length + controlBitsQuantity);
            this._controlBitIndices = new Array(controlBitsQuantity);
        }

        this._sequence = [].concat(sequence);
        this._extendedSequence[0] = 0;
        this._controlBitIndices[0] = 0;
        let controlBitCounter = 1;
        for(let i = 1; i < this._extendedSequence.length; i++) {
            if(Number.isInteger(Math.log(i+1)/Math.log(2))) {
                this._extendedSequence[i] = 0;
                this._controlBitIndices[controlBitCounter] = i;
                controlBitCounter++;
                continue;
            }
            this._extendedSequence[i] = sequence.shift();
        }
    }

    getControlBits() {
        let controlBits = new Array(this._controlBitIndices.length);
        for(let i = 0; i < this._controlBitIndices.length; i++) {
            controlBits[i] = [this._controlBitIndices[i], this.extendedSequence[this._controlBitIndices[i]]];
        }
        return controlBits;
    }

    set extendedSequence(extendedSequence) {
        try {
            if(!Array.isArray(extendedSequence) || extendedSequence.length !== this._extendedSequence.length) throw new TypeError('WorkPair.extendedSequence arg must be array with length equal to last value length');
        } catch (e) {
            console.log(e.message);
        }
        this._extendedSequence = [].concat(extendedSequence);
        let sequence = [];
        let controlBitsCounter = 0;
        for(let i = 0;  i < extendedSequence.length; i++) {
            if(i === this._controlBitIndices[controlBitsCounter]) {
                controlBitsCounter++;
                continue;
            }
            sequence.push(extendedSequence[i]);
        }
        this._sequence = sequence;
    }

    get sequence() {
        return this._sequence;
    }
    get extendedSequence() {
        return this._extendedSequence;
    }
    get controlBitIndices() {
        return this._controlBitIndices;
    }
}

class HammingCoder {
    constructor() {
        this._coderWorkPair = null;
    }

    fixSequence(workPair) {
        try {
            if(!(workPair instanceof WorkPair)) throw new TypeError('arg of HammingCoder.prototype.checkSequence() must be WorkPair.');
        } catch (e) {
            console.log(e.message);
        }
        let oldSeq = workPair.sequence;
        console.log(oldSeq);
        let oldExtSeq = workPair.extendedSequence;
        console.log(oldExtSeq);

        // let wrongExtSeq = [].concat(workPair.extendedSequence);
        // let rightControlBits = workPair.getControlBits();
        // this.countControlBits(workPair); // todo переписать все методы на работу с значениями, а не ссылками, тогда должно работать!!!
        // let wrongControlBits = workPair.getControlBits();
        // let mistakeNum = null;
        // for(let i = 0; i < rightControlBits.length; i++) {
        //     if(rightControlBits[i][1] !== wrongControlBits[i][1]){
        //         mistakeNum += rightControlBits[i][0];
        //     }
        // }
        // console.log('mistake',mistakeNum);
        // if(mistakeNum) {
        //     wrongExtSeq[mistakeNum+1] = wrongExtSeq[mistakeNum+1] === 0? 1:0;
        //     workPair.extendedSequence = [].concat(wrongExtSeq);
        // }
    }

    countControlBits(workPair) {
        try {
            if(!(workPair instanceof WorkPair)) throw new TypeError('arg of HammingCoder.prototype.countControlBits() must be WorkPair.');
        } catch (e) {
            console.log(e.message);
        }
        for(let i = 0; i < workPair.controlBitIndices.length; i++) {
            let controlledBitsSum = 0;
            for(let j = workPair.controlBitIndices[i]; j < workPair.extendedSequence.length; j += 2*(i+1)) {
                for(let k = j; k < j+i+1; k++) {
                    if(workPair.controlBitIndices[i] === k) continue; // skip control bit
                    controlledBitsSum += workPair.extendedSequence[k];
                    //console.log(i, j, k, controlledBitsSum);
                }
            }
            //console.log(zeroSequence, controlBitIndices[i]);
            workPair.extendedSequence[workPair.controlBitIndices[i]] = controlledBitsSum % 2;
            controlledBitsSum = 0;
        }
        //console.log(workPair.sequence);
        //return workPair;
    }
}

let coder = new  HammingCoder();
let seq = new WorkPair([1,1,0,1]);

coder.countControlBits(seq);
coder.fixSequence(seq);
