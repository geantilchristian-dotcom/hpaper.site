export const CATEGORIES = [
  'Papier A4 / A3',
  'Papier couché',
  'Papier bristol',
  'Papier autocopiant',
  'Papier photo',
  'Papier kraft',
] as const;

export const CATALOG: { name: string; category: string; description: string; image: string }[] = [
  {
    name: 'Papier A4 & A3',
    category: 'Papier A4 / A3',
    description:
      "Papier de bureau pour impression, photocopie, administration, écoles et entreprises. Grammages disponibles de 70 à 90 g/m².",
    image:
      'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Papier couché',
    category: 'Papier couché',
    description:
      "Idéal pour flyers, brochures, affiches, catalogues, cartes et supports publicitaires. Finition brillante ou mate.",
    image:
      'https://images.pexels.com/photos/6476608/pexels-photo-6476608.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Papier bristol',
    category: 'Papier bristol',
    description:
      "Support solide pour cartes de visite, invitations, certificats et documents premium. Grammage 250 à 350 g/m².",
    image:
      'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Papier autocopiant',
    category: 'Papier autocopiant',
    description:
      "Utilisé pour factures, reçus, bons de commande, carnets et documents administratifs. 2 ou 3 feuilles autocopiantes.",
    image:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Papier photo',
    category: 'Papier photo',
    description:
      "Pour impressions photo de qualité, studios, souvenirs, albums et présentations visuelles. Brillant, mat ou satiné.",
    image:
      'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Papier kraft & emballage',
    category: 'Papier kraft',
    description:
      "Pour emballages, sacs, protection de produits et conditionnement professionnel. Rouleaux et feuilles disponibles.",
    image:
      'https://images.pexels.com/photos/5838464/pexels-photo-5838464.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const SERVICES = [
  {
    icon: 'Layers',
    title: 'Large choix',
    description:
      "Nous proposons plusieurs types de papiers selon vos besoins professionnels : bureautique, impression, emballage et plus.",
  },
  {
    icon: 'BadgePercent',
    title: 'Prix compétitifs',
    description:
      "Des tarifs adaptés aux particuliers, entreprises, écoles, imprimeries et revendeurs. Devis gratuit et rapide.",
  },
  {
    icon: 'Zap',
    title: 'Commande rapide',
    description:
      "Demandez un devis ou passez commande directement par téléphone ou WhatsApp. Réponse en moins de 24h.",
  },
  {
    icon: 'Truck',
    title: 'Approvisionnement sérieux',
    description:
      "Hpaper vous accompagne pour avoir les bons papiers au bon moment, avec un stock fiable et régulier.",
  },
];

export const CLIENTS = [
  'Entreprises et bureaux',
  'Écoles et universités',
  'Imprimeries et studios graphiques',
  'Commerces et revendeurs',
  'Organisations et églises',
];

export const STATS = [
  { value: '50+', label: 'Types de papiers' },
  { value: '500+', label: 'Clients satisfaits' },
  { value: '24h', label: 'Délai de devis' },
  { value: '5 ans', label: "D'expérience" },
];

export const CONTACT = {
  phone: '+243 970 000 000',
  whatsapp: '243970000000',
  email: 'contact@hpaper.com',
  address: 'Bukavu, Sud-Kivu, RDC',
};

export const ADMIN_CREDENTIALS = {
  email: 'admin@hpaper.com',
  password: 'Admin@12345',
};
