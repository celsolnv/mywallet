export function convertBRLToUSD(brl: string) {
  brl = brl.replace(".", "");
  brl = brl.replace(",", ".");
  return parseFloat(brl).toFixed(2);
}
