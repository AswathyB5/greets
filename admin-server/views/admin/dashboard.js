(async function () {
  const { api, esc, formatDate } = window.Admin;
  const rows = document.getElementById('enquiry-rows');
  const errorBox = document.getElementById('error');

  try {
    const data = await api('/api/dashboard');
    document.getElementById('total-products').textContent = data.totalProducts;
    document.getElementById('published-products').textContent = data.publishedProducts;
    document.getElementById('new-enquiries').textContent = data.newEnquiries;

    if (!data.latestEnquiries.length) {
      rows.innerHTML = '<tr><td colspan="7" class="empty">No enquiries yet.</td></tr>';
      return;
    }
    rows.innerHTML = data.latestEnquiries.map((e) => `
      <tr>
        <td>${esc(e.name)}</td>
        <td>${esc(e.company) || '<span class="muted">-</span>'}</td>
        <td>${esc(e.email)}</td>
        <td>${esc(e.product) || '<span class="muted">-</span>'}</td>
        <td><span class="badge ${esc(e.status)}">${esc(e.status)}</span></td>
        <td>${esc(formatDate(e.createdAt))}</td>
        <td class="row-actions"><a class="btn small" href="/admin/enquiries.html#/${esc(e._id)}">View</a></td>
      </tr>`).join('');
  } catch (err) {
    rows.innerHTML = '';
    errorBox.textContent = err.message;
    errorBox.hidden = false;
  }
})();
