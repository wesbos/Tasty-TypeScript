function calculateBill(total: number, gst?: number, pst?: number) {
  const tip = 0.15;
  if (gst && pst) {
    return total + total * gst + total * pst + total * tip;
  }
  return total + total * tip;
}
