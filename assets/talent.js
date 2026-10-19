  document.getElementById('talent-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    var f = this;
    document.getElementById('form-error-t').style.display = 'none';
    var btn = document.getElementById('submit-btn');

    // Collect location prefs (checkboxes)
    var locPrefs = Array.from(f.querySelectorAll('[name="location_pref"]:checked')).map(function(c){ return c.value; });

    // Build formatted profile block
    var firstName = f.first_name.value.trim();
    var lastName  = f.last_name.value.trim();
    var fullName  = firstName + ' ' + lastName;

    var profileJson = {
      first_name:      firstName,
      last_name:       lastName,
      email:           f.email.value.trim(),
      phone:           f.phone.value.trim(),
      location:        f.location.value.trim(),
      zip_code:        f.zip_code.value.trim(),
      linkedin:        f.linkedin.value.trim(),
      work_auth:       f.work_auth.value,
      engagement_type: f.engagement_type.value,
      expected_rate:   f.expected_rate.value.trim(),
      availability:    f.availability.value,
      location_pref:   locPrefs,
      job_titles:      f.job_titles.value.trim(),
      experience_years:f.experience_years.value,
      skills:          f.skills.value.trim(),
      resume_link:     f.resume_link.value.trim(),
      notes:           f.notes.value.trim(),
      source:          'jobseam-talent',
    };

    var profile = [
      '============================================================',
      'CANDIDATE PROFILE',
      '============================================================',
      '',
      'PERSONAL',
      '  Name       : ' + fullName,
      '  Email      : ' + f.email.value.trim(),
      '  Phone      : ' + f.phone.value.trim(),
      '  Location   : ' + f.location.value.trim() + '  ' + f.zip_code.value.trim(),
      '  LinkedIn   : ' + (f.linkedin.value.trim() || 'Not provided'),
      '',
      'WORK AUTHORIZATION & ENGAGEMENT',
      '  Work Auth  : ' + f.work_auth.value,
      '  Engagement : ' + f.engagement_type.value,
      '  Rate       : ' + f.expected_rate.value.trim(),
      '  Availability: ' + f.availability.value,
      '  Location Pref: ' + (locPrefs.length ? locPrefs.join(', ') : 'Not specified'),
      '',
      'SKILLS & EXPERIENCE',
      '  Target Roles: ' + f.job_titles.value.trim(),
      '  Experience  : ' + f.experience_years.value,
      '  Skills      : ' + f.skills.value.trim(),
      '  Resume Link : ' + (f.resume_link.value.trim() || 'Not provided'),
      '',
      'ADDITIONAL NOTES',
      '  ' + (f.notes.value.trim() || 'None'),
      '',
      '============================================================',
      'Submitted via jobseam.com/talent for Quezaal Talent Network',
      '============================================================',
      '',
      '--- PROFILE_JSON_BEGIN ---',
      JSON.stringify(profileJson),
      '--- PROFILE_JSON_END ---',
    ].join('\n');

    document.getElementById('profile-message').value = profile;
    document.getElementById('profile-subject').value = 'Talent Profile: ' + fullName + ' | ' + f.job_titles.value.trim();

    btn.textContent = 'Submitting...';
    btn.disabled = true;
    try {
      var res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', body: new FormData(f)
      });
      var data = await res.json();
      if (data.success) {
        f.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
        document.getElementById('form-success').focus();
      } else {
        throw new Error('not ok');
      }
    } catch(err) {
      document.getElementById('form-error-t').style.display = 'block';
      btn.textContent = 'Submit My Profile';
      btn.disabled = false;
    }
  });

  document.getElementById('quick-talent-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    const button = document.getElementById('quick-submit-btn');
    const error = document.getElementById('quick-error');
    error.hidden = true;
    const profile = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      role: form.elements.role.value.trim(),
      source: 'quick-apply'
    };
    document.getElementById('quick-profile-message').value = [
      'Quick Apply submission via jobseam.com/talent for Quezaal Talent Network',
      'Name: ' + profile.name, 'Email: ' + profile.email, 'Role: ' + profile.role,
      '--- PROFILE_JSON_BEGIN ---', JSON.stringify(profile), '--- PROFILE_JSON_END ---'
    ].join('\n');
    button.disabled = true;
    button.textContent = 'Sending...';
    try {
      const response = await fetch(form.action, {method: 'POST', body: new FormData(form)});
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error('Submission failed');
      form.hidden = true;
      const success = document.getElementById('quick-success');
      success.hidden = false;
      success.focus();
    } catch (_) {
      error.hidden = false;
      button.disabled = false;
      button.textContent = 'Send to Recruiting Team';
    }
  });
