import {
  FiBookmark,
  FiBookOpen,
  FiCloudLightning,
  FiDatabase,
  FiFlag,
  FiLayers,
  FiRss,
  FiUsers,
} from "react-icons/fi";

import { FcAcceptDatabase, FcCollaboration, FcDepartment, FcHighPriority, FcHome, FcLibrary, FcManager } from "react-icons/fc";

export const features = [
  {
    name: "300+ Past Questions",
    description: "Access to over 300+ past questions.",
    icon: <FiBookOpen className="text-4xl text-sky-600" />,
  },
  {
    name: "Sort by Private University",
    description: "Feel free to sort by private universities.",
    icon: <FcLibrary className="text-4xl text-sky-600" />,
  },
  {
    name: "Sort by Federal University",
    description: "Students can sort by federal universities.",
    icon: <FcHome className="text-4xl text-sky-600" />,
  },
  {
    name: "Sort by State University",
    description: "Students can also sort by state universities.",
    icon: <FcDepartment className="text-4xl text-sky-600" />,
  },
  {
    name: "Become a Volunteer",
    description: "Students can volunteer to upload past questions.",
    icon: <FcManager className="text-4xl text-sky-600" />,
  },
  {
    name: "Volunteer Page",
    description: "We proudly show volunteering students.",
    icon: <FcCollaboration className="text-4xl text-sky-600" />,
  },
  {
    name: "Report Past Question",
    description: "Report a past question if its unhelpful.",
    icon: <FcHighPriority className="text-4xl text-sky-600" />,
  },
  {
    name: "API",
    description: "API endpoints to access Varsity PQ API",
    icon: <FcAcceptDatabase className="text-4xl text-sky-600" />,
  },
];
