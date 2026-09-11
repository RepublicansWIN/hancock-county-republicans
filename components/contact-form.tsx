import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

export function ContactForm({ kind = 'contact', recipient }: { kind?: 'contact' | 'volunteer'; recipient?: string }) {
  const destination = recipient?.trim();

  if (!destination) {
    return <div className="form-success" role="status"><strong>Online messages are temporarily unavailable.</strong><p>Please check back after the committee contact email has been added.</p></div>;
  }

  const subject = kind === 'volunteer'
    ? 'New Hancock County GOP volunteer submission'
    : 'New Hancock County GOP contact form submission';

  return (
    <form className="contact-form" action={`https://formsubmit.co/${destination}`} method="POST">
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value="https://hancockcountymainegop.org/thanks/" />
      <input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="form" value={kind === 'volunteer' ? 'Volunteer form' : 'Contact form'} />
      <FieldGroup>
        <div className="field-row">
          <Field><FieldLabel htmlFor={`${kind}-name`}>Name</FieldLabel><Input id={`${kind}-name`} name="name" required /></Field>
          <Field><FieldLabel htmlFor={`${kind}-email`}>Email</FieldLabel><Input id={`${kind}-email`} name="email" type="email" required /></Field>
        </div>
        {kind === 'volunteer' && <Field><FieldLabel htmlFor="interest">How would you like to help?</FieldLabel><Input id="interest" name="interest" placeholder="Events, candidate support, outreach…" /></Field>}
        <Field><FieldLabel htmlFor={`${kind}-message`}>Message</FieldLabel><Textarea id={`${kind}-message`} name="message" rows={6} required /></Field>
        <Button type="submit" className="form-button">{kind === 'volunteer' ? 'Raise my hand' : 'Send message'}</Button>
      </FieldGroup>
      <p className="form-note">Your message will be emailed directly to the committee.</p>
    </form>
  );
}
