export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  img: string;
  bio: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: "daniel-reed",
    name: "Daniel Reed",
    role: "Strategy Consultant",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Empowering smarter financial choices through actionable, data-backed insights.",
  },
  {
    slug: "olivia-chen",
    name: "Olivia Chen",
    role: "Operations Consultant",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Delivers data-driven insights to support smart, strategic financial decisions.",
  },
  {
    slug: "marcus-patel",
    name: "Marcus Patel",
    role: "OD Specialist",
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Transforms complex data into clear guidance for confident financial decision.",
  },
  {
    slug: "sofia-martinez",
    name: "Sofia Martinez",
    role: "Client Manager",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Bringing clarity to financial strategy through intelligent, data-driven analysis.",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM.find((m) => m.slug === slug);
}
