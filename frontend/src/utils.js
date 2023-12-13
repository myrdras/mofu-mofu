export const parseRequestUrl = () => {
  const address = document.location.hash.slice(1).split('?')[0];
  const queryString =
    document.location.hash.slice(1).split('?').length === 2
      ? document.location.hash.slice(1).split('?')[1]
      : '';

  const url = address.toLowerCase() || '/';
  const r = url.split('/');
  const q = queryString.split('=');
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
    name: q[0],
    value: q[1],
  };
}
export const rerender = async (component, tag='#main-container') => {
  document.querySelector(tag).innerHTML = await component.render();
  await component.after_render();
};
export const redirectUser = () => {
  document.location.hash = '/dashboard';
};

export const showLoading = () => {
  document.getElementById('loading-overlay').classList.remove('inactive');
};

export const hideLoading = () => {
  document.getElementById('loading-overlay').classList.add('inactive');
};

export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button">OK</button>
  </div>
  `;
  document.getElementById('message-overlay').classList.remove('inactive');
  document
    .getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
      document.getElementById('message-overlay').classList.add('inactive');
      if (callback) {
        callback();
      }
    });
};