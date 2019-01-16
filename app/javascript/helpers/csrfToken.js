export default () => decodeURIComponent(document.cookie.match('X-CSRF-Token=([^;]+)')[1]);
