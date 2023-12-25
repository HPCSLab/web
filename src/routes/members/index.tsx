import { component$ } from "@builder.io/qwik";
import { members } from "~/resource/members";
import Member from "~/components/members/card";
import { grid } from "~/styled-system/patterns";

export default component$(() => {
  return (
    <main>
      <div class={grid({gridTemplateColumns: "3"})}>
        {members.map((member) => (
          <Member key={member.username} profile={member} />
        ))}
      </div>
    </main>
  );
});
