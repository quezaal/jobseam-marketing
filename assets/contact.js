(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.hidden = false;
  const topics = {
    general: {email:'hello@jobseam.com', label:'General inquiry'},
    candidate: {email:'hello@jobseam.com', label:'Candidate access'},
    sales: {email:'sales@jobseam.com', label:'Sales inquiry'},
    support: {email:'support@jobseam.com', label:'Customer support'}
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = form.elements;
    const topic = topics[fields.topic.value] || topics.general;
    const body = [
      'Name: ' + fields.name.value.trim(),
      'Reply email: ' + fields.email.value.trim(),
      'Company: ' + (fields.company.value.trim() || 'Not specified'),
      '', fields.message.value.trim()
    ].join('\n');
    const url = 'mailto:' + topic.email + '?subject=' + encodeURIComponent('JobSeam — ' + topic.label) + '&body=' + encodeURIComponent(body);
    document.getElementById('contact-status').textContent = 'Email draft prepared for ' + topic.email + '. Review and send it in your email app; no message has been sent by this page.';
    window.location.href = url;
  });
})();
