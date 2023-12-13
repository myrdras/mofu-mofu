const ReturnsScreen = {
  render: () => {
    return `
      <section class="returns">
        <div class="separator"><img src="./assets/ico.svg" alt="">Devoluciones</div>
        <div class="section__description">Puedes devolver cualquier peluche dentro de los 30 días posteriores a la fecha de entrega para obtener un reembolso completo. Para ser elegible para un reembolso, el peluche debe ser nuevo y estar en las condiciones originales en que lo recibió. Todos los artículos deben estar limpios, sin lavar y con todas las etiquetas aún colocadas</div>
        <div class="section__description">Asegúrese de que el producto esté empaquetado adecuadamente y, siempre que sea posible, devuelva los productos en el embalaje original en el que se le enviaron. Las devoluciones recibidas que no estén en el embalaje original pueden estar sujetas a una tarifa de reposición.</div>
        <div class="section__description">Una vez recibido el artículo devuelto, le notificaremos por correo electrónico que hemos recibido su artículo y que el reembolso está en proceso. Todos los reembolsos van al comprador original. Los créditos o reembolsos se realizarán en el mismo método de pago y cuenta utilizada para realizar el pedido original.</div>
        <div class="section__description">Para comenzar, haga clic en el botón "Mi devolución" a continuación. Para realizar una devolución exitosa, deberá proporcionar la dirección de correo electrónico que utilizó para realizar esta compra y su número de pedido. Su número de pedido puede ubicarse en el correo electrónico de confirmación de compra.</div>
        <div class="section__description">Espere aproximadamente 2 semanas para que se procese el reembolso una vez que se devuelva su envío. Si en algún momento tienes alguna pregunta sobre el estado de tu devolución, puede mandar un correo electrónico con el asunto "Consulta devolución".</div>
        <div>
          <button class="primary-button">Mi devolución</button>
        </div>
      </section>
    `;
  },
}

export default ReturnsScreen;