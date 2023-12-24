import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <main>
      <h1>Access</h1>
      <section>
        <h2>Address</h2>
        <address>
          <div>
            HPCS Lab. University of Tsukuba 1-1-1 Tennodai, Tsukuba, 305-8573
            Ibaraki, Japan
          </div>
          <div>
            305-8573 茨城県 つくば市 天王台 1-1-1 筑波大学
            システム情報工学研究科 HPCS研究室 総合研究棟B 928 (9F) 総合研究棟B
            1122 (11F) 総合研究棟B 1124 (11F)
          </div>
        </address>
      </section>
      <section>
        <h2>Phones</h2>
        <section>
          <h3>総合研究棟B 1122 (11F)</h3>
          <table>
            <tbody>
              <tr>
                <td>Telephone</td>
                <td>+81.29.853.6912 (Ext. 6912)</td>
              </tr>
              <tr>
                <tr>
                  <td>Fax</td>
                  <td>+81.29.853.6912 (Ext. 6912)</td>
                </tr>
              </tr>
              <tr>
                <td>電話</td>
                <td>029-853-6912 (内線:6912)</td>
              </tr>
              <tr>
                <td>Fax</td>
                <td>029-853-6912 (内線:6912)</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h3>総合研究棟B 1124 (11F)</h3>
          <table>
            <tbody>
              <tr>
                <td>Telephone</td>
                <td>(Ext. 3655)</td>
              </tr>
              <tr>
                <td>電話</td>
                <td>(内線:3655)</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
});
