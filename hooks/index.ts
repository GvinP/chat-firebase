import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

interface Contact {
  contactName: string;
  email: string;
}

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContacts(
            data
              .filter(
                (c) =>
                  c.firstName && c.emails && c.emails[0] && c.emails[0].email
              )
              .map((c) => ({
                contactName:
                  c.firstName && c.lastName
                    ? `${c.firstName} ${c.lastName}`
                    : `${c.firstName}`,
                email: c.emails?.[0].email || "",
              }))
          );
        }
      }
    })();
  }, []);
  return contacts;
};
