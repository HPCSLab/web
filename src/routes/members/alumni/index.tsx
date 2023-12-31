import { type JSXNode, component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { type AlumniProfile, alumni } from "~/resource/members";

export const useAlumni = routeLoader$(async () => {
  return alumni;
});

function AlumniTable(props: { alumnus: AlumniProfile[] }): JSXNode {
  return (
    <table>
      <thead>
        <tr>
          <td>Date</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {props.alumnus.map((profile) => (
          <tr key={profile.name}>
            <td>
              {profile.year}.{profile.month}
            </td>
            <td>{profile.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default component$(() => {
  const alumni = useAlumni();
  return (
    <main>
      <h1>Alumnus</h1>
      <section>
        <h2>Faculty</h2>
        <ul>
          {alumni.value.faculty.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Doctor</h2>
        <AlumniTable alumnus={alumni.value.doctor} />
      </section>
      <section>
        <h2>Master</h2>
        <AlumniTable alumnus={alumni.value.master} />
      </section>
      <section>
        <h2>Undergraduate</h2>
        <AlumniTable alumnus={alumni.value.undergraduate} />
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "HPCS Lab.",
  meta: [
    {
      name: "description",
      content: "HPCS Laboratory, Tsukuba University, Alumnus",
    },
  ],
};
