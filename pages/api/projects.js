export default function handler(req, res) {
  const projets = [
    {
      id: 1,
      titre: "Portfolio futuriste",
      description: "Mon site personnel, animé avec effets galactiques.",
    },
    {
      id: 2,
      titre: "Boutique vintage",
      description: "E-commerce de vêtements importés du Japon & Thaïlande.",
    }
  ];

  res.status(200).json(projets);
}
