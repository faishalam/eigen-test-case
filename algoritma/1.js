// 1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

function reverseLettersKeepNumber(str) {
  const letters = str.match(/[a-zA-Z]/g) || [];
  const reversed = letters.reverse();
  let result = "";
  let letterIndex = 0;

  for (let i = 0; i < str.length; i++) {
    if (/[a-zA-Z]/.test(str[i])) {
      result += reversed[letterIndex];
      letterIndex++;
    } else {
      result += str[i];
    }
  }

  return result;
}

console.log(reverseLettersKeepNumber("NEGIE1"));
