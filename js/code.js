function code() {
    let infField = document.getElementById('informationField');
    let extSeqField = document.getElementById('extSeqField');
    let inputSeq = String(document.getElementById('seqField').value).split('');

    try {
        let error = new TypeError('input sequence must contain 0 or 1 only.');
        if (inputSeq.length === 0) throw error;
        for (let i = 0; i < inputSeq.length; i++) {
            inputSeq[i] = Number(inputSeq[i]);
            if (inputSeq[i] !== 0 && inputSeq[i] !== 1) {
                throw error;
            }
        }
    } catch (e) {
        console.log(e.message);
        infField.value = e.message;
        return;
    }

    let extSeq = HammingCoder.makeExtSeq(inputSeq);
    extSeq = HammingCoder.countControlBits(extSeq, HammingCoder.getControlBitIndices(extSeq));
    extSeqField.value = extSeq.join('');
    infField.value = 'your extended sequence.';
}