export function validateTransfer(
  transfer: number,
  arrival: number,
  selectedTank: any,
) {
  if (!transfer || !arrival) return "Preencha todos os campos";
  if (transfer === 0) return "Quantidade deve ser maior que zero";
  if (selectedTank) {
    const capacityLeft =
      selectedTank.capacidadeDeposito - selectedTank.volumeConteudo;
    if (transfer > capacityLeft) return "Capacidade excedida";
  }
  if (arrival > transfer) return "Quantidade recebida maior que transferida";
  return null;
}
