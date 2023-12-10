const CheckoutSteps = {
  render: (props) => {
    return `
    <div class="checkout-steps">
      <div class="${props.step1 ? 'step-active' : ''}">Entrega</div>
      <div class="${props.step2 ? 'step-active' : ''}">Pago</div>
    </div>
    `;
  },
};
export default CheckoutSteps;