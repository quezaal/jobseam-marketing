# Demo requests and Zoho Bookings

JobSeam demo and trial requests open an email draft to the recipient in `site-config.json`. The visitor sends the draft. The site does not authenticate to Zoho Mail, send email, or confirm appointments.

## Enable self-service demo scheduling

1. Sign in to **Zoho Bookings** with the organization account that will manage the calendar. Zoho Mail alone does not create a public appointment page.
2. Create a 20-minute **JobSeam demo** appointment type. Assign staff, set availability and time zone, and configure attendee confirmations and meeting details.
3. Connect the host’s **Zoho Calendar** from Bookings and authorize the connection. Pick the calendar used for checking availability and for adding appointments. [Connect your calendar](https://help.zoho.com/portal/en/kb/bookings/integrations/calendars/articles/how-to-connect-your-calendar)
4. In the 20-minute demo event type, open **Share** and copy the public service URL into `zoho_booking_url` in [site-config.json](../site-config.json). This gives visitors a link to open the scheduler in another tab.
5. Choose **Embed as Widget → Inline Embed → Copy Code**. Copy only the public iframe `src` URL into `zoho_booking_embed_url`. With that setting, the calendar and available time slots appear directly on `/demo`, above the email request. Leave both values empty while you set up the event. [Zoho inline embed instructions](https://help.zoho.com/portal/en/kb/bookings-2-0/booking-pages/booking-pages-and-links/articles/ways-to-share-booking-link)
6. Build and preview `/demo` at desktop and mobile widths. After deploying, use an authorized test appointment to verify availability, confirmation and calendar synchronization.

A Zoho Mail app password is unnecessary for the hosted booking link and calendar authorization. An app password can be required for a separate SMTP or IMAP client using an account with MFA. If automated sending is implemented later, keep any `ZOHO_SMTP_APP_PASSWORD` in the server’s secret store. The static site and `site-config.json` should hold public values only. [Zoho SMTP documentation](https://www.zoho.com/mail/help/zoho-smtp.html)
