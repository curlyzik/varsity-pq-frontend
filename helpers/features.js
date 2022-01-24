import {
  FiBookmark,
  FiCloudLightning,
  FiDatabase,
  FiFlag,
  FiFolderPlus,
  FiGithub,
  FiLayers,
  FiMoon,
  FiPackage,
  FiPlay,
  FiRss,
  FiUsers,
} from "react-icons/fi";

export const features = [
  {
    name: "300+ Cheatsheets",
    description:
      "Code house is super huge enough and have more than 300+ cheatsheets",
    icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Category Filter",
    description:
      "Feel free to filter using categories, it can help you find the best one.",
    icon: <FiLayers className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Filter By Source",
    description:
      "You can filter cheatsheets by source, eg: medium.com or overapi.com",
    icon: <FiRss className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Bookmark Favorites",
    description: "You can bookmark cheatsheets for you to have a look later.",
    icon: <FiBookmark className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Request Features",
    description:
      "You can help us become code house better by adding your feature requests.",
    icon: <FiCloudLightning className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Contributors Page",
    description:
      "We proudly show our contributors, there is a dedicated contributors page.",
    icon: <FiUsers className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Add new Cheatsheet",
    description:
      "You can add a new cheatsheet to code house, without even leaving the browser",
    icon: <FiFolderPlus className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Report Cheatsheet",
    description: "You can report a cheatsheet if you find it suspicious. ",
    icon: <FiFlag className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "GraphQL Playground",
    description: "A dedicated Graphql playground to access code house API",
    icon: <FiDatabase className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Dark Mode",
    description: "Coders love dark mode, so you can enjoy it here too.",
    icon: <FiMoon className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
];
