import studentsSrc from "./students.yml";
import facultiesSrc from "./faculties.yml";
import recentWorksSrc from "./recent-works.yml";
import * as Validator from "../validator";
import { z } from "zod";

export const students = z.array(Validator.member).parse(studentsSrc);
export const faculties = z.array(Validator.member).parse(facultiesSrc);
export const recentWorks = z.array(Validator.recentWork).parse(recentWorksSrc);
