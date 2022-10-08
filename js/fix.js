function fix() {
    let infField = document.getElementById('informationField');
    let inputField = document.getElementById('extSeqField');
    let inputSeq = String(inputField.value).split('');
    let restoredSeqField = document.getElementById('restoredSeqField');
    try {
        let error = new TypeError('error');
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
    let oldSeq = inputSeq;
    inputSeq = HammingCoder.fixExtSeq(inputSeq, HammingCoder.getControlBitIndices(inputSeq));
    inputField.value = inputSeq.join('');
    infField.value = oldSeq.join('') + '\n fixed';
    restoredSeqField.value = HammingCoder.extractSequence(inputSeq).join('');
}