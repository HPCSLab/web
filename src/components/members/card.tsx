import { component$ } from "@builder.io/qwik";
import { type Member } from "~/resource/members";
import { css } from "~/styled-system/css";

interface MemberProps {
  profile: Member;
}

export default component$((props: MemberProps) => {
    return (
      <div class={css({bg: "gray.300"})}>
        <h2>
          {props.profile.name ? props.profile.name : props.profile.eng_name}
        </h2>
        <img src={props.profile.img} width={100} height={100}/>
      </div>
    );
});
