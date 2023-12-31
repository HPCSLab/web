import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Card from "~/components/members/card";
import { members } from "~/resource";
import { grid } from "~/styled-system/patterns";

export const useMembers = routeLoader$(async () => await members({}));

export default component$(() => {
  const allMembers = useMembers();
  return (
    <main>
      <div class={grid({ gridTemplateColumns: "3" })}>
        {allMembers.value.map((member) => (
          <Card key={member.username} profile={member} />
        ))}
      </div>
    </main>
  );
});
