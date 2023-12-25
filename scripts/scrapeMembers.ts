import { JSDOM } from "jsdom";
import fs from "fs";
import YAML from "yaml";

const url = `https://www.hpcs.cs.tsukuba.ac.jp/members`;

const html = await (await fetch(url)).text();

const doc = new JSDOM(html).window.document;

const members = doc.querySelectorAll(".member_item");
fs.mkdirSync("icons", { recursive: true });
fs.mkdirSync("members/profiles", { recursive: true });

type Data = {
  name: string | undefined;
  eng_name: string;
  occupation: string;
  grade: string;
  team: string;
  img: string;
  username: string;
};

members.forEach(async (member) => {
  const frag = JSDOM.fragment(member.outerHTML);
  const name = frag.querySelector(".member_name")?.innerHTML;
  const occ = frag.querySelectorAll(".member_info li")[0].innerHTML;
  const team = frag.querySelectorAll(".member_info li")[1].innerHTML;
  const img = frag.querySelector(".member_image img")?.getAttribute("src");
  const username = frag.querySelector(".mailaddr")?.getAttribute("user");

  const data: Data = {
    name: "",
    eng_name: "",
    occupation: "",
    grade: "",
    team: "",
    img: "",
    username: "",
  };

  if (name && name.includes("/")) {
    data.name = name.split("/")[0].trim();
    data.eng_name = name.split("/")[1].trim();
  } else if (name) {
    data.eng_name = name;
  }

  switch (occ) {
    case "研究生 / Research Student":
      data.occupation = "Research Student";
      data.grade = "";
      break;
    case "学生 (B4) / Student (B4)":
      data.occupation = "Student";
      data.grade = "B4";
      break;
    case "学生 (M1) / Student (M1)":
      data.occupation = "Student";
      data.grade = "M1";
      break;
    case "学生 (M2) / Student (M2)":
      data.occupation = "Student";
      data.grade = "M2";
      break;
    case "学生 (D1) / Student (D1)":
      data.occupation = "Student";
      data.grade = "D1";
      break;
    case "学生 (D2) / Student (D2)":
      data.occupation = "Student";
      data.grade = "D2";
      break;
    case "学生 (D3) / Student (D3)":
      data.occupation = "Student";
      data.grade = "D3";
      break;
    case "教員 (教授) / Faculty (Professor)":
      data.occupation = "Faculty";
      data.grade = "Professor";
      break;
    case "教員 (准教授) / Faculty (Associate Professor)":
      data.occupation = "Faculty";
      data.grade = "Associate Professor";
      break;
    case "教員 (助教) / Faculty (Assistant Professor)":
      data.occupation = "Faculty";
      data.grade = "Assistant Professor";
      break;
    case "教員 (教授 (連携大学院)) / Faculty (Professor (Cooperative Graduate School Program))":
      data.occupation = "Faculty";
      data.grade = "Professor (Cooperative Graduate School Program)";
      break;
    case "研究員 / Researcher":
      data.occupation = "Researcher";
      data.grade = "";
      break;
  }

  switch (team) {
    case "Algorithm Team":
      data.team = "Algorithm";
      break;
    case "System Software Team":
      data.team = "System Software";
      break;
    case "FPGA Team":
      data.team = "FPGA";
      break;
    case "Architecture Team":
      data.team = "Architecture";
      break;
    case "PA Team":
      data.team = "PA";
      break;
    case "Performance Team":
      data.team = "Performance";
      break;
  }

  if (img) {
    const imgdata = await (await fetch(img)).arrayBuffer();

    data.img = `/icons/${username}.jpg`;

    fs.writeFileSync(`icons/${username}.jpg`, new DataView(imgdata));
  }

  if (username) {
    data.username = username;
  }

  fs.writeFileSync(
    `members/profiles/${data.username}.yml`,
    YAML.stringify({
      name: data.name,
      eng_name: data.eng_name,
      occupation: data.occupation,
      grade: data.grade,
      team: data.team,
      img: data.img,
      username: data.username,
    }),
  );
});
