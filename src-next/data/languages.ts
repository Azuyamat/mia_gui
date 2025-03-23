import {
    FaCss3,
    FaFolder,
    FaHtml5,
    FaJava,
    FaJs,
    FaPython,
    FaRust,
} from "react-icons/fa";
import { FaC, FaFileZipper, FaGolang } from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";
import { CgCPlusPlus } from "react-icons/cg";
import { SiKotlin, SiShell } from "react-icons/si";
import { Language } from "../domain/types/Language";

export const languages: Language[] = [
    {
        name: "Rust",
        color: "#ff964f",
        icon: FaRust,
    },
    {
        name: "Python",
        color: "#9cff4b",
        icon: FaPython,
    },
    {
        name: "JavaScript",
        color: "#ffea40",
        icon: FaJs,
    },
    {
        name: "Java",
        color: "#ff4d4d",
        icon: FaJava,
    },
    {
        name: "C",
        color: "#b43fff",
        icon: FaC,
    },
    {
        name: "Cpp",
        color: "#3e49ff",
        icon: CgCPlusPlus,
    },
    {
        name: "CSharp",
        color: "#3370ff",
        icon: TbBrandCSharp,
    },
    {
        name: "Zip",
        color: "#77ffa7",
        icon: FaFileZipper,
    },
    {
        name: "HTML",
        color: "#ff6a00",
        icon: FaHtml5,
    },
    {
        name: "CSS",
        color: "#5582ff",
        icon: FaCss3,
    },
    {
        name: "Kotlin",
        color: "#ff4d4d",
        icon: SiKotlin,
    },
    {
        name: "Shell",
        color: "#ff4d4d",
        icon: SiShell,
    },
    {
        name: "Go",
        color: "#ff4d4d",
        icon: FaGolang,
    },
    {
        name: "Folder",
        color: "#ff4d4d",
        icon: FaFolder,
    },
];
