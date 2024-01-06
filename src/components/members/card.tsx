import { component$ } from "@builder.io/qwik";
import { type Member } from "~/resource/members";
import SsrImg from "../static-img";

interface MemberProps {
  profile: Member;
}

export default component$((props: MemberProps) => {
  return (
    <div>
      <h2>
        {props.profile.name ? props.profile.name : props.profile.eng_name}
      </h2>
      <SsrImg
        src={props.profile.img}
        alt={`picture for ${
          props.profile.name ? props.profile.name : props.profile.eng_name
        }`}
      />
    </div>
  );
});
