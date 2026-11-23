# Demo requests and Zoho Bookings

JobSeam demo and trial requests open an email draft to the recipient in `site-config.json`. The visitor sends the draft. The site does not authenticate to Zoho Mail, send email, or confirm appointments.

## Enable self-service demo scheduling

1. Sign in to **Zoho Bookings** with the organization account that will manage the calendar. Zoho Mail alone does not create a public appointment page.
2. Create a 20-minute **JobSeam demo** appointment type. Assign staff, set availability and time zone, and configure attendee confirmations and meeting details.
3. Connect the host’s **Zoho Calendar** from Bookings and authorize the connection. Pick the calendar used for checking availability and for adding appointments. [Connect your calendar](https://help.zoho.com/portal/en/kb/bookings/integrations/calendars/articles/how-to-connect-your-calendar)
4. Copy the **public service booking URL** and set `zoho_booking_url` in [site-config.json](../site-config.json). Leave it empty until the public service exists. The site then shows a scheduling link alongside Gmail and the email-app fallback. [Share a booking link](https://help.zoho.com/portal/en/kb/bookings-2-0/booking-pages/booking-pages-and-links/articles/ways-to-share-booking-link)
5. Verify the service URL in a signed-out browser and arrange a test appointment. Check that the expected invite arrives, the correct available slots are shown, the appointment reaches the host calendar, and cancellation behaves as expected. The email drafts carry plan and trial selections. The hosted scheduler link is a demo scheduling link.

A Zoho Mail app password is unnecessary for the hosted booking link and calendar authorization. An app password can be required for a separate SMTP or IMAP client using an account with MFA. If automated sending is implemented later, keep any `ZOHO_SMTP_APP_PASSWORD` in the server’s secret store. The static site and `site-config.json` should hold public values only. [Zoho SMTP documentation](https://www.zoho.com/mail/help/zoho-smtp.html)
