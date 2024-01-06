import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Card from "~/components/members/card";
import { members } from "~/resource";

export const useMembers = routeLoader$(async () => await members({}));

export default component$(() => {
  const allMembers = useMembers();
  return (
    <main>
      <div>
        {allMembers.value.map((member) => (
          <Card key={member.username} profile={member} />
        ))}
      </div>
    </main>
  );
});
