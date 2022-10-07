class ExtSeqBreaker {
    constructor(workPair) {
        this._seq = seq;
        this._brokenSeq = this.break(work);
    }
    break(sequence){
        if(!Array.isArray(sequence)) throw new TypeError('ExtSeqBreaker constructor must be array');
        let rand = Math.round(Math.random() * (sequence.length) - 0.5);
    }
}

test = new ExtSeqBreaker([0,1,2,3,4]);