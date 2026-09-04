'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

export function ContactForm({ kind = 'contact' }: { kind?: 'contact' | 'volunteer' }) {
  const [sent, setSent] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  if (sent) return <div className="form-success" role="status"><strong>Online delivery is not connected yet.</strong><p>Please use the committee email address listed on this page.</p></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <FieldGroup>
        <div className="field-row">
          <Field><FieldLabel htmlFor={`${kind}-name`}>Name</FieldLabel><Input id={`${kind}-name`} name="name" required /></Field>
          <Field><FieldLabel htmlFor={`${kind}-email`}>Email</FieldLabel><Input id={`${kind}-email`} name="email" type="email" required /></Field>
        </div>
        {kind === 'volunteer' && <Field><FieldLabel htmlFor="interest">How would you like to help?</FieldLabel><Input id="interest" name="interest" placeholder="Events, candidate support, outreach…" /></Field>}
        <Field><FieldLabel htmlFor={`${kind}-message`}>Message</FieldLabel><Textarea id={`${kind}-message`} name="message" rows={6} required /></Field>
        <Button type="submit" className="form-button">{kind === 'volunteer' ? 'Raise my hand' : 'Send message'}</Button>
      </FieldGroup>
      <p className="form-note">Online form delivery is not connected yet.</p>
    </form>
  );
}
