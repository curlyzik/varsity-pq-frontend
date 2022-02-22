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
    name: "300+ Past Questions",
    description:
      "Varsity PQ is huge enough to have more than 300+ past questions",
    icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Filter by Private University",
    description:
      "Feel free to filter down private universities",
    icon: <FiLayers className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Filter by Federal Univesity",
    description:
      "You can filter down federal universities",
    icon: <FiRss className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Filter by State Univesity",
    description: "You can also filter down state universities",
    icon: <FiBookmark className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Become one of our Administrators",
    description:
      "We can't do it alone. You can help Varsity PQ become better by volunteering to add new past questions for us.",
    icon: <FiCloudLightning className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Developer Contributors Page",
    description:
      "We proudly show developers who contributes to this project, there is a dedicated contributors page.",
    icon: <FiUsers className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Add new Past Question",
    description:
      "You can add a new past question to Varsity PQ",
    icon: <FiFolderPlus className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Report Past Question",
    description: "You can report a past question if you find it unhelpful",
    icon: <FiFlag className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "API",
    description: "API endpoints to access Varsity PQ API",
    icon: <FiDatabase className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
  {
    name: "Dark Mode",
    description: "You might like dark mode, so you can enjoy it here too.",
    icon: <FiMoon className="text-2xl lg:text-4xl xl:text-4xl" />,
  },
];
